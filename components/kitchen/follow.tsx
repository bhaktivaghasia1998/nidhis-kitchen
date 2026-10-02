import { Camera, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INSTAGRAM } from '@/lib/recipes';

export default function Follow() {
  return (
    <section id="follow" aria-labelledby="follow-h" className="py-[72px]">
      <div className="grid items-center gap-9 rounded-3xl bg-leaf p-[clamp(28px,5vw,56px)] text-leaf-foreground md:grid-cols-[1.1fr_.9fr]">
        <div className="min-w-0">
          <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.14em] text-band-accent uppercase">Cook along</p>
          <h2 id="follow-h" className="m-0 font-display text-[clamp(34px,5vw,52px)] leading-[1.05] font-normal text-band-accent">Follow on Instagram</h2>
          <p className="mt-3.5 mb-0 max-w-[40ch] opacity-85">New recipes and what&apos;s on the table today.</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-[1.5px] border-white/20 px-4.5 py-3.5">
          <div>
            <small className="block text-[13px] tracking-[0.08em] uppercase opacity-70">Instagram</small>
            <b className="flex items-center gap-2 text-lg font-semibold"><Camera className="size-5" /> @nidhiskitchen</b>
          </div>
          <Button asChild variant="saffron" size="sm">
            <a href={INSTAGRAM} target="_blank" rel="noopener">Follow <ExternalLink /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
