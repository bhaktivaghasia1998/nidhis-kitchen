'use client';
// Kitchen timers. Tap a time in a recipe step (like "10 minutes") to start one.
// Several can run at once; they show in a small box at the bottom right of the screen
// and ring (with a beep, and a buzz on phones) when the time is up.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export interface Timer {
  id: string; // recipe slug + step + which time in the step
  title: string; // e.g. "Sevai Upma, step 4"
  label: string; // e.g. "2 min"
  total: number; // seconds
  endsAt: number | null; // when it rings (ms); null while paused
  left: number; // seconds left (kept up to date while paused)
}

interface TimerState {
  timers: Timer[];
  now: number;
  start: (t: Omit<Timer, 'endsAt' | 'left'>) => void;
  pause: (id: string) => void;
  resume: (id: string) => void;
  remove: (id: string) => void;
}

const TimerContext = createContext<TimerState | null>(null);

// Finds times like "10 minutes", "2–3 mins", "2–4 hours" in a step.
// For a range we use the shorter time, so you can check and add more.
export const TIME_RE = /(\d+)(?:\s*[–-]\s*(\d+))?\s*(minutes?|mins?|hours?|hrs?)\b/gi;
export const toSeconds = (n: number, unit: string) => n * (/^h/i.test(unit) ? 3600 : 60);

export const remaining = (t: Timer, now: number) =>
  t.endsAt === null ? t.left : Math.max(0, Math.round((t.endsAt - now) / 1000));

export function formatClock(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const mm = String(m).padStart(h ? 2 : 1, '0'), ss = String(sec).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

// A short "ding-ding" made with the Web Audio API (no sound file needed).
function useBeeper() {
  const ctx = useRef<AudioContext | null>(null);
  const unlock = useCallback(() => {
    if (!ctx.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx.current = new AC();
    }
    ctx.current?.resume().catch(() => {});
  }, []);
  const ding = useCallback(() => {
    const c = ctx.current;
    if (!c) return;
    [0, 0.25].forEach((delay) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, c.currentTime + delay);
      g.gain.exponentialRampToValueAtTime(0.35, c.currentTime + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + 0.22);
      o.connect(g).connect(c.destination);
      o.start(c.currentTime + delay); o.stop(c.currentTime + delay + 0.25);
    });
  }, []);
  return { unlock, ding };
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const { unlock, ding } = useBeeper();

  // Tick once a second while any timer exists.
  useEffect(() => {
    if (!timers.length) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [timers.length]);

  // Ring every 2 seconds while a finished timer hasn't been dismissed.
  const ringing = timers.some((t) => t.endsAt !== null && t.endsAt <= now);
  useEffect(() => {
    if (!ringing) return;
    ding();
    navigator.vibrate?.([300, 150, 300]);
    const id = setInterval(() => { ding(); navigator.vibrate?.([300, 150, 300]); }, 2000);
    const title = document.title;
    const flash = setInterval(() => { document.title = document.title === title ? "⏰ Time's up!" : title; }, 1000);
    return () => { clearInterval(id); clearInterval(flash); document.title = title; };
  }, [ringing, ding]);

  const start = useCallback((t: Omit<Timer, 'endsAt' | 'left'>) => {
    unlock(); // sound can only start after a tap, so prepare it now
    const at = Date.now();
    setNow(at);
    setTimers((list) => [...list.filter((x) => x.id !== t.id), { ...t, left: t.total, endsAt: at + t.total * 1000 }]);
  }, [unlock]);

  const pause = useCallback((id: string) => {
    const at = Date.now();
    setTimers((list) => list.map((t) => (t.id === id && t.endsAt !== null ? { ...t, left: remaining(t, at), endsAt: null } : t)));
  }, []);

  const resume = useCallback((id: string) => {
    unlock();
    const at = Date.now();
    setNow(at);
    setTimers((list) => list.map((t) => (t.id === id && t.endsAt === null ? { ...t, endsAt: at + t.left * 1000 } : t)));
  }, [unlock]);

  const remove = useCallback((id: string) => setTimers((list) => list.filter((t) => t.id !== id)), []);

  const value = useMemo(() => ({ timers, now, start, pause, resume, remove }), [timers, now, start, pause, resume, remove]);
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimers() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimers must be used inside <TimerProvider>');
  return ctx;
}
