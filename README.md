# 1142 Labs — Site Build

**Live URL:** https://1142labs.com  
**Platform:** Vercel (static deployment)  
**Built:** March 26, 2026

---

## Deploy

1. Upload / push the contents of this directory to your Vercel project root
2. Vercel will detect the `vercel.json` config and apply all routes automatically
3. No build step required — pure static HTML/CSS/JS

```bash
# Via Vercel CLI
vercel deploy --prod
```

---

## Directory Structure

```
1142labs-final/
├── index.html                    # Homepage
├── research_breakthroughs.html   # Research Hub (replaces research + breakthroughs + PDF pages)
├── 1142_chemicals.html           # Chemicals database
├── chemlog.html                  # Chem log
├── withdrawal.html               # Withdrawal calculator
├── tools.html                    # Tools hub
├── about.html                    # The Creator
├── creators.html                 # Creators
├── vision.html                   # Vision
├── archive.html                  # Archive
├── posters.html                  # Posters gallery
├── socials.html                  # Network / socials
├── resources.html                # Resources
├── assets/
│   ├── global.css               # Global stylesheet
│   ├── fx.js                    # Global effects script
│   ├── fonts/                   # Self-hosted fonts
│   └── images/
│       └── posters/             # Poster images (⚠ pending posters.zip import)
├── pdfs/                        # Research PDF files
├── vercel.json                  # Vercel routing config
├── sitemap.xml                  # XML sitemap
├── robots.txt                   # Robots rules
├── LICENSES.md                  # Font & asset license notes
└── README.md                    # This file
```

---

## Part 1 Changes (March 26, 2026)

- **Created** `research_breakthroughs.html` — unified Research Hub replacing
  `research.html`, `breakthroughs.html`, `pdf_portal.html`, and `library.html`
- **Removed** deprecated pages: research.html, breakthroughs.html, library.html, pdf_portal.html
- **Updated** main navigation (HUD + drawer) and footer sitewide on all 12 pages
- **Added** 301 redirects: /research → /research-breakthroughs, /breakthroughs → /research-breakthroughs,
  /pdf-portal → /research-breakthroughs, /library → /research-breakthroughs
- **Updated** sitemap.xml — removed deprecated URLs, added research-breakthroughs
- **Created** assets/images/posters/ directory
- **Fixed** all internal dead links across surviving pages

### ⚠ Outstanding (requires posters.zip)

- Poster image import into `assets/images/posters/` — `posters.zip` was not present
  in the provided workspace. Provide posters.zip to complete this step before Part 2.

---

## Routing Notes

All pages use Vercel `cleanUrls: true` — users access `/research-breakthroughs` not `.html`.  
All old URLs redirect 301 to the new equivalents. No broken links remain.

---

## Part 2 Changes (March 26, 2026)

- **Homepage hero:** Replaced "Tomorrow's Solutions Today" with **Scientific Fate** block — "Scientific / Fate / Decoded" with updated mission copy
- **Event line:** Updated to `A 12-HOUR SKILL ENHANCING EXPERIENCE ∞ EVERY 22ND · 11:42 PM → 11:42 AM ∞`
- **Timeline extracted:** Ritual timeline block removed from homepage; replaced with teaser CTA linking to `1142-toke-times.html`
- **Created** `1142-toke-times.html` — 7-node timeline (11:42 PM, 7:11, 4:20, 3:42 AM, 2:40, 7:42 AM, 11:42 AM) with desktop horizontal + mobile vertical layouts and subtle cannabis iconography
- **Merged Tools + Withdrawal → `calculators.html`** — Combined 4-substance combo calculator + two withdrawal timeline calculators into grouped, anchored sections; deleted `tools.html` and `withdrawal.html`
- **SEO metadata:** Added `<title>`, `<meta description>`, `<link rel="canonical">`, OG tags, Twitter Card tags, and JSON-LD structured data to all 13 pages
- **OG/Twitter images:** All pages now reference `assets/images/og-1142labs.png` (1200×630) — ⚠ this image needs to be created and placed at that path
- **Mobile optimization:** Appended mobile-first CSS to `global.css` — touch targets ≥44px, fluid grids, responsive hero, focus-visible keyboard nav, prefers-reduced-motion support
- **Navigation:** `1142-toke-times` added to HUD mega-panel, drawer, and footer sitewide
- **Routing:** `/tools`, `/withdrawal`, `/withdrawal-calculator` → 301 → `/calculators`; `/1142-toke-times` rewrite added
- **Sitemap:** Updated with calculators and 1142-toke-times, removed deprecated URLs

### ⚠ Outstanding

- **OG image:** `assets/images/og-1142labs.png` (1200×630) does not yet exist — create a branded image at this path before deploying. All SEO tags reference it.
- **Poster images:** Still pending `posters.zip` (from Part 1).

---

## Part 3 Changes (March 26, 2026)

- **Font system:** Implemented full CSS custom property stack (`--font-hero`, `--font-headers`, `--font-body`, `--font-ui`, `--font-accent`, `--font-global`) prepended to global.css with `font-display: swap` on self-hosted Streamster
- **Font preloads:** Added `<link rel="preload">` for Streamster.ttf and preconnect hints on all 13 pages
- **Font mapping applied:** Hero/title elements use `--font-hero` (Streamster → Bebas Neue → Orbitron), section headers use `--font-headers`, nav/buttons use `--font-ui`, body text uses Rajdhani/IBM Plex fallback
- **Clock 1 — Full Temporal Grid:** Integrated into `1142-toke-times.html` above the timeline — countdown to next 22nd + days-in-business counter with glitch digits, GPU-friendly animations, responsive layout
- **Clock 2 — Compact Widget:** Integrated into `calculators.html` header — shows next-22nd countdown + operational days, namespaced to avoid JS/CSS conflicts
- **All clocks namespaced:** All CSS classes prefixed `ttc-`, JS wrapped in IIFEs, clock vars use `--ttc-*` prefix to avoid overriding site globals
- **Full site QA:** 0 issues across all 13 pages — dead links, missing meta, canonical, og:title, global.css reference all verified clean
- **Final QA fixes:** Fixed residual anchor dead links (`tools.html#withdrawal`, `research.html#breakthroughs`) in index.html

### ⚠ Outstanding

- **OG image:** `assets/images/og-1142labs.png` (1200×630) — needs creation. All 13 pages reference it.
- **Hacked / Blacklisted / Sterofedilic fonts:** Not yet available as self-hosted files. `@font-face` stubs are commented in global.css — add .ttf/.otf files to `assets/fonts/` and uncomment.
- **Poster images:** Still pending `posters.zip`.

---

## FINAL DEPLOY INSTRUCTIONS

### Method 1: Vercel CLI (recommended)
```bash
# From the unzipped 1142labs-final/ directory:
vercel deploy --prod
```

### Method 2: Vercel Dashboard
1. Unzip `1142labs-final-ready.zip`
2. Go to vercel.com → your `1142labs` project → Settings → Git
3. Drag and drop the `1142labs-final/` folder into the deploy area, OR
4. Push contents to your connected GitHub repo

### Method 3: GitHub + Auto-Deploy
```bash
git clone <your-repo>
cp -r 1142labs-final/* <your-repo>/
cd <your-repo>
git add -A
git commit -m "feat: Part 1-3 — scientific fate redesign, calculators, toke times, font system, clocks"
git push origin main
# Vercel auto-deploys on push
```

### Smoke Test Checklist (post-deploy)
- [ ] Homepage loads with "Scientific Fate Decoded" hero
- [ ] Event line reads: "A 12-HOUR SKILL ENHANCING EXPERIENCE ∞ EVERY 22ND · 11:42 PM → 11:42 AM ∞"
- [ ] `/research-breakthroughs` loads the unified research hub
- [ ] `/research` and `/breakthroughs` redirect 301 to `/research-breakthroughs`
- [ ] `/calculators` loads with both calculators + clock widget
- [ ] `/tools` and `/withdrawal` redirect 301 to `/calculators`
- [ ] `/1142-toke-times` loads 7-node timeline + full temporal grid clock
- [ ] Mobile nav drawer opens and all links work
- [ ] No 404s in browser console
- [ ] OG preview shows on social share (Facebook Debugger / Twitter Card Validator)

### ⚠ Pre-Deploy Actions Required
1. **OG Image** — Replace `assets/images/og-1142labs.png` with a real branded 1200×630 image. Current file is a placeholder.
2. **Custom fonts** — Add `Hacked.ttf`, `Blacklisted.otf`, `Sterofedilic.otf` to `assets/fonts/` and uncomment their `@font-face` blocks in `global.css` (stubs are already there).
3. **Poster images** — Extract images from `posters.zip` → rename to `poster-01.jpg` etc. → place in `assets/images/posters/` → update `posters.html` with `<picture>` srcset markup.
