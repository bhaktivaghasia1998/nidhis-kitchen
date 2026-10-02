import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import SectionTitle from './section-title';

// Tips taken from Nidhi's own recipe captions.
const tips = [
  { icon: '🍲', title: 'Dhokli are done when they float', text: 'Drop the pieces into boiling dal and cook until they float and turn soft.' },
  { icon: '🍔', title: 'Squeeze the beetroot', text: 'Squeeze the water out of grated beetroot so the burger patties hold their shape.' },
  { icon: '☕', title: 'Dip cookies quickly', text: 'For tiramisu cups, give the cookies a quick dip in coffee before layering.' },
  { icon: '⏲️', title: '3 minutes is enough', text: 'Instant Pot veggie soup needs just 3 minutes on High, then a quick release.' },
];

export default function Tips() {
  return (
    <section id="tips" aria-labelledby="tips-h" className="py-[72px]">
      <SectionTitle eyebrow="From Nidhi's recipes" title="Little kitchen tips" id="tips-h" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map((t) => (
          <Card key={t.title} className="gap-2 py-5">
            <CardContent className="grid gap-2 px-5">
              <span className="text-3xl leading-none" aria-hidden="true">{t.icon}</span>
              <CardTitle>{t.title}</CardTitle>
              <CardDescription className="text-[15px]">{t.text}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
