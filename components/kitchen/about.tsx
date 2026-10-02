import { asset } from '@/lib/recipes';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="py-[72px]">
      <div className="grid items-center gap-11 md:grid-cols-[.8fr_1.2fr]">
        {/* Polaroid-style frame with the Nidhi's Kitchen logo. */}
        <div className="mx-auto w-full max-w-[340px] -rotate-[2.5deg] rounded-md border-[1.5px] bg-card px-3.5 pt-3.5 pb-5 shadow-[0_22px_34px_-22px_rgba(60,30,0,.55)]">
          <div className="grid aspect-square place-items-center rounded-sm bg-[#f7efe0] p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/logo.svg')} alt="Nidhi's Kitchen logo" className="w-full" />
          </div>
          <p className="m-0 mt-3 font-hand text-[27px] leading-snug">&ldquo;Simple steps, fresh masalas and a lot of love.&rdquo;</p>
          <p className="m-0 mt-1.5 text-right font-hand text-[27px] text-chili">– Nidhi</p>
        </div>

        <div className="min-w-0">
          <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.14em] text-chili uppercase">The cook</p>
          <h2 id="about-h" className="m-0 mb-4 font-display text-[clamp(34px,5vw,52px)] leading-[1.05] font-normal">Hi, I&apos;m Nidhi</h2>
          <p className="max-w-[58ch] text-[19px]">
            Vegetarian food I cook at home: Gujarati comfort like dal dhokli, light satvik meals, healthy bakes and easy desserts. Every recipe comes with simple steps anyone can follow.
          </p>
          <dl className="my-5 grid gap-3">
            <div className="grid grid-cols-[5rem_1fr] gap-3"><dt className="font-display text-[22px] text-chili">Roots</dt><dd className="m-0">Gujarati home food and simple, light satvik cooking.</dd></div>
            <div className="grid grid-cols-[5rem_1fr] gap-3"><dt className="font-display text-[22px] text-chili">Today</dt><dd className="m-0">Trying new things too: lentil bakes, pasta, chilli and no-bake desserts.</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
