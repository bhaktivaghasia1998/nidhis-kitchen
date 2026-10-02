// The home page. Each section lives in its own file in components/kitchen.
import { RecipeProvider } from '@/lib/use-recipes';
import RangoliBackground from '@/components/kitchen/rangoli-background';
import TimerDock from '@/components/kitchen/timer-dock';
import { TimerProvider } from '@/lib/timers';
import CookingMode from '@/components/kitchen/cooking-mode';
import Hero from '@/components/kitchen/hero';
import RecipeExplorer from '@/components/kitchen/recipe-explorer';
import RecipeDialog from '@/components/kitchen/recipe-dialog';
import Gallery from '@/components/kitchen/gallery';
import Tips from '@/components/kitchen/tips';
import About from '@/components/kitchen/about';
import Follow from '@/components/kitchen/follow';
import Reveal from '@/components/kitchen/reveal';
import KitchenPlatform from '@/components/kitchen/kitchen-platform';

export default function Home() {
  return (
    <RecipeProvider>
      <TimerProvider>
      <RangoliBackground />
      <Hero />
      <main className="page-wrap">
        <Reveal><RecipeExplorer /></Reveal>
        <KitchenPlatform variant={0} />
        <Reveal><Gallery /></Reveal>
        <KitchenPlatform variant={1} />
        <Reveal><Tips /></Reveal>
        <KitchenPlatform variant={2} />
        <Reveal><About /></Reveal>
        <Reveal><Follow /></Reveal>
      </main>
      <footer className="page-wrap flex flex-wrap justify-between gap-3 py-9 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Nidhi&apos;s Kitchen</span>
        <span className="font-hand">cooked with love</span>
      </footer>
      <RecipeDialog />
      <CookingMode />
      <TimerDock />
      </TimerProvider>
    </RecipeProvider>
  );
}
