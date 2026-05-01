# Visible Edge — Project Handover for Claude Code

**Project:** A pitch microsite for a CMMC compliance lead-generation system, designed to be presented to a prospective design partner (James, owner of a small CMMC consulting firm) and then hosted publicly on GitHub Pages as a portfolio asset.

**Owner:** Chris Dover / Enfocado Capital
**Status:** Prototype assets complete. This handover converts them into a deployable Next.js site.
**Hosting:** GitHub Pages via static export from Next.js
**Repo name suggestion:** `visible-edge` or `enfocado-visible-edge`

---

## 1. Project Goal

Build a single-domain microsite at something like `visibleedge.enfocado.capital` (or a subpath on an existing domain) that hosts four screens:

1. **`/`** — Landing/operations brief (the one-pager). The pitch document.
2. **`/financial`** — Page 2 of the brief: monthly budget, cost breakdown, scenario math.
3. **`/dashboard/sales`** — Live React mockup of what the salesperson sees daily.
4. **`/dashboard/owner`** — Live React mockup of what the owner sees daily (command center).

Pages 1 and 2 are existing HTML; pages 3 and 4 are existing React components. All four share a single design system. The site needs to be cohesive enough that I can walk a prospect through all four artifacts in a single browser session without it feeling stitched together.

A simple top-nav linking the four pages is sufficient. No login, no backend, no database — this is a static presentation site.

---

## 2. Source Files (existing, ready to migrate)

I have four artifacts already built that need to be ported into this project:

| File | Type | Purpose |
|---|---|---|
| `visible_edge_one_pager.html` | Standalone HTML | Pages 1 + 2 of the pitch document |
| `visible_edge_sales_dashboard.jsx` | React component | Salesperson UI mockup |
| `visible_edge_command_center.jsx` | React component | Owner UI mockup |
| `cmmc_leadgen_plan.md` | Markdown | Strategic plan (internal reference, not on the site) |

Place these in `/source-assets/` at repo root. You'll consume them in the migration.

---

## 3. Design System (must be preserved exactly)

Every artifact uses the same visual language. Don't redesign — port faithfully.

**Colors (CSS variables):**
```css
--bg: #0a0d12;          /* page background */
--panel: #0d1117;       /* card/panel background */
--panel-2: #11161e;     /* nested panel */
--border: #1e2530;
--border-hi: #2a3340;
--text: #ffffff;        /* all text is white */
--amber: #fbbf24;       /* primary accent */
--amber-dim: #f59e0b;
--green: #34d399;       /* success/wins */
--blue: #60a5fa;        /* info/in-progress */
--red: #f87171;         /* urgency/blocked */
```

**Typography:**
- Headlines: `Funnel Display` (Google Fonts) — weights 700, 800
- Body: `IBM Plex Sans` — weights 400, 500, 600, 700
- Tabular/labels/code: `JetBrains Mono` — weights 400, 500, 600, 700

**Hierarchy through weight, not color.** All text is white. Importance signaled by `font-weight`:
- Labels/tabular numbers: 700 bold
- Headlines: 800 extra-bold
- Body content: 400 regular
- Emphasis within body: 700 bold

**Iconography:**
- React: `lucide-react` exclusively
- HTML: simple Unicode glyphs (→, ↺, ↑, ↓) styled with CSS

**Logo mark:** A 45-degree rotated square outline in amber with a small inner dot. Already implemented in the `.logo` CSS class — copy verbatim.

**Layout principles:**
- Wide panels with thin borders (`1px solid var(--border)`)
- 4px border-radius across the board
- Soft radial glows in page corners (`radial-gradient` on body) for depth
- Page max-width: 1180px, centered
- Heavy use of monospace tabular numbers for any data display
- Section headers with `/ NN` numbering and trailing horizontal rule

This aesthetic is intentional — it's "defense operator" not "SaaS startup." Don't soften it.

---

## 4. Recommended Tech Stack

```
Next.js 14 (App Router)
TypeScript
Tailwind CSS v3
lucide-react (already used in source)
```

**Why this stack:**
- Next.js static export → clean GitHub Pages deployment
- App Router → simple routing for the four pages
- Tailwind → matches the existing JSX components without refactoring
- TypeScript → keeps things tight as the site grows

**Don't add:**
- No CMS (this is a presentation, not a content site)
- No analytics initially (Chris can add Plausible later if he wants)
- No animation libraries beyond what CSS handles natively

---

## 5. Repository Structure

```
visible-edge/
├── README.md
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions for Pages deploy
├── source-assets/              # Drop the original artifacts here for reference
│   ├── visible_edge_one_pager.html
│   ├── visible_edge_sales_dashboard.jsx
│   ├── visible_edge_command_center.jsx
│   └── cmmc_leadgen_plan.md
├── public/
│   └── favicon.ico             # Use the rotated-square logo as favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, font loading, nav
│   │   ├── page.tsx            # / — operations brief
│   │   ├── financial/
│   │   │   └── page.tsx        # /financial — budget + scenarios
│   │   ├── dashboard/
│   │   │   ├── sales/
│   │   │   │   └── page.tsx    # /dashboard/sales — rep view
│   │   │   └── owner/
│   │   │       └── page.tsx    # /dashboard/owner — command center
│   │   └── globals.css         # CSS variables, base styles, font imports
│   ├── components/
│   │   ├── nav/
│   │   │   └── TopNav.tsx
│   │   ├── shared/
│   │   │   ├── Logo.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── KPICard.tsx
│   │   │   └── Dot.tsx         # Status dot with pulse animation
│   │   ├── brief/
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── MarketStrip.tsx
│   │   │   ├── PipelineDiagram.tsx
│   │   │   ├── DailyLoop.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── BuildPhases.tsx
│   │   │   ├── UIPreview.tsx
│   │   │   └── SuccessMetrics.tsx
│   │   ├── financial/
│   │   │   ├── OperatingTempos.tsx
│   │   │   ├── CostBreakdown.tsx
│   │   │   ├── PipelineScenarios.tsx
│   │   │   └── BudgetEnvelope.tsx
│   │   ├── dashboards/
│   │   │   ├── SalesDashboard.tsx
│   │   │   └── OwnerCommandCenter.tsx
│   │   └── data/
│   │       ├── leads.ts         # Mock leads array (extracted from sales dashboard)
│   │       ├── funnel.ts        # Mock funnel data
│   │       ├── activity.ts      # Mock activity feed
│   │       └── systems.ts       # Mock system health
│   └── lib/
│       └── format.ts            # fmtMoney() and other formatters
└── ...
```

---

## 6. Migration Steps (in order)

### Step 1 — Initialize the project

```bash
npx create-next-app@latest visible-edge --typescript --tailwind --app --src-dir --no-import-alias
cd visible-edge
npm install lucide-react
```

When prompted:
- ESLint: yes
- src/ directory: yes
- App Router: yes
- Customize import alias: yes, use `@/`

### Step 2 — Configure for GitHub Pages static export

In `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/visible-edge' : '',
  trailingSlash: true,
};
export default nextConfig;
```

Note: `basePath` should match the GitHub repo name. Adjust if hosting at a custom domain root.

### Step 3 — Set up the design system in globals.css

Replace the default `src/app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0a0d12;
  --panel: #0d1117;
  --panel-2: #11161e;
  --border: #1e2530;
  --border-hi: #2a3340;
  --text: #ffffff;
  --amber: #fbbf24;
  --amber-dim: #f59e0b;
  --green: #34d399;
  --blue: #60a5fa;
  --red: #f87171;
}

html, body {
  background: var(--bg);
  color: var(--text);
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
}

.font-display { font-family: 'Funnel Display', system-ui, sans-serif; }
.font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.tabular { font-variant-numeric: tabular-nums; }

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 240ms ease-out; }

.scrollbar-thin::-webkit-scrollbar { width: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #2a2f38; border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #3a4048; }
```

### Step 4 — Extend Tailwind theme

In `tailwind.config.ts`, extend the theme with the project colors so they're available as utility classes:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: '#0a0d12',
          panel: '#0d1117',
          panel2: '#11161e',
          border: '#1e2530',
          borderHi: '#2a3340',
        },
        accent: {
          amber: '#fbbf24',
          amberDim: '#f59e0b',
          green: '#34d399',
          blue: '#60a5fa',
          red: '#f87171',
        },
      },
      fontFamily: {
        display: ['Funnel Display', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
```

### Step 5 — Build shared components first

Before tackling pages, extract the repeated UI atoms into `src/components/shared/`:

**`Logo.tsx`** — The rotated square mark with optional brand text. Used in nav and page headers.

**`SectionHeader.tsx`** — The `/ NN | TITLE | ────` pattern used across all sections.

**`Dot.tsx`** — The pulsing status indicator. Variants: green, amber, red, grey.

**`KPICard.tsx`** — Already in command center. Extract to shared.

**`Stat.tsx`** — Generic label-value pair with optional delta indicator.

### Step 6 — Build the top nav

`src/components/nav/TopNav.tsx` — A minimal sticky nav at the top of every page with links to:
- Home (`/`) — "Brief"
- Financial (`/financial`) — "Financial"
- Sales View (`/dashboard/sales`) — "Sales View"
- Owner View (`/dashboard/owner`) — "Owner View"

Style: same dark panel, amber accent on active route, monospace labels at 11-12px, uppercase. Tight horizontal layout. Use Next's `usePathname` to highlight active.

This nav appears on the brief and financial pages but should be **hidden or minimized on the dashboard mockups** so they look like real applications, not pages with a presentation chrome on top.

Suggestion: on dashboard pages, render only the dashboard's own header and add a small "← Back to Brief" link in the corner.

### Step 7 — Port the one-pager (`/` and `/financial`)

The source HTML in `visible_edge_one_pager.html` has both pages stacked with a `.page-break` divider. Split it:

- Sections 01-06 of page 1 → `/` (`src/app/page.tsx`)
- Sections 01-04 of page 2 → `/financial` (`src/app/financial/page.tsx`)

Convert the inline `<style>` block to Tailwind classes where straightforward, and keep complex bespoke styles (the pipeline diagram arrows, the funnel bars) as scoped CSS modules or inline `<style jsx>`.

For each section in the HTML, build a corresponding component in `src/components/brief/` or `src/components/financial/`. Keep the markup faithful — same data, same labels, same numbers. Don't paraphrase content.

**Important:** the diamond logo, page header pattern, and section-header pattern should be reused across both pages via the shared components.

### Step 8 — Port the React dashboards

`visible_edge_sales_dashboard.jsx` and `visible_edge_command_center.jsx` are already React. Drop them in as `src/components/dashboards/SalesDashboard.tsx` and `OwnerCommandCenter.tsx`. Adjustments needed:

1. Convert to TypeScript (add type annotations to the data arrays and component props)
2. Extract the `LEADS`, `FUNNEL`, `ACTIVITY`, `SYSTEMS`, etc. arrays into `src/components/data/` files
3. Replace inline `<style>{FONTS}</style>` blocks with the global CSS (already loaded via `globals.css`)
4. Remove the `html, body, #root` background hack from FONTS (no longer needed since the Next.js layout handles it)
5. Wrap each in a page component at `src/app/dashboard/sales/page.tsx` and `src/app/dashboard/owner/page.tsx`
6. Add `'use client'` directive at the top of any component using `useState` or `useEffect`

### Step 9 — Polish layout and hover states

- Add a subtle grain or noise texture to the page background (very subtle — 2-3% opacity SVG noise) to prevent the dark from feeling flat
- Ensure all interactive elements have hover states (cards lift slightly, buttons brighten)
- Make sure the dashboards are responsive enough to look good at 1280px wide laptop screens (don't worry about mobile for now — these are demo screens)

### Step 10 — Set up GitHub Pages deployment

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Add a `.nojekyll` file to `public/` (Next.js usually handles this but doesn't hurt to be explicit).

In GitHub repo settings → Pages → Source: "GitHub Actions".

### Step 11 — Write the README

Should include:
- One-paragraph project description
- Live demo link (once deployed)
- Local development instructions (`npm install && npm run dev`)
- Build/deploy notes
- Tech stack
- A "Background" section briefly explaining what Visible Edge is (CMMC lead gen system, Phase 2 deadline pressure, etc.) — this is also portfolio material for Chris

---

## 7. Content Fidelity Notes

**Don't change the numbers.** Every figure on the brief and financial pages was carefully chosen to be defensible in front of a real prospect. Specifically:

- Universe size: ~80K
- Currently compliant: ~1%
- Phase 2 deadline: November 10, 2026
- Daily throughput target: 100-200 leads
- Tooling cost full ramp: $2,581/mo
- Cost per lead: $0.43
- Conservative pipeline: $202K (78x ROI)
- Expected pipeline: $600K (232x ROI)
- Optimistic pipeline: $1.5M (581x ROI)

**Don't paraphrase the prose.** The copy is calibrated. Carry it over verbatim.

**Mock data in the dashboards.** The 10 lead companies in the sales dashboard are fictional but realistic — keep the names. The funnel numbers (15,247 → 1,847 → 234 → ...) in the command center are illustrative — keep them.

---

## 8. Stretch Goals (after MVP ships)

These are nice-to-haves, not blockers:

1. **Print stylesheet** — make the brief and financial pages render cleanly on letter-size paper for offline review. The original HTML had partial print rules; extend them.

2. **PDF export button** — small button in the nav that triggers `window.print()` with print-optimized CSS. Useful for sending the brief as an email attachment.

3. **Live MTD counter on the command center** — the dashboard currently shows static numbers. Hook a real-time clock to the header (already partially done) and consider adding small numerical animation when the page loads (counter rolling up to the displayed value).

4. **A `/about` page** — short page explaining who Chris is and the broader Enfocado Capital thesis, for prospects who want context before the call.

5. **Custom domain** — point `visibleedge.enfocado.capital` (or chosen subdomain) at the GitHub Pages deployment via DNS CNAME.

6. **Open Graph metadata** — proper social share cards if the link gets shared on LinkedIn/X.

Don't build any of these in the first pass. Ship the four pages, then iterate.

---

## 9. What This Site Is NOT

To prevent scope creep, the following are explicitly out of scope:

- ❌ A working backend or API
- ❌ Real lead data ingestion or any actual functionality
- ❌ User authentication
- ❌ Forms or contact capture
- ❌ A blog or content section
- ❌ Animation libraries (Framer Motion, GSAP)
- ❌ State management beyond local component state
- ❌ Internationalization
- ❌ Mobile-first responsive design (desktop-first; mobile graceful but not optimized)

This is a static presentation site. Four pages. Four hours of focused work to ship.

---

## 10. Acceptance Criteria

The project is done when:

1. ✅ All four pages render correctly at `localhost:3000` matching the source artifacts
2. ✅ Navigation between pages works without full reloads
3. ✅ Top nav highlights the active page
4. ✅ Dashboards remain interactive (clicking leads in sales view, outcome buttons work)
5. ✅ Build passes (`npm run build`) with no warnings
6. ✅ Static export produces clean HTML in `/out`
7. ✅ Deployed to GitHub Pages and accessible at the public URL
8. ✅ Loads in under 2 seconds on the deployed URL
9. ✅ All text is white, all backgrounds dark, no rendering glitches
10. ✅ README is written and the repo is presentable as a portfolio piece

---

## 11. First Prompt to Run in Claude Code

When you start the Claude Code session, paste this:

> I have a handover document at `./HANDOVER.md` and four source assets in `./source-assets/`. Please read the handover first, then read each source asset to understand what we're building. After reading, give me a brief summary of what you understand the project to be and your proposed sequence of steps. Then we'll proceed step by step.

This forces a verification loop before any code is written and ensures Claude has the full context.

---

## 12. Final Notes for Chris

- **Commit early, commit often.** Push after each major step (init, design system, first page, etc.). This makes rollback trivial if something breaks.
- **Don't over-engineer the components.** This is a pitch site. Functional > beautiful abstractions. You can refactor later if you turn it into a real product.
- **Test the deployed URL on a fresh browser** before showing James. Chrome incognito or a different machine. Cached versions can hide issues.
- **The site is also a portfolio piece.** The same code that pitches James pitches every future CMMC consulting firm, every Centinela prospect, and every VP Corporate Security hiring manager who Googles you. Treat the README and overall polish accordingly.

---

*End of handover. Time estimate for an experienced operator running Claude Code: 3-5 focused hours from `npx create-next-app` to live deployment.*
