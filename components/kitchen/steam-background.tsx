'use client';
// Soft steam and warm sparks slowly rising up the page, as if the cook's fire
// carries on below the top section. Drawn on a <canvas> behind the whole page.
// Stronger in the empty space at the sides, very faint behind the text.
import { useEffect, useRef } from 'react';

interface Wisp { x: number; y: number; vy: number; len: number; amp: number; phase: number; width: number; life: number }
interface Spark { x: number; y: number; vx: number; vy: number; r: number; hue: number; life: number; max: number; flick: number }

export default function SteamBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // Same width as the page content (.page-wrap), so we know where the empty sides are.
    const sideAlpha = (x: number) => {
      const content = Math.min(W - Math.min(Math.max(40, W * 0.06), 160), 1920);
      const edge = (W - content) / 2;
      if (edge < 60) return 0.35; // narrow screens: no real sides, keep it gentle everywhere
      return x < edge || x > W - edge ? 1 : 0.3;
    };

    // Most things start at the sides, a few in the middle.
    const pickX = () => {
      const content = Math.min(W - Math.min(Math.max(40, W * 0.06), 160), 1920);
      const edge = (W - content) / 2;
      if (edge > 60 && Math.random() < 0.75) return Math.random() < 0.5 ? rand(0, edge) : rand(W - edge, W);
      return rand(0, W);
    };

    const newWisp = (y = H + rand(40, 200)): Wisp => ({
      x: pickX(), y, vy: rand(0.35, 0.7), len: rand(120, 240), amp: rand(10, 26),
      phase: rand(0, Math.PI * 2), width: rand(10, 22), life: 0,
    });
    const newSpark = (y = H + 10): Spark => ({
      x: pickX(), y, vx: rand(-0.25, 0.25), vy: -rand(0.6, 1.5), r: rand(1.1, 2.6),
      hue: rand(22, 46), life: 0, max: rand(H * 0.5, H * 1.1), flick: rand(0, 10),
    });

    const wisps: Wisp[] = Array.from({ length: 14 }, () => newWisp(rand(0, H + 200)));
    const sparks: Spark[] = Array.from({ length: 34 }, () => { const s = newSpark(rand(0, H)); s.life = rand(0, s.max * 0.6); return s; });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0, last = 0, t = 0;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 16.7, 3) || 1;
      last = now; t += dt;
      ctx.clearRect(0, 0, W, H);
      const steamRGB = dark.matches ? '255,248,235' : '120,90,60';

      // Steam: a soft, blurred wavy line that drifts up and fades near the top.
      ctx.save();
      ctx.filter = 'blur(6px)';
      ctx.lineCap = 'round';
      for (let i = 0; i < wisps.length; i++) {
        const w = wisps[i];
        if (!reduce) { w.y -= w.vy * dt; w.life += dt; }
        if (w.y + w.len < -40) { wisps[i] = newWisp(); continue; }
        const fadeIn = Math.min(w.life / 120, 1);
        const fadeTop = Math.min(Math.max((w.y + w.len) / (H * 0.6), 0), 1);
        const a = (dark.matches ? 0.12 : 0.08) * fadeIn * fadeTop * sideAlpha(w.x);
        if (a <= 0.002) continue;
        ctx.strokeStyle = `rgba(${steamRGB},${a})`;
        ctx.lineWidth = w.width;
        ctx.beginPath();
        for (let s = 0; s <= 24; s++) {
          const yy = w.y + (s / 24) * w.len;
          const xx = w.x + Math.sin(yy * 0.02 + w.phase + t * 0.012) * w.amp * (1 - s / 30);
          if (s === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Sparks: tiny glowing dots that float up, sway, flicker and burn out.
      ctx.save();
      ctx.globalCompositeOperation = dark.matches ? 'lighter' : 'source-over';
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        if (!reduce) {
          s.life += dt;
          s.x += (s.vx + Math.sin((t + s.flick * 40) * 0.03) * 0.35) * dt;
          s.y += s.vy * dt;
        }
        const p = s.life / s.max;
        if (p >= 1 || s.y < -10) { sparks[i] = newSpark(); continue; }
        const glow = Math.sin(p * Math.PI) * (0.75 + 0.25 * Math.sin(t * 0.25 + s.flick));
        const a = glow * sideAlpha(s.x);
        if (a <= 0.01) continue;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        g.addColorStop(0, `hsla(${s.hue},100%,70%,${a})`);
        g.addColorStop(0.3, `hsla(${s.hue},100%,55%,${a * 0.45})`);
        g.addColorStop(1, `hsla(${s.hue},100%,50%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      if (!reduce) frame = requestAnimationFrame(draw);
    };

    const start = () => { cancelAnimationFrame(frame); last = performance.now(); frame = requestAnimationFrame(draw); };
    start();

    // Pause when the tab is hidden, to save battery.
    const onVis = () => (document.hidden ? cancelAnimationFrame(frame) : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 size-full" aria-hidden="true" />;
}
