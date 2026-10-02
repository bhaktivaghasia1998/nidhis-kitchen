'use client';
import { GALLERY, RECIPES, asset } from '@/lib/recipes';
import { useRecipes } from '@/lib/use-recipes';
import { cn } from '@/lib/utils';
import SectionTitle from './section-title';

// Photo tiles. Until a recipe has a "photo", it shows a colored plate.
export default function Gallery() {
  const { openRecipe } = useRecipes();
  const items = GALLERY.map((slug) => RECIPES.find((r) => r.slug === slug)!).filter(Boolean);

  return (
    <section id="gallery" aria-labelledby="gallery-h" className="py-[72px]">
      <SectionTitle eyebrow="From the kitchen" title="Fresh off the stove" id="gallery-h" />
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 2xl:grid-cols-4">
        {items.map((r, i) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => openRecipe(r.slug)}
            className={cn('group relative aspect-square cursor-pointer overflow-hidden rounded-2xl text-left', !r.photo && i % 2 === 1 && 'stripes')}
            style={{ '--food': r.color, background: !r.photo && i % 2 === 0 ? r.color : undefined } as React.CSSProperties}
          >
            {r.photo
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={asset(r.photo)} alt={r.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              : <span className="plate absolute inset-[18%] transition-transform duration-500 group-hover:scale-105" />}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3.5 pt-7 pb-3 font-semibold text-white">
              {r.name}
              <small className="block text-[13px] font-normal opacity-85">Tap for the recipe</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
