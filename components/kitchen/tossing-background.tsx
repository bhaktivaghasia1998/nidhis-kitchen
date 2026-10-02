'use client';
// Spices and vegetables tossed up from the bottom of the screen, spinning and
// falling back down, like ingredients flipping in a pan. Drawn on a <canvas>
// behind the whole page. They're stronger at the sides and very faint behind
// the text, so reading is never hard.
import { useEffect, useRef } from 'react';

// Each item is a small drawing (SVG). Only satvik-friendly ingredients, like Nidhi cooks.
const ART: Record<string, string> = {
  chili: `<path d="M14 18c10 2 14 12 18 22 4 9 11 15 22 16-9 4-21 2-29-7C17 40 13 30 14 18z" fill="#c8462b"/><path d="M14 18c-1-5 1-9 5-11" stroke="#2f7a3c" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  cardamom: `<ellipse cx="32" cy="34" rx="12" ry="22" transform="rotate(25 32 34)" fill="#7ba05b"/><path d="M22 14c8 10 13 26 18 40" stroke="#5a7d3e" stroke-width="2.5" fill="none"/>`,
  star: [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<ellipse cx="32" cy="16" rx="6" ry="14" fill="#7a3f1d" transform="rotate(${a} 32 32)"/>`).join('') + `<circle cx="32" cy="32" r="5" fill="#5b2c12"/>`,
  cinnamon: `<rect x="8" y="24" width="48" height="16" rx="8" fill="#a0592a" transform="rotate(-20 32 32)"/><path d="M12 38l40-15" stroke="#7a3f1d" stroke-width="2.5"/>`,
  bay: `<path d="M8 52C14 26 32 10 58 8 54 32 36 52 8 52z" fill="#6f8f3a"/><path d="M8 52C24 38 38 24 58 8" stroke="#4f6a26" stroke-width="2.5" fill="none"/>`,
  tomato: `<circle cx="32" cy="36" r="22" fill="#d9442f"/><path d="M32 16l4 6 7-2-4 6 6 4-8 1-5 5-5-5-8-1 6-4-4-6 7 2z" fill="#3f8f3a"/><ellipse cx="24" cy="30" rx="5" ry="3" fill="#fff" opacity=".35"/>`,
  carrot: `<path d="M20 22l26 6L22 60c-4 2-7-1-6-5z" fill="#ef8a2d"/><path d="M24 34l8 2M22 44l7 2" stroke="#c96a17" stroke-width="2.5" stroke-linecap="round"/><path d="M34 24c-2-10 2-16 8-18M38 26c4-8 12-10 18-8M30 22c-6-6-8-12-6-16" stroke="#3f8f3a" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  peas: `<path d="M6 34c10-16 42-20 52-6-10 14-42 20-52 6z" fill="#5fa04a"/>` + [18, 30, 42].map((x) => `<circle cx="${x}" cy="32" r="6" fill="#8cc860"/>`).join(''),
  lemon: `<circle cx="32" cy="32" r="22" fill="#f6d33c"/><circle cx="32" cy="32" r="17" fill="#fbe98a"/>` + [0, 60, 120, 180, 240, 300].map((a) => `<path d="M32 32l0-15" stroke="#f6d33c" stroke-width="3" transform="rotate(${a} 32 32)"/>`).join(''),
  coriander: `<path d="M32 58V30" stroke="#3f8f3a" stroke-width="3"/><path d="M32 30c-10 2-18-6-16-14 8-2 14 4 16 14zM32 30c10 2 18-6 16-14-8-2-14 4-16 14zM32 30c-4-8-2-18 0-22 4 4 6 14 0 22z" fill="#4fa04a"/>`,
  cumin: [[20, 24, 30], [34, 30, -20], [26, 40, 60], [42, 42, 10], [44, 20, 40]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="7" fill="#8a6a3a" transform="rotate(${r} ${x} ${y})"/>`).join(''),
  broccoli: `<path d="M28 58l2-18h6l2 18z" fill="#7fae5a"/><circle cx="22" cy="28" r="10" fill="#3f8a3a"/><circle cx="34" cy="22" r="12" fill="#4b9a42"/><circle cx="44" cy="32" r="9" fill="#3f8a3a"/>`,
};

interface Item { img: HTMLImageElement; x: number; y: number; vx: number; vy: number; rot: number; spin: number; size: number }

export default function TossingBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;

    // Turn each drawing into an image the canvas can paint.
    const images = Object.values(ART).map((svg) => {
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${svg}</svg>`);
      return img;
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const gravity = 0.16;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const toss = (startY = H + 40): Item => ({
      img: images[Math.floor(Math.random() * images.length)],
      x: rand(0, W), y: startY,
      vx: rand(-1.2, 1.2),
      vy: -Math.sqrt(2 * gravity * rand(0.35, 0.95) * H), // tossed to between 35% and 95% of the screen height
      rot: rand(0, Math.PI * 2), spin: rand(-0.05, 0.05), size: rand(36, 70),
    });

    // How strong an item looks: faint behind the middle (where the text is), clearer at the sides.
    const content = Math.min(W - Math.min(Math.max(40, W * 0.06), 160), 1920); // same width as the page content (.page-wrap)
    const alphaAt = (x: number) => {
      const edge = (W - Math.min(W, content)) / 2;
      return x < edge - 20 || x > W - edge + 20 ? 0.75 : 0.12;
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items: Item[] = [];
    if (reduce) {
      for (let i = 0; i < 18; i++) items.push({ ...toss(rand(0, H)), vx: 0, vy: 0, spin: 0 });
    }

    let frame = 0, last = 0, timer = 0;
    const draw = (t: number) => {
      const dt = Math.min((t - last) / 16.7, 3) || 1;
      last = t;
      if (!reduce) {
        timer += dt;
        if (timer > 14 && items.length < 40) { items.push(toss()); timer = 0; }
      }
      ctx.clearRect(0, 0, W, H);
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        if (!reduce) {
          it.vy += gravity * dt; it.x += it.vx * dt; it.y += it.vy * dt; it.rot += it.spin * dt;
          if (it.y > H + 80 && it.vy > 0) { items.splice(i, 1); continue; }
        }
        if (!it.img.complete) continue;
        ctx.save();
        ctx.globalAlpha = alphaAt(it.x);
        ctx.translate(it.x, it.y);
        ctx.rotate(it.rot);
        ctx.drawImage(it.img, -it.size / 2, -it.size / 2, it.size, it.size);
        ctx.restore();
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };

    // Start with a few already in the air, so the page isn't empty at first.
    if (!reduce) for (let i = 0; i < 16; i++) { const it = toss(); it.y = rand(H * 0.2, H); it.vy = rand(-8, 2); items.push(it); }
    const start = () => { cancelAnimationFrame(frame); last = performance.now(); frame = requestAnimationFrame(draw); };
    images[0].onload = start;
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
