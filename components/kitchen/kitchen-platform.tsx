// The divider between sections: a granite kitchen platform (countertop) with a few
// everyday kitchen things standing on it. Each divider shows a different set.
// Everything is drawn in SVG; the granite counter itself is CSS (see .platform in globals.css).

const STEEL = '#c9d1d6';
const STEEL_DARK = '#8f999f';
const STEEL_LIGHT = '#eef2f4';
const WOOD = '#c58b52';
const WOOD_DARK = '#9a6535';
const COPPER = '#c4733d';

// Every item stands on the line y = 100.

function MasalaDabba({ x }: { x: number }) {
  const cups: [number, number, string][] = [
    [0, 0, '#f2b630'], [-30, -2, '#c8462b'], [30, -2, '#a07a45'], [-17, -8, '#4a3020'], [17, -8, '#d8c49a'], [-17, 5, '#e8a33a'], [17, 5, '#f4efe4'],
  ];
  return (
    <g>
      <path d={`M${x - 56} 76h112v16q0 8-8 8h-96q-8 0-8-8Z`} fill={STEEL} />
      <path d={`M${x - 50} 84h100`} stroke={STEEL_LIGHT} strokeWidth="2" opacity=".7" />
      <ellipse cx={x} cy="76" rx="56" ry="14" fill={STEEL_DARK} />
      <ellipse cx={x} cy="75" rx="52" ry="12" fill="#b9c2c7" />
      {cups.map(([dx, dy, c]) => (
        <g key={`${dx}${dy}`}>
          <ellipse cx={x + dx} cy={75 + dy} rx="12" ry="5.2" fill={STEEL_DARK} />
          <ellipse cx={x + dx} cy={74.5 + dy} rx="10.5" ry="4.2" fill={c} />
        </g>
      ))}
      {/* tiny spoon */}
      <path d={`M${x + 22} 70l26-14`} stroke={STEEL_LIGHT} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function ChaklaBelan({ x }: { x: number }) {
  return (
    <g>
      {/* round rolling board on little legs */}
      <rect x={x - 34} y="92" width="6" height="8" fill={WOOD_DARK} />
      <rect x={x + 28} y="92" width="6" height="8" fill={WOOD_DARK} />
      <path d={`M${x - 52} 86v5a52 9 0 0 0 104 0v-5Z`} fill={WOOD_DARK} />
      <ellipse cx={x} cy="86" rx="52" ry="9" fill={WOOD} />
      {/* a rolled-out roti */}
      <ellipse cx={x - 4} cy="85" rx="32" ry="5.6" fill="#ecd29b" />
      {[[-14, 0], [6, -1.5], [-2, 2], [14, 1]].map(([dx, dy]) => <ellipse key={dx} cx={x - 4 + dx} cy={85 + dy} rx="2.4" ry="1" fill="#c99a55" />)}
      {/* rolling pin */}
      <g transform={`rotate(-8 ${x + 70} 94)`}>
        <rect x={x + 40} y="91" width="12" height="6" rx="3" fill={WOOD_DARK} />
        <rect x={x + 50} y="89" width="44" height="10" rx="5" fill="#d9a066" />
        <rect x={x + 92} y="91" width="12" height="6" rx="3" fill={WOOD_DARK} />
      </g>
    </g>
  );
}

function Lota({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 14} 100q-16-8-12-26q4-14 16-16v-7h-6v-5h32v5h-6v7q12 2 16 16q4 18-12 26Z`} fill={COPPER} />
      <path d={`M${x - 16} 74q16 5 32 0`} stroke="#e39a63" strokeWidth="2" fill="none" />
      <ellipse cx={x - 12} cy="80" rx="4" ry="9" fill="#fff" opacity=".2" />
    </g>
  );
}

function Tumbler({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 12} 66h24l-3 34h-18Z`} fill={STEEL} />
      <ellipse cx={x} cy="66" rx="12" ry="3" fill={STEEL_DARK} />
      <path d={`M${x - 7} 70l2 26`} stroke={STEEL_LIGHT} strokeWidth="2.5" strokeLinecap="round" opacity=".8" />
    </g>
  );
}

function Stove({ x }: { x: number }) {
  return (
    <g>
      {/* pressure cooker on the left burner, with steam */}
      <g>
        {[0, 1].map((i) => (
          <path key={i} className="plat-steam" d={`M${x - 46 + i * 8} 34c-6-8 6-12 0-20s6-12 0-18`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" style={{ animationDelay: `${i * 1.1}s` }} />
        ))}
        <rect x={x - 76} y="46" width="60" height="36" rx="7" fill={STEEL} />
        <path d={`M${x - 80} 46h68`} stroke={STEEL_DARK} strokeWidth="4" strokeLinecap="round" />
        <path d={`M${x - 68} 44q22-9 44 0`} fill={STEEL} stroke={STEEL_DARK} strokeWidth="1.5" />
        <rect x={x - 51} y="32" width="10" height="11" rx="3" fill="#2b2b2b" />
        <rect x={x - 18} y="40" width="38" height="7" rx="3.5" fill="#2b2b2b" />
        <rect x={x - 70} y="58" width="48" height="3" rx="1.5" fill="#fff" opacity=".35" />
      </g>
      {/* kadai on the right burner */}
      <path d={`M${x + 18} 70q30 22 60 0Z`} fill="#3b3b3b" />
      <path d={`M${x + 14} 70h68`} stroke="#555" strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x + 10} 66q-6 0-6 4M${x + 86} 66q6 0 6 4`} stroke="#2b2b2b" strokeWidth="3" fill="none" />
      {[x + 36, x + 48, x + 60].map((fx, i) => (
        <path key={fx} className="cook-flick" d={`M${fx} 84c-4-3-4-9 0-14c1 4 4 6 3 10c0 2-1 4-3 4Z`} fill={i === 1 ? '#ffd166' : '#5aa0ff'} style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      {/* the stove body */}
      <rect x={x - 90} y="84" width="180" height="16" rx="4" fill="#2b2b2b" />
      <rect x={x - 90} y="84" width="180" height="3" rx="1.5" fill="#444" />
      {[-60, -42, 42, 60].map((dx) => <circle key={dx} cx={x + dx} cy="93" r="3.4" fill="#777" />)}
    </g>
  );
}

function Tiffin({ x }: { x: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x - 22} y={86 - i * 15} width="44" height="14" rx="3" fill={STEEL} />
          <rect x={x - 22} y={86 - i * 15} width="44" height="3" rx="1.5" fill={STEEL_DARK} />
          <rect x={x - 18} y={90 - i * 15} width="4" height="7" rx="2" fill={STEEL_LIGHT} opacity=".8" />
        </g>
      ))}
      {/* clip handle */}
      <path d={`M${x - 26} 98V48q0-8 8-8h36q8 0 8 8V98`} stroke={STEEL_DARK} strokeWidth="3" fill="none" />
      <rect x={x - 10} y="35" width="20" height="7" rx="3.5" fill="#2b2b2b" />
    </g>
  );
}

function Kettle({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x + 24} 78q14-6 22-22`} stroke="#c8462b" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d={`M${x - 30} 100q-6-34 30-38q36 4 30 38Z`} fill="#c8462b" />
      <path d={`M${x - 20} 66q20-26 40 0`} stroke="#2b2b2b" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx={x} cy="63" rx="14" ry="4" fill="#a8371f" />
      <circle cx={x} cy="58" r="4" fill="#2b2b2b" />
      <ellipse cx={x - 14} cy="80" rx="5" ry="10" fill="#fff" opacity=".22" />
      <path d={`M${x - 26} 92h52`} stroke="#f7efe0" strokeWidth="3" opacity=".6" />
    </g>
  );
}

function ChaiGlass({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 9} 72h18l-2 28h-14Z`} fill="#b9773f" />
      <path d={`M${x - 9} 72h18l-.5 6h-17Z`} fill="#e3c08f" />
      <path d={`M${x - 10} 70h20l-3 30h-14Z`} fill="#fff" fillOpacity=".12" stroke="#f7efe0" strokeOpacity=".7" strokeWidth="1.5" />
      {[0, 1].map((i) => <path key={i} className="plat-steam" d={`M${x - 3 + i * 6} 64c-4-5 4-8 0-13`} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" style={{ animationDelay: `${i * 0.8}s` }} />)}
    </g>
  );
}

function PickleJar({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 16} 100q-16-14-10-34q4-10 12-12h28q8 2 12 12q6 20-10 34Z`} fill="#f2e6cc" />
      <path d={`M${x - 26} 70q4-10 12-12h28q8 2 12 12q-26 8-52 0Z`} fill="#8a4a24" />
      <rect x={x - 14} y="44" width="28" height="12" rx="3" fill="#c8462b" />
      <path d={`M${x - 16} 52h32`} stroke="#f2a541" strokeWidth="2" />
      <path d={`M${x + 14} 50q8 4 4 12`} stroke="#f2a541" strokeWidth="2" fill="none" />
      <ellipse cx={x - 12} cy="82" rx="4" ry="9" fill="#fff" opacity=".35" />
    </g>
  );
}

function LemonBowl({ x }: { x: number }) {
  return (
    <g>
      {[[-14, 80], [0, 76], [14, 80]].map(([dx, cy]) => (
        <g key={dx}><ellipse cx={x + dx} cy={cy} rx="10" ry="8.5" fill="#f6d33c" /><ellipse cx={x + dx - 3} cy={cy - 3} rx="3" ry="2" fill="#fff" opacity=".45" /></g>
      ))}
      <path d={`M${x - 20} 74q14 6 30-6`} stroke="#3f8f3a" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d={`M${x + 4} 72q14 2 24-10`} stroke="#2f7a3c" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d={`M${x - 34} 82h68q-4 18-34 18q-30 0-34-18Z`} fill={STEEL} />
      <path d={`M${x - 34} 82h68`} stroke={STEEL_DARK} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Coconut({ x }: { x: number }) {
  return (
    <g>
      <circle cx={x} cy="84" r="16" fill="#7a4e30" />
      {[-8, -2, 5].map((d) => <path key={d} d={`M${x + d - 6} 72q4 12 2 24`} stroke="#5b3720" strokeWidth="1.5" fill="none" />)}
      {/* half coconut */}
      <path d={`M${x + 18} 100a18 14 0 0 1 36 0Z`} fill="#7a4e30" />
      <path d={`M${x + 21} 100a15 11 0 0 1 30 0Z`} fill="#f7f3ea" />
    </g>
  );
}

const SETS = [
  // 1: daily cooking
  [
    { w: 120, el: (x: number) => <MasalaDabba x={x} /> },
    { w: 170, el: (x: number) => <ChaklaBelan x={x - 20} /> },
    { w: 60, el: (x: number) => <Lota x={x} /> },
    { w: 46, el: (x: number) => <Tumbler x={x} /> },
  ],
  // 2: lunch on the stove
  [
    { w: 56, el: (x: number) => <Tumbler x={x} /> },
    { w: 200, el: (x: number) => <Stove x={x} /> },
    { w: 70, el: (x: number) => <Tiffin x={x} /> },
    { w: 46, el: (x: number) => <Tumbler x={x} /> },
  ],
  // 3: chai time
  [
    { w: 80, el: (x: number) => <PickleJar x={x} /> },
    { w: 80, el: (x: number) => <Kettle x={x - 6} /> },
    { w: 34, el: (x: number) => <ChaiGlass x={x} /> },
    { w: 34, el: (x: number) => <ChaiGlass x={x} /> },
    { w: 90, el: (x: number) => <LemonBowl x={x} /> },
    { w: 90, el: (x: number) => <Coconut x={x - 18} /> },
  ],
];

export default function KitchenPlatform({ variant = 0 }: { variant?: number }) {
  const items = SETS[variant % SETS.length];
  const gap = 34;
  const width = items.reduce((s, it) => s + it.w, 0) + gap * (items.length - 1);
  let cursor = 0;

  return (
    <div className="platform my-6" role="separator" aria-hidden="true">
      <svg viewBox={`-20 0 ${width + 40} 104`} className="platform-items mx-auto block h-auto text-muted-foreground/50" style={{ width: `min(100%, ${Math.round(width * 1.1)}px)` }}>
        {items.map((it, i) => {
          const x = cursor + it.w / 2;
          cursor += it.w + gap;
          return <g key={i}>{it.el(x)}</g>;
        })}
      </svg>
      <div className="platform-top" />
    </div>
  );
}
