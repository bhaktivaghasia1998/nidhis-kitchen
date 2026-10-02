'use client';
// A recipe step where every time ("10 minutes", "2–3 mins") becomes a button
// that starts a kitchen timer. While it runs, the button shows the time left.
import { Fragment } from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import { TIME_RE, formatClock, remaining, toSeconds, useTimers } from '@/lib/timers';

export default function StepText({ text, id, title, big = false }: { text: string; id: string; title: string; big?: boolean }) {
  const { timers, now, start } = useTimers();
  const parts: React.ReactNode[] = [];
  let last = 0;
  let n = 0;

  for (const m of text.matchAll(TIME_RE)) {
    const at = m.index ?? 0;
    parts.push(<Fragment key={`t${n}`}>{text.slice(last, at)}</Fragment>);
    const amount = parseInt(m[1], 10);
    const unit = m[3];
    const seconds = toSeconds(amount, unit);
    const label = `${amount} ${/^h/i.test(unit) ? (amount === 1 ? 'hour' : 'hours') : 'min'}`;
    const timerId = `${id}-${n}`;
    const running = timers.find((t) => t.id === timerId);
    const left = running ? remaining(running, now) : 0;

    // Keep a full stop or comma right after the time on the same line as the button.
    const tail = /^[.,;:!)]/.test(text.slice(at + m[0].length)) ? text[at + m[0].length] : '';
    parts.push(
      <span key={`b${n}`} className="whitespace-nowrap">
        <button
          type="button"
          onClick={() => start({ id: timerId, title, label, total: seconds })}
          aria-label={running ? `Restart the ${label} timer` : `Start a ${label} timer`}
          title={running ? 'Tap to restart' : 'Tap to start a timer'}
          className={`inline-flex cursor-pointer items-center gap-1 rounded-full align-baseline whitespace-nowrap transition-colors ${
            big ? 'px-3 py-0.5 font-display text-[0.85em]' : 'px-2 py-px font-sans font-semibold'
          } ${
            running
              ? left === 0 ? 'timer-ring bg-chili text-white' : 'bg-band-accent text-[#1f4d3a]'
              : 'border border-dashed border-current/50 hover:border-solid hover:bg-band-accent hover:text-[#1f4d3a]'
          }`}
        >
          <TimerIcon className={big ? 'size-[0.75em]' : 'size-3.5'} />
          {running ? <>{m[0]} · {left === 0 ? "time's up!" : formatClock(left)}</> : m[0]}
        </button>
        {tail}
      </span>
    );
    last = at + m[0].length + tail.length;
    n++;
  }
  parts.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
