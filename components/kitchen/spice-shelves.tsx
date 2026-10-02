// A little kitchen wall (hanging utensils, a spice shelf, pans, a pressure cooker
// and a rolling pin) in the empty space at the far left and right of the green top section on very wide screens (see .spice-shelves in globals.css).

import type { ReactElement } from 'react';

type Fill = 'powder' | 'seeds' | 'pods' | 'sticks' | 'leaves';
interface Jar { x: number; w: number; h: number; color: string; lid: string; label: string; fill: Fill }

// Three small jars on each side's shelf.
const LEFT: Jar[] = [
  { x: 24, w: 40, h: 54, color: '#f2b630', lid: '#c8462b', label: 'turmeric', fill: 'powder' },
  { x: 76, w: 36, h: 64, color: '#c8462b', lid: '#3f8f3a', label: 'chilli', fill: 'powder' },
  { x: 124, w: 44, h: 50, color: '#a07a45', lid: '#b8703a', label: 'cumin', fill: 'seeds' },
];
const RIGHT: Jar[] = [
  { x: 24, w: 42, h: 58, color: '#8fb86a', lid: '#7a3f1d', label: 'cardamom', fill: 'pods' },
  { x: 78, w: 36, h: 50, color: '#4a3020', lid: '#f2a541', label: 'mustard', fill: 'seeds' },
  { x: 126, w: 40, h: 64, color: '#b8703a', lid: '#3f8f3a', label: 'cinnamon', fill: 'sticks' },
];

// Little marks on top of the colour so each jar looks like what's inside.
function Texture({ jar, top, bottom }: { jar: Jar; top: number; bottom: number }) {
  const { x, w, fill } = jar;
  const dots: ReactElement[] = [];
  const rows = Math.floor((bottom - top - 6) / 8);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < Math.floor((w - 10) / 8); c++) {
      const cx = x + 9 + c * 8 + (r % 2) * 4;
      const cy = top + 7 + r * 8;
      if (cx > x + w - 6) continue;
      if (fill === 'seeds') dots.push(<ellipse key={`${r}-${c}`} cx={cx} cy={cy} rx="1.6" ry="2.6" fill="#000" opacity=".22" transform={`rotate(${(r * 37 + c * 53) % 180} ${cx} ${cy})`} />);
      if (fill === 'powder' && (r + c) % 3 === 0) dots.push(<circle key={`${r}-${c}`} cx={cx} cy={cy} r="1" fill="#fff" opacity=".25" />);
    }
  }
  if (fill === 'pods') for (let i = 0; i < 5; i++) dots.push(<ellipse key={i} cx={x + 10 + ((i * 13) % (w - 18))} cy={top + 10 + i * ((bottom - top - 16) / 5)} rx="6" ry="3.5" fill="#000" opacity=".18" transform={`rotate(${i * 40} ${x + 10 + ((i * 13) % (w - 18))} ${top + 10 + i * 8})`} />);
  if (fill === 'sticks') for (let i = 0; i < 4; i++) dots.push(<rect key={i} x={x + 8 + i * ((w - 16) / 4)} y={top - 14} width="6" height={bottom - top + 12} rx="3" fill={jar.color} stroke="#000" strokeOpacity=".25" />);
  if (fill === 'leaves') for (let i = 0; i < 4; i++) dots.push(<path key={i} d={`M${x + 8 + i * 9} ${bottom - 4}Q${x + 2 + i * 9} ${top + 4} ${x + 14 + i * 9} ${top - 10}Q${x + 18 + i * 9} ${top + 10} ${x + 8 + i * 9} ${bottom - 4}Z`} fill={jar.color} stroke="#000" strokeOpacity=".2" />);
  return <>{dots}</>;
}

function JarShape({ jar, base }: { jar: Jar; base: number }) {
  const { x, w, h, color, lid, label } = jar;
  const top = base - h;
  const fillTop = top + 16 + (jar.fill === 'sticks' || jar.fill === 'leaves' ? 18 : 4);
  return (
    <g>
      {/* contents */}
      <rect x={x + 3} y={fillTop} width={w - 6} height={base - fillTop - 3} rx="6" fill={color} />
      <Texture jar={jar} top={fillTop} bottom={base - 3} />
      {/* glass */}
      <rect x={x} y={top + 10} width={w} height={h - 10} rx="9" fill="#fff" fillOpacity=".08" stroke="#f7efe0" strokeOpacity=".75" strokeWidth="2" />
      <rect x={x + 5} y={top + 16} width="4" height={h - 30} rx="2" fill="#fff" opacity=".35" />
      {/* lid */}
      <rect x={x + 3} y={top} width={w - 6} height="12" rx="4" fill={lid} />
      <rect x={x + 3} y={top + 8} width={w - 6} height="4" fill="#000" opacity=".15" />
      {/* label */}
      <rect x={x + 5} y={base - 26} width={w - 10} height="15" rx="3" fill="#f7efe0" />
      <text x={x + w / 2} y={base - 15} textAnchor="middle" fontSize={Math.min(9, (w - 14) / (label.length * 0.56))} fontWeight="700" fill="#1f4d3a" fontFamily="var(--font-body), sans-serif">{label}</text>
    </g>
  );
}

const STEEL = '#cfd6da';
const STEEL_DARK = '#8f999f';
const WOOD = '#a06b45';
const WOOD_DARK = '#7a4e30';

// Utensils hanging from the rail. Each hangs from (x, 40) and sways a little.
function Ladle({ x }: { x: number }) {
  return (<><path d={`M${x} 46V128`} stroke={STEEL} strokeWidth="4" strokeLinecap="round" /><path d={`M${x - 15} 128a15 13 0 0 0 30 0Z`} fill={STEEL} stroke={STEEL_DARK} strokeWidth="1.5" /></>);
}
function Spatula({ x }: { x: number }) {
  return (<><rect x={x - 3} y="46" width="6" height="60" rx="3" fill={WOOD} /><rect x={x - 11} y="104" width="22" height="34" rx="4" fill={STEEL} stroke={STEEL_DARK} strokeWidth="1.5" />{[0, 1, 2].map((i) => <rect key={i} x={x - 6 + i * 5} y="110" width="2.4" height="20" rx="1" fill={STEEL_DARK} />)}</>);
}
function Whisk({ x }: { x: number }) {
  return (<><rect x={x - 3.5} y="46" width="7" height="44" rx="3.5" fill="#c8462b" />{[16, 11, 6].map((rx) => <ellipse key={rx} cx={x} cy="116" rx={rx / 1.6} ry="28" fill="none" stroke={STEEL} strokeWidth="1.6" />)}</>);
}
function Spoon({ x }: { x: number }) {
  return (<><path d={`M${x} 46V112`} stroke={WOOD} strokeWidth="5" strokeLinecap="round" /><ellipse cx={x} cy="126" rx="10" ry="16" fill={WOOD} stroke={WOOD_DARK} strokeWidth="1.5" /></>);
}
function Fork({ x }: { x: number }) {
  return (<><path d={`M${x} 46V108`} stroke={STEEL} strokeWidth="4" strokeLinecap="round" /><path d={`M${x - 9} 108h18v6a9 9 0 0 1-18 0Z`} fill={STEEL} />{[-7, -2.3, 2.3, 7].map((d) => <path key={d} d={`M${x + d} 116V136`} stroke={STEEL} strokeWidth="2.4" strokeLinecap="round" />)}</>);
}

function Rail({ items }: { items: ((p: { x: number }) => ReactElement)[] }) {
  return (
    <g>
      <rect x="8" y="30" width="184" height="6" rx="3" fill={STEEL_DARK} />
      <circle cx="10" cy="33" r="6" fill={WOOD_DARK} /><circle cx="190" cy="33" r="6" fill={WOOD_DARK} />
      {items.map((Item, i) => {
        const x = 28 + i * 36;
        return (
          <g key={i} className="hang" style={{ transformOrigin: `${x}px 34px`, animationDelay: `${i * -0.7}s` }}>
            <path d={`M${x} 30a4 4 0 1 1 0 8v8`} stroke={STEEL_DARK} strokeWidth="2" fill="none" />
            <Item x={x} />
          </g>
        );
      })}
    </g>
  );
}

function FryingPan({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g className="hang" style={{ transformOrigin: `${x}px ${y - r - 46}px`, animationDelay: `${x * -0.03}s` }}>
      <circle cx={x} cy={y - r - 44} r="4" fill="none" stroke={STEEL_DARK} strokeWidth="2" />
      <rect x={x - 4} y={y - r - 40} width="8" height="42" rx="4" fill="#2b2b2b" />
      <circle cx={x} cy={y} r={r} fill="#3b3b3b" />
      <circle cx={x} cy={y} r={r - 5} fill="#2b2b2b" />
      <ellipse cx={x - r / 3} cy={y - r / 3} rx={r / 4} ry={r / 7} fill="#fff" opacity=".12" transform={`rotate(-35 ${x - r / 3} ${y - r / 3})`} />
    </g>
  );
}

function PressureCooker({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y - 46} width="62" height="46" rx="8" fill={STEEL} stroke={STEEL_DARK} strokeWidth="1.5" />
      <path d={`M${x - 4} ${y - 46}h70`} stroke={STEEL_DARK} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x + 8} ${y - 50}q23 -10 46 0`} fill={STEEL} stroke={STEEL_DARK} strokeWidth="1.5" />
      <rect x={x + 26} y={y - 66} width="10" height="12" rx="3" fill="#2b2b2b" />
      <rect x={x + 54} y={y - 52} width="40" height="8" rx="4" fill="#2b2b2b" />
      <rect x={x + 8} y={y - 30} width="46" height="3" rx="1.5" fill="#fff" opacity=".3" />
    </g>
  );
}

function RollingPin({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y - 12} width="12" height="7" rx="3.5" fill={WOOD_DARK} />
      <rect x={x + 10} y={y - 15} width="48" height="13" rx="6.5" fill="#d9a066" />
      <rect x={x + 56} y={y - 12} width="12" height="7" rx="3.5" fill={WOOD_DARK} />
    </g>
  );
}

function Plank({ y }: { y: number }) {
  return (
    <>
      <rect x="0" y={y} width="200" height="10" rx="3" fill={WOOD} />
      <rect x="0" y={y + 7} width="200" height="4" rx="2" fill={WOOD_DARK} />
      <path d={`M24 ${y + 10}v14h8l-8-14Z M176 ${y + 10}v14h-8l8-14Z`} fill={WOOD_DARK} />
    </>
  );
}

function KitchenWall({ side }: { side: 'left' | 'right' }) {
  const left = side === 'left';
  return (
    <svg viewBox="0 0 200 520" className="block h-full w-auto max-w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* hanging utensils */}
      <Rail items={left ? [Ladle, Spatula, Whisk, Spoon, Fork] : [Fork, Whisk, Spoon, Spatula, Ladle]} />

      {/* spice shelf */}
      {(left ? LEFT : RIGHT).map((j) => <JarShape key={j.label} jar={j} base={250} />)}
      <Plank y={250} />

      {/* hanging pans */}
      <FryingPan x={left ? 64 : 136} y={358} r={34} />
      <FryingPan x={left ? 146 : 56} y={346} r={24} />

      {/* bottom shelf: pressure cooker and rolling pin */}
      {left ? <><PressureCooker x={14} y={478} /><RollingPin x={118} y={478} /></>
            : <><RollingPin x={14} y={478} /><PressureCooker x={96} y={478} /></>}
      <Plank y={478} />
    </svg>
  );
}

export default function SpiceShelves() {
  return (
    <>
      <div className="spice-shelves left-0"><KitchenWall side="left" /></div>
      <div className="spice-shelves right-0"><KitchenWall side="right" /></div>
    </>
  );
}
