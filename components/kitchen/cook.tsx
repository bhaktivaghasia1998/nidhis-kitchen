// A cartoon cook at the stove. Every few seconds she tosses the pan:
// the veggies jump up, a big flame flares out of the pan, and sparks rise.
// The burner flames flicker all the time. All drawn with SVG + CSS (see .cook in globals.css).

// One flame shape, standing on (0,0) and pointing up.
import type { CSSProperties } from 'react';
import SpeechBubble from './speech-bubble';

const FLAME = 'M0 0C-13-9-12-30 0-52C3-36 15-29 11-12C9-5 5 0 0 0Z';

const BITS = [
  { x: 62, c: '#ef8a2d', dx: -26, dy: -92, s: 'rect' }, // carrot
  { x: 74, c: '#8cc860', dx: -8, dy: -118, s: 'circle' }, // pea
  { x: 86, c: '#3f8f3a', dx: 14, dy: -104, s: 'rect' }, // capsicum
  { x: 96, c: '#8cc860', dx: 30, dy: -84, s: 'circle' }, // pea
  { x: 80, c: '#f6d33c', dx: 4, dy: -136, s: 'rect' }, // corn
  { x: 68, c: '#c8462b', dx: -18, dy: -70, s: 'rect' }, // tomato
];

export default function Cook({ className = '' }: { className?: string }) {
  return (
    <div className={`cook relative ${className}`}>
      <SpeechBubble />
      <svg viewBox="0 0 360 380" className="block w-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id="cook-glow">
            <stop offset="0" stopColor="#ffb347" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* warm glow from the fire */}
        <ellipse className="cook-glow" cx="85" cy="275" rx="150" ry="140" fill="url(#cook-glow)" />

        {/* the cook (behind the counter) */}
        <g>
          {/* other arm, resting on the counter */}
          <path d="M300 230Q326 286 292 322" stroke="#c8462b" strokeWidth="19" strokeLinecap="round" fill="none" />
          <circle cx="290" cy="324" r="10" fill="#c98a5e" />
          {/* body: kurta + apron */}
          <path d="M205 242Q205 214 232 209L280 209Q306 214 306 242L314 350H196Z" fill="#c8462b" />
          <path d="M229 222H281L296 350H214Z" fill="#f7efe0" />
          <path d="M229 222L242 205M281 222L268 205" stroke="#f7efe0" strokeWidth="5" />
          <rect x="237" y="262" width="36" height="24" rx="6" fill="none" stroke="#e8d7b8" strokeWidth="3" />
          {/* neck + head */}
          <rect x="247" y="190" width="16" height="24" rx="6" fill="#b87a50" />
          <circle cx="255" cy="164" r="34" fill="#c98a5e" />
          {/* hair with a bun */}
          <circle cx="288" cy="134" r="17" fill="#2b1a12" />
          <path d="M221 168Q216 126 256 126Q294 127 290 168Q284 146 256 143Q231 146 221 168Z" fill="#2b1a12" />
          {/* face: happy closed eyes, smile, cheeks */}
          <path d="M237 167Q243 161 249 167M261 167Q267 161 273 167" stroke="#2b1a12" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M245 180Q255 190 265 180" stroke="#7a2e1c" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="236" cy="178" r="6" fill="#e0705a" opacity=".45" />
          <circle cx="274" cy="178" r="6" fill="#e0705a" opacity=".45" />
          <circle cx="255" cy="151" r="2.6" fill="#c8462b" />
        </g>

        {/* kitchen counter + stove */}
        <rect x="0" y="332" width="360" height="44" rx="8" fill="#7a4e30" />
        <rect x="0" y="326" width="360" height="12" rx="4" fill="#a06b45" />
        <rect x="22" y="314" width="130" height="16" rx="5" fill="#2b2b2b" />
        <circle cx="132" cy="322" r="4" fill="#666" />

        {/* burner flames, always flickering */}
        <g>
          {[46, 58, 70, 82, 94, 106].map((x, i) => (
            <g key={x} transform={`translate(${x} 316) scale(.32)`}>
              <path className="cook-flick" d={FLAME} fill="#5aa0ff" style={{ animationDelay: `${i * 0.13}s` }} />
              <path className="cook-flick" d={FLAME} fill="#ffd166" transform="scale(.5)" style={{ animationDelay: `${i * 0.13 + 0.05}s` }} />
            </g>
          ))}
        </g>

        {/* arm + pan: this whole group tosses */}
        <g className="cook-toss">
          {/* the big flame that whooshes out of the pan */}
          <g className="cook-flare">
            {[
              [52, 1.1, '#e8562a'], [66, 1.6, '#f2a541'], [82, 1.9, '#e8562a'], [96, 1.4, '#f2a541'], [110, 1, '#e8562a'],
              [66, 1, '#ffd166'], [82, 1.25, '#ffe9a8'], [98, 0.9, '#ffd166'],
            ].map(([x, s, c], i) => (
              <g key={i} transform={`translate(${x} 282) scale(${s})`}>
                <path className="cook-flick" d={FLAME} fill={c as string} style={{ animationDelay: `${i * 0.09}s` }} />
              </g>
            ))}
          </g>

          {/* veggies jumping out of the pan */}
          {BITS.map((b, i) => (
            <g key={i} className="cook-bit" style={{ '--dx': `${b.dx}px`, '--dy': `${b.dy}px`, animationDelay: `${i * 0.03}s` } as CSSProperties}>
              {b.s === 'circle'
                ? <circle cx={b.x} cy="284" r="7" fill={b.c} />
                : <rect x={b.x - 7} y="277" width="14" height="14" rx="3" fill={b.c} />}
            </g>
          ))}

          {/* the pan (kadai) */}
          <path d="M34 280Q80 322 128 280Z" fill="#3b3b3b" />
          <path d="M30 280H132" stroke="#5a5a5a" strokeWidth="6" strokeLinecap="round" />
          <path d="M132 280L156 272" stroke="#2b2b2b" strokeWidth="8" strokeLinecap="round" />
          {/* her arm holding the pan */}
          <path d="M214 230Q186 262 160 272" stroke="#c8462b" strokeWidth="19" strokeLinecap="round" fill="none" />
          <circle cx="156" cy="273" r="10" fill="#c98a5e" />
        </g>

        {/* sparks rising */}
        {[60, 78, 92, 104, 70].map((x, i) => (
          <circle key={i} className="cook-spark" cx={x} cy="270" r="2.4" fill="#ffd166" style={{ animationDelay: `${i * 0.45}s` }} />
        ))}
      </svg>
    </div>
  );
}
