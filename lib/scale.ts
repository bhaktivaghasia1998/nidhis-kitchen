// Scales the amounts in an ingredient line, e.g. "1½ tbsp jaggery" × 2 → "3 tbsp jaggery".
// Only the amount at the start of a line is changed (and "Juice of ½ lemon" style lines).
// Lines without an amount, like "Salt to taste", stay as they are.

const FRACS: [string, number][] = [['⅛', 1 / 8], ['¼', 1 / 4], ['⅓', 1 / 3], ['½', 1 / 2], ['⅔', 2 / 3], ['¾', 3 / 4]];
const FRAC_CHARS = FRACS.map(([c]) => c).join('');

// One amount: "2", "1½", "½", "1.5"
const NUM = `(?:\\d+(?:\\.\\d+)?\\s?[${FRAC_CHARS}]?|[${FRAC_CHARS}])`;
// An amount or a range: "6–8", "1-2", "3½"
const AMOUNT = new RegExp(`^(${NUM})(?:\\s?([–-])\\s?(${NUM}))?(?=\\s|$)`);

function parse(s: string): number {
  s = s.replace(/\s/g, '');
  let n = 0;
  const f = FRACS.find(([c]) => s.endsWith(c));
  if (f) { n += f[1]; s = s.slice(0, -1); }
  if (s) n += parseFloat(s);
  return n;
}

// Turns 2.5 into "2½", 0.333 into "⅓", 12 into "12".
export function formatAmount(n: number): string {
  if (n <= 0) return '0';
  let whole = Math.floor(n);
  let rest = n - whole;
  let best = '';
  let bestDiff = rest; // using no fraction at all
  for (const [c, v] of FRACS) {
    if (Math.abs(rest - v) < bestDiff) { best = c; bestDiff = Math.abs(rest - v); }
  }
  if (Math.abs(1 - rest) < bestDiff) { whole += 1; best = ''; }
  if (whole === 0 && !best) return FRACS[0][0]; // never show 0
  return `${whole || ''}${best}`;
}

// Measuring words. Anything else after the amount is something you count
// (cookies, chillies, leaves), so big counts are rounded to whole numbers.
const UNITS = /^\s*(tsp|tbsp|cups?|cans?|packets?|stalks?|ml|l|g|kg|oz|lb)\b/i;
const PLURAL: Record<string, string> = { cup: 'cups', can: 'cans', packet: 'packets', stalk: 'stalks' };

function scaleAmountAt(text: string, factor: number): string | null {
  const m = text.match(AMOUNT);
  if (!m) return null;
  let rest = text.slice(m[0].length);
  const unit = rest.match(UNITS);
  const fix = (n: number) => (!unit && n >= 3 ? Math.round(n) : n);
  const lo = fix(parse(m[1]) * factor);
  const hi = m[3] ? fix(parse(m[3]) * factor) : lo;
  const a = formatAmount(lo);
  const b = m[3] ? `${m[2]}${formatAmount(hi)}` : '';
  // "1 cups" → "1 cup", "2 cup" → "2 cups"
  if (unit) {
    const word = unit[1].toLowerCase();
    const single = word.replace(/s$/, '');
    if (PLURAL[single]) {
      const many = hi > 1;
      rest = rest.replace(unit[1], many ? PLURAL[single] : single);
    }
  }
  return a + b + rest;
}

export function scaleIngredient(line: string, factor: number): string {
  if (factor === 1 || line.startsWith('## ')) return line;
  const start = scaleAmountAt(line, factor);
  if (start !== null) return start;
  // "Juice of ½ lemon"
  const of = line.match(/^(juice of |zest of )/i);
  if (of) {
    const rest = scaleAmountAt(line.slice(of[0].length), factor);
    if (rest !== null) return of[0] + rest;
  }
  return line;
}

// "3–4" × 2 → "6–8"; "About 20 crackers" × 2 → "About 40 crackers"
export function scaleServes(serves: string, factor: number): string {
  if (factor === 1) return serves;
  return serves.replace(/\d+(?:\.\d+)?/g, (d) => formatAmount(parseFloat(d) * factor));
}
