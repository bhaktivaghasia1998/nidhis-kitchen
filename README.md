# Nidhi's Kitchen (Next.js + shadcn/ui)

Nidhi's vegetarian recipes from Instagram (@nidhiskitchen), as a website.

Built with **Next.js** (a React framework that runs on **Node.js**), **TypeScript**,
**Tailwind CSS** and **shadcn/ui** components.

## Run it on your Mac

```
cd ~/Documents/KeshavTech/Projects/nidhis-kitchen
npm install      # one time: downloads the libraries
npm run dev      # starts the site at http://localhost:3000
```

Press `Ctrl + C` in Terminal to stop it.

## Where things are

| File | What it does |
|---|---|
| `lib/recipes.ts` | **All the recipes.** Add or change recipes here. |
| `app/page.tsx` | The home page: puts all the sections in order. |
| `app/globals.css` | Colors (turmeric yellow, chili red…) and the thali drawing. |
| `components/kitchen/` | One file per section: hero, recipes, gallery, tips, about, follow. |
| `components/ui/` | shadcn components: Button, Badge, Card, Dialog, Input, Tabs. |
| `lib/use-recipes.tsx` | Remembers which recipe card is open. |

## Add a photo

Put the picture in `public/photos/` (e.g. `public/photos/dal-dhokli.jpg`), then add
`photo: "/photos/dal-dhokli.jpg",` to that recipe in `lib/recipes.ts`.

## Put it online (GitHub Pages)

A GitHub file, `.github/workflows/deploy.yml` (made on GitHub with **Add file → Create new file**),
builds the site and publishes it every time you upload changes.

1. On GitHub, make a new **public** repository called `nidhis-kitchen`.
2. Upload everything in this folder **except** `node_modules`, `.next` and `out`.
3. In the repository: **Settings → Pages → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for the green tick (about 2 minutes).
5. The site is live at `https://YOUR-USERNAME.github.io/nidhis-kitchen/`.

To update the site later, upload the changed files again; it republishes by itself.

## Share preview

When the link is shared on WhatsApp, Instagram etc., it shows `public/og.jpg` (1200 × 630).
Replace that picture to change the preview.
