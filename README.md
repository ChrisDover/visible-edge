# Visible Edge

A four-page pitch microsite for an automated CMMC compliance lead-generation system, built as both a working pitch document and a portfolio artifact.

**Live:** [pollinateresearch.com/visible-edge](https://pollinateresearch.com/visible-edge) (also at [chrisdover.github.io/visible-edge](https://chrisdover.github.io/visible-edge))

---

## What it is

Four screens, designed to be walked through end-to-end in a single browser session:

| Route | Purpose |
| --- | --- |
| `/` | Operations brief — system architecture, daily loop, build phases, success metrics |
| `/financial` | Monthly operating budget, cost breakdown by category, pipeline scenarios, guardrails |
| `/dashboard/sales` | Live mockup of what the salesperson sees daily — prioritized queue, dossier viewer, one-tap outcome capture |
| `/dashboard/owner` | Live mockup of the owner command center — funnel, pipeline accumulation, system health, ML model state |

The two dashboards are interactive React mockups. They run on hard-coded fixture data — there is no backend.

## Background

The Department of Defense's CMMC (Cybersecurity Maturity Model Certification) Phase 2 enforcement window closes in November 2026. Roughly 80,000 sub-100-employee DoD contractors need third-party Level 2 assessment to remain bid-eligible after that date — and only about 1% are currently certified.

Visible Edge is the lead operations system that surfaces those contractors as a prioritized, dossier-attached daily call queue: federal data ingest → enrichment waterfall → AI-generated dossier and opener → sales surface → ML feedback loop on call outcomes.

This site is the pitch document for the system, designed to be presented to a CMMC consulting firm considering it as a managed lead engine.

## Tech stack

- **Next.js 16** (App Router, static export)
- **TypeScript**, strict mode
- **Tailwind CSS v4** with design tokens defined in `globals.css` via `@theme`
- **Funnel Display + IBM Plex Sans + JetBrains Mono** via `next/font/google`
- **lucide-react** for iconography
- Deployed via **GitHub Pages** with GitHub Actions

No backend. No CMS. No analytics. No state management beyond local component state. The site is a handful of routes of pure static HTML/CSS/JS.

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build
# → ./out/  (static export, ready to serve)
```

The production build sets `basePath: '/visible-edge'` automatically (see `next.config.ts`). Local dev runs without the basePath so links resolve at the root.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes `out/` to GitHub Pages.

In repo settings, **Pages → Source** must be set to `GitHub Actions`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, metadata
│   ├── globals.css                 # Design tokens, font CSS vars, animations
│   ├── (site)/
│   │   ├── layout.tsx              # TopNav-wrapped layout for brief + financial
│   │   ├── site.css                # Page-specific styles (ported from source HTML)
│   │   ├── page.tsx                # /  — operations brief
│   │   └── financial/page.tsx      # /financial — budget + scenarios
│   └── dashboard/
│       ├── sales/page.tsx          # /dashboard/sales — rep view
│       └── owner/page.tsx          # /dashboard/owner — owner command center
├── components/
│   ├── Logo.tsx                    # Rotated diamond brand mark
│   ├── Dot.tsx                     # Pulsing status indicator
│   ├── TopNav.tsx                  # Sticky nav for brief + financial pages
│   └── data/
│       ├── leads.ts                # Mock leads for the sales dashboard
│       └── dashboard.ts            # Funnel, pipeline, activity, system health, ML state
└── lib/
    └── format.ts                   # Money formatting helpers
```

## Design notes

The aesthetic is "defense operator," not "SaaS startup." Specifically:

- All text is white. Hierarchy is signaled through `font-weight`, not color.
- Amber (`#fbbf24`) is the only accent. Status colors (green / blue / red) appear sparingly on metrics and badges.
- Headlines use Funnel Display 700–800. Body uses IBM Plex Sans 400–700. Numbers, labels, and structural markers use JetBrains Mono.
- Panels are framed in 1px borders with 4px radii. No shadows. No gradients beyond subtle radial glows in the page corners.

Source artifacts (the original HTML one-pager, JSX dashboards, and strategic plan) live in `source-assets/` for reference.
