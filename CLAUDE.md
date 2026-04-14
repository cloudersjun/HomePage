# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build static export to out/
npm run lint     # Run ESLint
npm run start    # Serve production build (after build)
```

Deploy after build:
```bash
rsync -avz out/ root@<server>:/opt/apps/HomePage/out/
```

## Architecture

This is the **宠店营销Agent** marketing homepage — a **single-page static site** built with Next.js 16 App Router configured for static export (`output: 'export'`). There is no server-side rendering; all pages are pre-rendered to `out/`.

**Single route:** `app/page.tsx` composes all sections in order: `Navbar → HeroSection → FeaturesSection → PricingSection → AboutSection → Footer`. `app/page.tsx` exports its own `metadata` (page-level SEO), overriding the base metadata in `app/layout.tsx`.

**Component model:** Each section is a standalone component in `components/`. They are purely presentational — no shared state, no data fetching. All components that use Framer Motion (`motion`, `AnimatePresence`) or browser APIs (scroll listeners, `useState`) must include `'use client'` at the top. Animations use Framer Motion; icons use Lucide React; styling uses Tailwind CSS v4.

**Design language:** Orange/pink gradient theme (`from-orange-400 to-pink-400`). Section anchors use `id` attributes (`#features`, `#pricing`, `#about`) for in-page navigation.

**Fonts:** Geist Sans + Geist Mono loaded via `next/font/google` in `app/layout.tsx`. Font CSS variables are `--font-geist-sans` and `--font-geist-mono`.

**Analytics:** Baidu Analytics injected via `<Script strategy="afterInteractive">` in `app/layout.tsx`.

**Deployment target:** Nginx on Aliyun serving `out/` as static files at `mineclaw.top`. The backend FastAPI service runs on port 8000 and is proxied at `/api/`. See `DEPLOY.md` for full Nginx config.

**Image optimization** is disabled (`images: { unoptimized: true }`) because Next.js image optimization requires a server.

**No test suite** exists in this project.
