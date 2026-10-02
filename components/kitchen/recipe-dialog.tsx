'use client';
import { ChefHat, Dices, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TAGS, asset } from '@/lib/recipes';
import { useRecipes } from '@/lib/use-recipes';
import { scaleIngredient, scaleServes } from '@/lib/scale';
import ScalePicker from './scale-picker';
import StepText from './step-text';

// The recipe card that pops up: ingredients, method (with tap-to-start timers) and a link to the post.
export default function RecipeDialog() {
  const { open: r, close, openRandom, startCooking, scale } = useRecipes();

  const facts = r
    ? [
        r.time && `⏱ ${r.time}`,
        r.serves && (/\d$/.test(r.serves) ? `🍽 Serves ${scaleServes(r.serves, scale)}` : `🍽 ${scaleServes(r.serves, scale)}`),
        r.heat === 1 && '🌶 Medium spice',
        r.heat === 2 && '🌶🌶 Spicy',
        ...r.tags.map((t) => { const tag = TAGS.find((x) => x.id === t)!; return `${tag.emoji} ${tag.label}`; }),
        `📅 Posted ${r.date}`,
      ].filter(Boolean) as string[]
    : [];

  return (
    <Dialog open={!!r} onOpenChange={(o) => !o && close()}>
      {r && (
        <DialogContent
          className="gap-0 p-0"
          // Clicking the timer box shouldn't close the recipe.
          onInteractOutside={(e) => { if ((e.target as HTMLElement | null)?.closest?.('[data-timer-dock]')) e.preventDefault(); }}
        >
          {r.photo && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(r.photo)} alt={r.name} className="aspect-[16/9] w-full object-cover" />
            </div>
          )}
          <DialogHeader className="bg-leaf px-7 pt-7 pb-5 text-leaf-foreground">
            <DialogTitle className="pr-12">{r.name}</DialogTitle>
            <DialogDescription className="m-0 opacity-80">
              {r.desc}
            </DialogDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              {facts.map((f) => <Badge key={f} variant="soft">{f}</Badge>)}
            </div>
          </DialogHeader>

          <div className="grid gap-6 px-7 pt-6 pb-7">
            <Button size="lg" variant="saffron" className="w-full sm:w-auto sm:justify-self-start" onClick={startCooking}>
              <ChefHat /> Start cooking mode
            </Button>
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="m-0 text-sm font-semibold tracking-[0.12em] text-chili uppercase">Ingredients</h3>
                <ScalePicker />
              </div>
              <ul className="m-0 list-disc gap-x-6 pl-5 marker:text-chili sm:columns-2">
                {r.ingredients.map((i) =>
                  i.startsWith('## ')
                    ? <li key={i} className="-ml-5 mt-2.5 mb-1 list-none font-semibold text-chili first:mt-0">{i.slice(3)}</li>
                    : <li key={i} className="mb-1 break-inside-avoid">{scaleIngredient(i, scale)}</li>
                )}
              </ul>
              {scale !== 1 && (
                <p className="mt-2 mb-0 text-sm text-muted-foreground italic">
                  Amounts above are {({ 0.5: 'halved', 2: 'doubled', 3: 'tripled' } as Record<number, string>)[scale]}. The method still shows the original amounts.
                </p>
              )}
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-[0.12em] text-chili uppercase">Method</h3>
              {r.methodNote && <p className="mt-0 mb-2 text-sm text-muted-foreground italic">{r.methodNote}</p>}
              <ol className="m-0 grid list-decimal gap-2 pl-6 marker:font-bold marker:text-chili">
                {r.steps.map((s, i) => <li key={s}><StepText text={s} id={`${r.slug}-${i}`} title={`${r.name}, step ${i + 1}`} /></li>)}
              </ol>
            </div>
            {r.tip && (
              <p className="m-0 rounded-xl bg-accent px-4 py-3 text-[15px]"><b>Nidhi&apos;s tip:</b> {r.tip}</p>
            )}
            <div className="flex flex-wrap gap-2.5">
              <Button asChild size="lg">
                <a href={r.post} target="_blank" rel="noopener">View on Instagram <ExternalLink /></a>
              </Button>
              <Button size="lg" variant="outline" onClick={openRandom}><Dices /> Another idea</Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
