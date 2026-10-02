// The small red label + big heading at the start of each section.
export default function SectionTitle({ eyebrow, title, id, children }: { eyebrow: string; title: string; id: string; children?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
      <div className="min-w-0">
        <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.14em] text-chili uppercase">{eyebrow}</p>
        <h2 id={id} className="m-0 font-display text-[clamp(34px,5vw,52px)] leading-[1.05] font-normal">{title}</h2>
      </div>
      {children}
    </div>
  );
}
