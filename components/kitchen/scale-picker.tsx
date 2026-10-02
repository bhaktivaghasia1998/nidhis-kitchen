'use client';
// Half / normal / double / triple buttons that resize a recipe's ingredient amounts.
import { useRecipes } from '@/lib/use-recipes';

const SIZES: [number, string][] = [[0.5, '½×'], [1, '1×'], [2, '2×'], [3, '3×']];

export default function ScalePicker({ className = '' }: { className?: string }) {
  const { scale, setScale } = useRecipes();
  return (
    <div role="group" aria-label="Recipe size" className={`inline-flex items-center gap-1 rounded-full border border-border bg-background/60 p-1 ${className}`}>
      {SIZES.map(([n, label]) => (
        <button
          key={n}
          type="button"
          aria-pressed={scale === n}
          aria-label={n === 1 ? 'As written' : n === 0.5 ? 'Half' : `${n} times`}
          onClick={() => setScale(n)}
          className={`h-8 min-w-11 cursor-pointer rounded-full px-3 text-sm font-semibold transition-colors ${scale === n ? 'bg-chili text-white' : 'text-foreground hover:bg-accent'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
