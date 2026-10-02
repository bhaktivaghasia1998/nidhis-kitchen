'use client';
// The cook's speech bubble. Every few seconds she suggests a different dish.
// Clicking the bubble opens that recipe.
import { useEffect, useState } from 'react';
import { RECIPES } from '@/lib/recipes';
import { useRecipes } from '@/lib/use-recipes';

// [recipe slug, what she says]
const LINES: [string, string][] = [
  ['dal-dhokli', 'Today: Dal Dhokli!'],
  ['chilli-paneer', 'Chilli Paneer, anyone?'],
  ['tiramisu-cups', 'Something sweet? Tiramisu!'],
  ['masala-chaas', 'Cool Masala Chaas?'],
  ['sevai-upma', 'Quick Sevai Upma!'],
  ['marinara-sauce', 'Pasta night: Marinara!'],
  ['soya-kabab', 'Crispy Soya Kababs?'],
  ['green-paratha', 'Hot green parathas!'],
].filter(([slug]) => RECIPES.some((r) => r.slug === slug)) as [string, string][];

export default function SpeechBubble() {
  const { openRecipe } = useRecipes();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % LINES.length), 3500);
    return () => clearInterval(id);
  }, [paused]);

  const [slug, text] = LINES[i];

  return (
    <button
      type="button"
      onClick={() => openRecipe(slug)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={`${text} Open the recipe`}
      className="bubble absolute bottom-[74%] left-[28%] z-10 max-w-[260px] cursor-pointer rounded-[22px] border-2 border-leaf-foreground/90 bg-[#f7efe0] px-5 py-2.5 text-left text-[#1f4d3a] shadow-[0_10px_24px_-10px_rgba(0,0,0,.5)] transition-transform hover:-translate-y-0.5 hover:rotate-[-1deg]"
    >
      <span key={i} className="bubble-text block font-hand text-[clamp(20px,1.6vw,28px)] leading-tight font-bold whitespace-nowrap">{text}</span>
      <span className="block text-xs font-semibold text-chili">tap for the recipe →</span>
      {/* the little tail pointing at her head */}
      <svg className="absolute -bottom-[18px] right-8 h-5 w-6" viewBox="0 0 24 20" aria-hidden="true">
        <path d="M2 0 L22 0 L18 18 Z" fill="#f7efe0" />
        <path d="M2 1 L18 18 L22 1" fill="none" stroke="currentColor" strokeOpacity=".9" strokeWidth="2" className="text-leaf-foreground" />
      </svg>
    </button>
  );
}
