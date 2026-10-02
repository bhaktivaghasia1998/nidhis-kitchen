'use client';
// Cooking mode: one step at a time, in big text, filling the whole screen.
// Use Next/Back, the arrow keys, or swipe on a phone. The screen stays awake
// while it's open (on browsers that support it), so it doesn't go dark mid-recipe.
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ListChecks, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRecipes } from '@/lib/use-recipes';
import { scaleIngredient } from '@/lib/scale';
import ScalePicker from './scale-picker';
import StepText from './step-text';

export default function CookingMode() {
  const { cooking: r, stopCooking, scale } = useRecipes();
  const [step, setStep] = useState(0);
  const [showIngr, setShowIngr] = useState(false);
  const touchX = useRef<number | null>(null);

  const total = r ? r.steps.length : 0;
  const done = step >= total; // the "Enjoy!" screen after the last step
  const next = useCallback(() => setStep((s) => Math.min(s + 1, total)), [total]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  // Start from step 1 each time a recipe is opened.
  useEffect(() => { setStep(0); setShowIngr(false); }, [r]);

  // Keyboard: arrows / space to move, Esc to leave.
  useEffect(() => {
    if (!r) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') back();
      else if (e.key === 'Escape') stopCooking();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [r, next, back, stopCooking]);

  // Keep the screen awake while cooking.
  useEffect(() => {
    if (!r || !('wakeLock' in navigator)) return;
    let lock: WakeLockSentinel | null = null;
    const get = () => navigator.wakeLock.request('screen').then((l) => { lock = l; }).catch(() => {});
    get();
    const onVis = () => { if (document.visibilityState === 'visible') get(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); lock?.release().catch(() => {}); };
  }, [r]);

  if (!r) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Cooking ${r.name}`}
      className="fixed inset-0 z-[60] flex flex-col bg-leaf text-leaf-foreground"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx < -50) next(); else if (dx > 50) back();
        touchX.current = null;
      }}
    >
      {/* top bar */}
      <div className="page-wrap flex items-center justify-between gap-3 py-4">
        <div className="min-w-0">
          <p className="m-0 font-hand text-xl text-band-accent">cooking mode</p>
          <p className="m-0 truncate font-display text-xl">{r.name}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="creamOutline" size="sm" onClick={() => setShowIngr((v) => !v)} aria-pressed={showIngr}>
            <ListChecks /> Ingredients
          </Button>
          <Button variant="cream" size="icon" onClick={stopCooking} aria-label="Leave cooking mode"><XIcon /></Button>
        </div>
      </div>

      {/* progress: one segment per step */}
      <div className="page-wrap flex gap-1.5" aria-hidden="true">
        {r.steps.map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-band-accent' : 'bg-leaf-foreground/20'}`} />
        ))}
      </div>

      {/* the step */}
      <div className="page-wrap relative flex min-h-0 flex-1 gap-8 py-6">
        <div className="flex min-w-0 flex-1 flex-col justify-center overflow-y-auto" aria-live="polite">
          {done ? (
            <div className="text-center">
              <p className="m-0 font-hand text-[clamp(40px,6vw,72px)] text-band-accent">Enjoy!</p>
              <p className="mx-auto mt-2 max-w-[30ch] text-[clamp(20px,2.4vw,30px)]">Your {r.name} is ready. Serve it hot and share a picture with Nidhi.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="cream" size="lg" onClick={() => setStep(0)}>Start again</Button>
                <Button variant="creamOutline" size="lg" onClick={stopCooking}>Back to the recipe</Button>
              </div>
            </div>
          ) : (
            <>
              <p className="m-0 text-sm font-semibold tracking-[0.14em] text-band-accent uppercase">Step {step + 1} of {total}</p>
              <p key={step} className="cook-step mt-4 mb-0 max-w-[34ch] font-display text-[clamp(28px,4.2vw,58px)] leading-[1.2]"><StepText big text={r.steps[step]} id={`${r.slug}-${step}`} title={`${r.name}, step ${step + 1}`} /></p>
            </>
          )}
        </div>

        {/* ingredients panel */}
        {showIngr && (
          <aside className="absolute inset-x-5 top-4 bottom-4 overflow-y-auto rounded-2xl bg-card p-5 text-card-foreground shadow-2xl md:static md:w-[min(380px,34%)] md:shrink-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="m-0 text-sm font-semibold tracking-[0.12em] text-chili uppercase">Ingredients</h3>
              <ScalePicker />
            </div>
            <ul className="m-0 list-disc pl-5 marker:text-chili">
              {r.ingredients.map((i) =>
                i.startsWith('## ')
                  ? <li key={i} className="-ml-5 mt-3 mb-1 list-none font-semibold text-chili first:mt-0">{i.slice(3)}</li>
                  : <li key={i} className="mb-1.5">{scaleIngredient(i, scale)}</li>
              )}
            </ul>
          </aside>
        )}
      </div>

      {/* Back / Next */}
      {!done && (
        <div className="page-wrap flex items-center justify-between gap-3 pt-2 pb-6">
          <Button variant="creamOutline" size="lg" onClick={back} disabled={step === 0}><ChevronLeft /> Back</Button>
          <span className="hidden text-sm opacity-70 sm:block">Tip: use the ← → keys, or swipe</span>
          <Button variant="cream" size="lg" onClick={next}>{step === total - 1 ? 'Finish' : 'Next'} <ChevronRight /></Button>
        </div>
      )}
    </div>
  );
}
