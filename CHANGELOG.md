# CHANGELOG — 1142 Labs

All notable changes to 1142labs.com are documented here.

---

## [Part 3] — 2026-03-26

### Added
- Full CSS font system (`--font-hero`, `--font-headers`, `--font-body`, `--font-ui`, `--font-accent`) with `font-display: swap`
- `<link rel="preload">` for Streamster.ttf on all 13 pages
- Clock 1 (Full Temporal Grid) integrated into `1142-toke-times.html` — countdown to next 22nd + days-in-business with glitch digit animations
- Clock 2 (Compact Widget) integrated into `calculators.html` header — real-time 22nd countdown + operational days
- All clock components namespaced (`ttc-*`) to prevent CSS/JS conflicts
- Placeholder `og-1142labs.png` (1200×630) created at `assets/images/`

### Fixed
- Residual anchor dead links in `index.html` (`tools.html#withdrawal`, `research.html#breakthroughs`)
- Missing canonical + OG meta on `research_breakthroughs.html`
- Full QA pass: 0 issues across all 13 pages

---

## [Part 2] — 2026-03-26

### Added
- `1142-toke-times.html` — 7-node ritual timeline (11:42 PM, 7:11, 4:20, 3:42 AM, 2:40, 7:42 AM, 11:42 AM) with desktop horizontal + mobile vertical layout
- `calculators.html` — merged Tools + Withdrawal Calculator with grouped anchored sections
- SEO metadata sitewide: `<title>`, `<meta description>`, canonical, OG tags, Twitter Card, JSON-LD on all 13 pages
- Mobile-first CSS in `global.css`: touch targets ≥44px, fluid grids, focus-visible keyboard nav, `prefers-reduced-motion`
- `1142-toke-times` added to HUD mega-panel, drawer, and footer sitewide

### Changed
- Homepage hero text: "Tomorrow's Solutions Today" → **Scientific Fate Decoded**
- Event line: updated to `A 12-HOUR SKILL ENHANCING EXPERIENCE ∞ EVERY 22ND · 11:42 PM → 11:42 AM ∞`
- Homepage ritual timeline block extracted → teaser CTA linking to `1142-toke-times.html`
- `tools.html` renamed/merged → `calculators.html`
- `withdrawal.html` content merged into `calculators.html`, page deleted

### Routing (301 Redirects Added)
- `/tools` → `/calculators`
- `/withdrawal` → `/calculators`
- `/withdrawal-calculator` → `/calculators`
- `/the-engine` → `/calculators`

---

## [Part 1] — 2026-03-26

### Added
- `research_breakthroughs.html` — unified Research Hub (replaces research + breakthroughs + PDF pages)
- `assets/images/posters/` directory created
- `LICENSES.md` — font and asset license documentation
- 301 redirects: `/research`, `/breakthroughs`, `/pdf-portal`, `/library`, `/the-brain` → `/research-breakthroughs`

### Removed
- `research.html` — deprecated, redirected to `/research-breakthroughs`
- `breakthroughs.html` — deprecated, redirected to `/research-breakthroughs`
- `library.html` — deprecated, redirected to `/research-breakthroughs`
- `pdf_portal.html` — deprecated, redirected to `/research-breakthroughs`

### Changed
- Main navigation (HUD + drawer) updated sitewide on all pages
- Footer sitemap updated sitewide
- `sitemap.xml` updated: removed deprecated URLs, added new pages

---

## [Initial Deploy] — 2026-03-24

- Initial production build deployed to Vercel
- 13 core pages, global CSS/JS, PDF research library
