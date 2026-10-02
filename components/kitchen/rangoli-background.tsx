// Two large rangoli designs made of spices in the empty space at the left and right of the page.
// They sit half off-screen, turn very slowly, and stay faint so text is easy to read.
// Pure SVG + CSS (see .rangoli in globals.css), no JavaScript needed.

import type { ReactNode } from 'react';

const C = { leaf: '#3f8f3a', saffron: '#f2a541', chili: '#c8462b', cream: '#f7efe0', gold: '#ffd166', clove: '#9a5a2e', pepper: '#b08a6a' };

// n copies of a shape, spread evenly around the centre.
const ring = (n: number, el: (i: number) => ReactNode, offset = 0) =>
  Array.from({ length: n }, (_, i) => (
    <g key={i} transform={`rotate(${(360 / n) * i + offset})`}>{el(i)}</g>
  ));

// A petal pointing up, from radius r0 to r1, width w.
const petal = (r0: number, r1: number, w: number) =>
  `M0 ${-r0} C ${w} ${-(r0 + (r1 - r0) * 0.35)} ${w * 0.6} ${-(r1 - (r1 - r0) * 0.15)} 0 ${-r1} C ${-w * 0.6} ${-(r1 - (r1 - r0) * 0.15)} ${-w} ${-(r0 + (r1 - r0) * 0.35)} 0 ${-r0} Z`;

// Spice shapes. Each one points "outward" (up, towards negative y) from radius r0 to r1.
const chili = (r0: number, r1: number) => (
  <>
    <path d={`M-4 ${-r0}C7 ${-(r0 + 8)} 8 ${-(r1 - 8)} 1 ${-r1}C-3 ${-(r1 - 10)} -6 ${-(r0 + 8)} -4 ${-r0}Z`} fill={C.chili} />
    <path d={`M-3 ${-r0}Q-6 ${-(r0 - 4)} -3 ${-(r0 - 7)}`} stroke={C.leaf} strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);
const bay = (r0: number, r1: number) => (
  <>
    <path d={petal(r0, r1, 10)} fill={C.leaf} />
    <path d={`M0 ${-r0}V${-r1 + 2}`} stroke="#a9c97a" strokeWidth=".9" />
  </>
);
const cardamom = (r0: number, r1: number) => (
  <>
    <ellipse cy={-(r0 + r1) / 2} rx="5.5" ry={(r1 - r0) / 2} fill="#8fb86a" />
    <path d={`M0 ${-r0 - 1}V${-r1 + 1}`} stroke="#5a7d3e" strokeWidth="1" />
  </>
);
const clove = (r0: number, r1: number) => (
  <>
    <path d={`M0 ${-r0}V${-(r1 - 5)}`} stroke={C.clove} strokeWidth="2.4" strokeLinecap="round" />
    {ring(4, () => <ellipse cy={-2.4} rx="1.4" ry="2.4" fill={C.clove} />).map((g, i) => <g key={i} transform={`translate(0 ${-(r1 - 4)})`}>{g}</g>)}
    <circle cy={-(r1 - 3)} r="2.4" fill="#c98a5e" />
  </>
);
const cinnamon = (r0: number, r1: number) => (
  <>
    <rect x="-4.5" y={-r1} width="9" height={r1 - r0} rx="3" fill="#b8703a" />
    <path d={`M-1.5 ${-r1 + 1.5}V${-r0 - 1.5}`} stroke="#7a3f1d" strokeWidth="1.4" />
    <circle cy={-r1 + 1.5} r="2.6" fill="none" stroke="#7a3f1d" strokeWidth=".9" />
  </>
);
const cumin = (r: number) => <ellipse cy={-r} rx="1.3" ry="3.4" fill="#c7a065" transform={`rotate(25 0 ${-r})`} />;
const starAnise = () => (
  <>
    {ring(8, () => <ellipse cy={-8.5} rx="3.8" ry="7.5" fill="#a0562a" stroke="#6b3418" strokeWidth=".6" />)}
    {ring(8, () => <circle cy={-10} r="1.6" fill={C.saffron} />)}
    <circle r="3.2" fill="#6b3418" />
  </>
);

function Rangoli() {
  return (
    <svg viewBox="-100 -100 200 200" className="size-full">
      {/* outer border: turmeric dots + mustard seeds */}
      {ring(60, () => <circle cy={-97} r="1.5" fill={C.gold} />)}
      {/* cinnamon sticks with peppercorns between */}
      {ring(16, () => cinnamon(80, 94))}
      {ring(16, () => <circle cy={-87} r="2.2" fill={C.pepper} />, 11.25)}
      {/* ring of cumin seeds */}
      {ring(40, () => cumin(74))}
      {/* bay leaves and red chillies */}
      {ring(12, () => bay(40, 68))}
      {ring(12, () => chili(44, 70), 15)}
      {/* peppercorn circle */}
      {ring(28, () => <circle cy={-37} r="1.9" fill={C.pepper} />)}
      {/* cardamom pods and cloves */}
      {ring(8, () => cardamom(16, 33))}
      {ring(8, () => clove(17, 32), 22.5)}
      {/* star anise in the centre */}
      {starAnise()}
    </svg>
  );
}

export default function RangoliBackground() {
  return (
    <div className="rangoli pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="rangoli-left"><Rangoli /></div>
      <div className="rangoli-right"><Rangoli /></div>
    </div>
  );
}
