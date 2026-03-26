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
