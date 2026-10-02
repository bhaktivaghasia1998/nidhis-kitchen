'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CATEGORIES, CATEGORY_LABEL, RECIPES, TAGS, asset, type Recipe, type Tag } from '@/lib/recipes';
import { useRecipes } from '@/lib/use-recipes';
import { cn } from '@/lib/utils';
import SectionTitle from './section-title';

const chilies = (n: number) => (n ? <span className="ml-1.5 text-[13px] text-chili" aria-label={`Spice level ${n}`}>{'🌶'.repeat(n)}</span> : null);

// The Recipes section: recipe of the week, search, filters, tabs and the list.
export default function RecipeExplorer() {
  const { openRecipe } = useRecipes();
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Tag[]>([]);

  // Recipe of the week: worked out in the browser so it changes every week.
  const [week, setWeek] = useState(0);
  useEffect(() => setWeek(Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))), []);
  const featured = RECIPES[week % RECIPES.length];

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      RECIPES.filter((r) => {
        if (filters.some((f) => !r.tags.includes(f))) return false;
        if (q) return [r.name, r.desc, ...r.ingredients].join(' ').toLowerCase().includes(q);
        return cat === 'all' || r.cat === cat;
      }),
    [cat, q, filters]
  );

  const toggle = (t: Tag) => setFilters((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));

  return (
    <section id="recipes" aria-labelledby="recipes-h" className="py-[72px]">
      <SectionTitle eyebrow="What's cooking" title="Recipes" id="recipes-h" />

      <FeaturedCard recipe={featured} onOpen={() => openRecipe(featured.slug)} />

      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <label className="relative min-w-0 flex-[1_1_260px]">
          <span className="sr-only">Search recipes</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            className="pl-11"
            placeholder="Search recipes or ingredients, e.g. quinoa, lentils, spinach"
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (e.target.value) setCat('all'); }}
          />
        </label>
        {TAGS.map((t) => {
          const on = filters.includes(t.id);
          return (
            <Button
              key={t.id}
              size="sm"
              variant="secondary"
              aria-pressed={on}
              onClick={() => toggle(t.id)}
              className={cn('border-dashed', on && 'border-solid border-veg bg-veg/10 text-veg')}
            >
              {t.emoji} {t.label}
            </Button>
          );
        })}
      </div>

      <Tabs value={cat} onValueChange={(v) => { setCat(v); setQuery(''); }}>
        <TabsList aria-label="Recipe categories">
          {CATEGORIES.map((c) => <TabsTrigger key={c.id} value={c.id}>{c.label}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" aria-live="polite">
        {shown.length ? shown.map((r) => <RecipeCard key={r.slug} recipe={r} onOpen={() => openRecipe(r.slug)} />)
          : <p className="col-span-full py-6 text-muted-foreground">No recipes match. Try a different word or turn off a filter.</p>}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><i className="veg-mark" aria-hidden="true" /> Vegetarian</span>
        <span>🌶 Spice level</span>
        <span>Tap a recipe to see ingredients and steps</span>
      </div>

    </section>
  );
}

function FeaturedCard({ recipe, onOpen }: { recipe: Recipe; onOpen: () => void }) {
  return (
    <Card className="mb-8 grid items-center gap-5 p-5 shadow-[0_20px_40px_-32px_rgba(60,30,0,.6)] sm:grid-cols-[auto_1fr_auto]">
      <FoodPhoto recipe={recipe} className="size-24 rounded-2xl sm:size-28" />
      <div className="min-w-0">
        <p className="m-0 flex items-center gap-1 font-hand text-xl font-bold text-chili"><Star className="size-4 fill-current" /> Recipe of the week</p>
        <h3 className="m-0 font-display text-[clamp(28px,3.5vw,38px)] leading-tight font-normal">{recipe.name}</h3>
        <p className="m-0 mt-1 text-muted-foreground">{recipe.desc}</p>
      </div>
      <Button size="lg" onClick={onOpen}>Get the recipe <ArrowRight /></Button>
    </Card>
  );
}

// The recipe's picture, or a colored plate if it has no picture yet.
function FoodPhoto({ recipe, className }: { recipe: Recipe; className?: string }) {
  return recipe.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={asset(recipe.photo)} alt="" loading="lazy" className={cn('object-cover', className)} />
  ) : (
    <div className={cn('plate', className)} style={{ '--food': recipe.color } as React.CSSProperties} aria-hidden="true" />
  );
}

// One recipe as a photo card. Clicking it opens the full recipe.
function RecipeCard({ recipe: r, onOpen }: { recipe: Recipe; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border-[1.5px] bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-leaf hover:shadow-[0_22px_40px_-24px_rgba(60,30,0,.55)] focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <FoodPhoto recipe={r} className="size-full transition-transform duration-500 group-hover:scale-105" />
        <Badge variant="secondary" className="absolute top-3 left-3 bg-card/90 backdrop-blur">{CATEGORY_LABEL[r.cat]}</Badge>
        {r.time && <Badge className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur">⏱ {r.time}</Badge>}
      </div>
      <div className="grid gap-1 p-4 pb-5">
        <h3 className="m-0 flex items-start gap-2.5 text-[19px] leading-snug font-semibold">
          <i className="veg-mark mt-1" aria-hidden="true" />
          <span>
            {r.name}
            {chilies(r.heat)}
          </span>
        </h3>
        <p className="m-0 pl-[26px] text-[15px] text-muted-foreground">{r.desc}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 pl-[26px]">
          {r.tags.map((t) => { const tag = TAGS.find((x) => x.id === t)!; return <Badge key={t} variant="outline" className="font-medium text-muted-foreground">{tag.emoji} {tag.label}</Badge>; })}
          <span className="ml-auto self-center text-xs text-muted-foreground">{r.date}</span>
        </div>
      </div>
    </button>
  );
}
