'use client';
// The running timers, in a small box at the bottom right of the screen.
// Stays on top of everything (even cooking mode) so you never lose a timer.
import { Pause, Play, XIcon } from 'lucide-react';
import { formatClock, remaining, useTimers } from '@/lib/timers';
import { useRecipes } from '@/lib/use-recipes';

export default function TimerDock() {
  const { timers, now, pause, resume, remove } = useTimers();
  const { cooking } = useRecipes();
  if (!timers.length) return null;

  return (
    <div data-timer-dock className={`pointer-events-auto fixed right-4 z-[70] grid ${cooking ? 'bottom-24' : 'bottom-4'} w-[min(300px,calc(100vw-32px))] gap-2`} aria-live="polite">
      {timers.map((t) => {
        const left = remaining(t, now);
        const done = left === 0 && t.endsAt !== null;
        const paused = t.endsAt === null;
        const pct = 1 - left / t.total;
        return (
          <div
            key={t.id}
            className={`relative overflow-hidden rounded-2xl border-2 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,.6)] ${
              done ? 'timer-ring border-chili bg-chili text-white' : 'border-leaf bg-card text-card-foreground'
            }`}
          >
            {/* progress bar along the bottom */}
            {!done && <span className="absolute inset-x-0 bottom-0 h-1 origin-left bg-band-accent transition-transform duration-1000" style={{ transform: `scaleX(${pct})` }} />}
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-xs font-semibold opacity-75">{t.title}</p>
                <p className="m-0 font-display text-3xl leading-tight tabular-nums">{done ? "Time's up!" : formatClock(left)}</p>
                <p className="m-0 text-xs opacity-75">{done ? `${t.label} timer finished` : paused ? 'Paused' : `${t.label} timer`}</p>
              </div>
              {done ? (
                <button type="button" onClick={() => remove(t.id)} className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-bold text-chili">Stop</button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => (paused ? resume(t.id) : pause(t.id))}
                    aria-label={paused ? 'Resume timer' : 'Pause timer'}
                    className="grid size-10 cursor-pointer place-items-center rounded-full bg-leaf text-leaf-foreground"
                  >
                    {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(t.id)}
                    aria-label="Cancel timer"
                    className="grid size-8 cursor-pointer place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <XIcon className="size-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
