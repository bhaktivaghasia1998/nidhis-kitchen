'use client';
// Makes a section gently slide up and fade in when you scroll to it.
// Sections already on screen when the page opens are shown right away.
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'shown' | 'waiting' | 'in'>('shown');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible
    setState('waiting');
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setState('in'); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="reveal" data-state={state}>{children}</div>;
}
