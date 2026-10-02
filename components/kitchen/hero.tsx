'use client';
import { Camera, Dices, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INSTAGRAM, asset } from '@/lib/recipes';
import { useRecipes } from '@/lib/use-recipes';
import Thali from './thali';
import Cook from './cook';
import SpiceShelves from './spice-shelves';

const links = [
  { href: '#recipes', label: 'Recipes' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#tips', label: 'Tips' },
  { href: '#about', label: 'About' },
  { href: '#follow', label: 'Follow' },
];

// The yellow top band: menu, name, buttons and the thali drawing.
export default function Hero() {
  const { openRandom } = useRecipes();

  return (
    <div className="scallop bandhani relative overflow-hidden bg-leaf text-leaf-foreground">
      <SpiceShelves />
      <div className="page-wrap">
        <nav className="flex flex-wrap items-center justify-between gap-4 py-5">
          <a href="#top" className="flex items-center gap-3 font-display text-2xl no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/logo.svg')} alt="" className="size-11 drop-shadow-[0_4px_10px_rgba(0,0,0,.3)]" />
            <span>
            Nidhi&apos;s <span className="text-band-accent">Kitchen</span></span>
          </a>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] font-semibold no-underline underline-offset-4 hover:underline">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <header id="top" className="grid items-center gap-10 pt-6 pb-24 md:grid-cols-[1.1fr_.9fr] md:pt-9 xl:grid-cols-[1fr_minmax(240px,.6fr)_.9fr]">
          <div className="min-w-0">
            <h1 className="m-0 font-display text-[clamp(56px,7.5vw,150px)] leading-[1.02]">
              Nidhi&apos;s <span className="text-band-accent">Kitchen</span>
            </h1>
            <p className="mt-4 mb-0 max-w-[36ch] text-[clamp(18px,1.5vw,28px)]">
              Many cuisines, one home kitchen. Simple vegetarian recipes from every corner of the world.
            </p>
            <p className="mt-2 mb-0 inline-block -rotate-2 font-hand text-[28px]">one kitchen, many flavours ♥</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="cream">
                <a href={INSTAGRAM} target="_blank" rel="noopener"><Camera /> Follow on Instagram</a>
              </Button>
              <Button asChild size="lg" variant="creamOutline">
                <a href="#recipes">See recipes</a>
              </Button>
              <Button size="lg" variant="creamOutline" onClick={openRandom}>
                <Dices /> What should I cook today?
              </Button>
            </div>

            <ul className="mt-6 mb-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[15px] font-semibold">
              {['Vegetarian', 'Satvik favourites', 'Easy steps'].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Check className="size-4 text-band-accent" />{t}</li>
              ))}
            </ul>
          </div>
          <Cook className="mx-auto w-[min(100%,300px)] md:hidden xl:block xl:w-full xl:max-w-[440px]" />
          <Thali />
        </header>
      </div>
    </div>
  );
}
