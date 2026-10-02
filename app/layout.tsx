import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, DM_Sans, Caveat } from 'next/font/google';
import './globals.css';

// next/font downloads the fonts when building and serves them from your own site.
// Headings: DM Serif Display · Normal text: DM Sans · Handwritten notes: Caveat
const heading = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-heading' });
const body = DM_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-body' });
const hand = Caveat({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-handwriting' });

// The full web address of the site. GitHub sets this while building (see .github/workflows/deploy.yml).
// It's needed so WhatsApp, Instagram etc. can find the preview picture when someone shares the link.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const TITLE = "Nidhi's Kitchen";
const DESCRIPTION = 'Many cuisines, one home kitchen. Simple vegetarian recipes by Nidhi from every corner of the world.';
// The picture shown when the link is shared (public/og.jpg, 1200 × 630).
const PREVIEW = { url: `${SITE}/og.jpg`, width: 1200, height: 630, alt: "Nidhi's Kitchen: a Gujarati thali and the words one kitchen, many flavours" };

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE}/`),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { type: 'website', url: `${SITE}/`, siteName: TITLE, title: TITLE, description: DESCRIPTION, images: [PREVIEW] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [PREVIEW.url] },
};

// Colours the phone's browser bar to match the site.
export const viewport: Viewport = { themeColor: '#1f4d3a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
