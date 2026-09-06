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

Open [http://localhost:3000](http://localhost:3000).

## iOS home-screen icon

Placeholder icons live in `public/icons/` (`180`, `192`, `512`). Apple touch icon and app icons are also registered in `src/app/` (`apple-icon.png`, `icon.png`) and `src/app/manifest.ts`.

To regenerate placeholders:

```bash
python3 scripts/generate-icons.py
```

## Deploy

Connected to GitHub and Vercel. Push to `main` to ship.
