# Italy 2026

Small Next.js web app (TypeScript + Tailwind) for the Italy 2026 trip. Built to install on iPhone via **Add to Home Screen**.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PWA-ready icons + web app manifest

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3020](http://localhost:3020) (or the port printed by `pnpm dev`).

## Brand logo & iOS icon

Source artwork: `public/brand/italy-icon-source.jpeg`  
Processed assets:

- `public/logo.png` — in-app logo (`AppLogo`)
- `public/icons/icon-{32,180,192,512}.png` — PWA / home screen
- `src/app/apple-icon.png` + `src/app/icon.png` — Next metadata icons

Regenerate after replacing the source image:

```bash
python3 scripts/generate-icons.py
```

## Illustrations

Source sheet: `public/brand/italy-items-source.png`  
Split assets: `public/illustrations/*.png`  
Registry: `src/design-system/illustrations.ts`

```bash
python3 scripts/split-illustrations.py
```

## Deploy

Connected to GitHub and Vercel. Push to `main` to ship.
