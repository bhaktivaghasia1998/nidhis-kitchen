// Whole spices drawn as small pictures, floating gently around the thali.
const chili = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M14 18c10 2 14 12 18 22 4 9 11 15 22 16-9 4-21 2-29-7C17 40 13 30 14 18z" fill="#c13a1e" />
    <path d="M14 18c-1-5 1-9 5-11" stroke="#2f7a3c" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M20 24c4 6 6 13 10 19" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);
const cardamom = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <ellipse cx="32" cy="34" rx="12" ry="22" transform="rotate(25 32 34)" fill="#7ba05b" />
    <path d="M22 14c8 10 13 26 18 40" stroke="#5a7d3e" strokeWidth="2.5" fill="none" />
    <path d="M44 14l3-6" stroke="#5a7d3e" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const starAnise = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <ellipse key={a} cx="32" cy="16" rx="6" ry="14" fill="#7a3f1d" transform={`rotate(${a} 32 32)`} />
    ))}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <circle key={`s${a}`} cx="32" cy="12" r="2.6" fill="#d9a066" transform={`rotate(${a} 32 32)`} />
    ))}
    <circle cx="32" cy="32" r="5" fill="#5b2c12" />
  </svg>
);
const cinnamon = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <rect x="8" y="24" width="48" height="16" rx="8" fill="#a0592a" transform="rotate(-20 32 32)" />
    <path d="M12 38l40-15" stroke="#7a3f1d" strokeWidth="2.5" />
    <ellipse cx="55" cy="22" rx="4" ry="8" fill="#c27a42" transform="rotate(-20 55 22)" />
  </svg>
);
const bayLeaf = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 52C14 26 32 10 58 8 54 32 36 52 8 52z" fill="#6f8f3a" />
    <path d="M8 52C24 38 38 24 58 8" stroke="#4f6a26" strokeWidth="2.5" fill="none" />
  </svg>
);

const spices = [
  { el: chili, cls: 'top-[78%] -left-[12%] w-16 rotate-[-20deg]', delay: '0s' },
  { el: cardamom, cls: 'top-[50%] -left-[16%] w-10', delay: '1.2s' },
  { el: starAnise, cls: '-bottom-[8%] left-[44%] w-12', delay: '0.6s' },
  { el: cinnamon, cls: 'bottom-[8%] -right-[14%] w-16', delay: '1.8s' },
  { el: bayLeaf, cls: 'top-[42%] -right-[16%] w-12 rotate-12', delay: '2.4s' },
  { el: cardamom, cls: 'top-[14%] -right-[6%] w-9 rotate-45', delay: '3s' },
];

export default function Spices() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {spices.map((s, i) => (
        <span key={i} className={`spice absolute ${s.cls}`} style={{ animationDelay: s.delay }}>
          {s.el}
        </span>
      ))}
    </div>
  );
}
