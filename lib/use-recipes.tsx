'use client';
// Shared "which recipe card is open" state, so any button on the page
// (hero, list, gallery, recipe of the week) can open a recipe.
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { RECIPES, type Recipe } from './recipes';

interface RecipeState {
  open: Recipe | null;
  openRecipe: (slug: string) => void;
  openRandom: () => void;
  close: () => void;
  scale: number; // recipe size: 0.5 = half, 1 = as written, 2 = double…
  setScale: (n: number) => void;
  cooking: Recipe | null; // the recipe shown in cooking mode
  startCooking: () => void; // switch from the recipe card to cooking mode
  stopCooking: () => void; // leave cooking mode and go back to the recipe card
}

const RecipeContext = createContext<RecipeState | null>(null);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Recipe | null>(null);
  const [scale, setScale] = useState(1);

  const openRecipe = useCallback((slug: string) => {
    setOpen(RECIPES.find((r) => r.slug === slug) ?? null);
    setScale(1);
  }, []);

  const openRandom = useCallback(() => {
    setOpen((current) => {
      const others = RECIPES.filter((r) => r !== current); // never the same one twice in a row
      return others[Math.floor(Math.random() * others.length)];
    });
    setScale(1);
  }, []);

  const close = useCallback(() => setOpen(null), []);

  const [cooking, setCooking] = useState<Recipe | null>(null);
  const startCooking = useCallback(() => { setCooking(open); setOpen(null); }, [open]);
  const stopCooking = useCallback(() => { setOpen(cooking); setCooking(null); }, [cooking]);

  const value = useMemo(
    () => ({ open, openRecipe, openRandom, close, scale, setScale, cooking, startCooking, stopCooking }),
    [open, openRecipe, openRandom, close, scale, cooking, startCooking, stopCooking],
  );
  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipes must be used inside <RecipeProvider>');
  return ctx;
}
