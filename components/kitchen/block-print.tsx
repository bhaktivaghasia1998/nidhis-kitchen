// A thin border in the style of Indian hand block-printing: a row of little
// flowers and diamonds, used to separate the sections of the page.
export default function BlockPrint() {
  return (
    <div className="block-print mx-auto my-2 h-7 w-full max-w-3xl" role="separator" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="buti" width="56" height="28" patternUnits="userSpaceOnUse">
            {/* a 4-petal flower (buti) */}
            <g transform="translate(14 14)">
              {[0, 90, 180, 270].map((a) => (
                <ellipse key={a} cx="0" cy="-5.5" rx="3.2" ry="5.5" fill="var(--chili)" transform={`rotate(${a})`} />
              ))}
              <circle r="2.6" fill="var(--band-accent)" />
            </g>
            {/* a small diamond with dots */}
            <g transform="translate(42 14)">
              <rect x="-4.5" y="-4.5" width="9" height="9" fill="var(--leaf)" transform="rotate(45)" />
              <circle cx="-10" r="1.6" fill="var(--band-accent)" />
              <circle cx="10" r="1.6" fill="var(--band-accent)" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#buti)" />
      </svg>
    </div>
  );
}
