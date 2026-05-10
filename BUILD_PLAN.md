# Salman Portfolio — Build Plan

> Rebuild `salman_portfolio_redesign_mockup.html` into a production-grade Next.js 15 app.
> Tech: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · lucide-react · pnpm

---

## Architecture Overview

```
salman-portfolio/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, analytics
│   ├── page.tsx             # Composes all sections
│   └── globals.css          # CSS variables (design tokens), base styles
├── components/
│   ├── ui/                  # shadcn/ui primitives (Button, Badge, Card, Tabs, etc.)
│   ├── navigation.tsx       # Sticky nav with blur backdrop
│   ├── hero.tsx             # Hero with stat cards
│   ├── about.tsx            # About section with breadth grid
│   ├── experience.tsx       # Experience timeline
│   ├── skills.tsx           # Tabbed skills panel
│   ├── cta-band.tsx         # Dark "Currently Seeking" band
│   ├── contact.tsx          # Contact grid + "Open to" card
│   └── footer.tsx           # Footer links
├── lib/
│   ├── utils.ts             # cn() helper
│   └── data.ts              # All portfolio content (experience, skills, etc.)
├── public/
│   └── Salman_Rahman_Resume.pdf
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Key Decisions

| Decision | Rationale |
|---|---|
| **Content in `lib/data.ts`** | Single source of truth, typed with interfaces, easy to update — shows clean data/view separation |
| **`"use client"` per section** | Each section owns its own IntersectionObserver for scroll-reveal animation |
| **shadcn/ui for primitives** | Button, Badge, Card, Tabs — consistent, accessible, customizable |
| **CSS variables as design tokens** | Matches mockup's `--ink`, `--bg`, `--accent` system exactly |
| **Instrument Serif + Geist fonts** | Loaded via `next/font` for zero layout shift |
| **No routing** | Single-page portfolio — all sections on `page.tsx` |

---

## Part 1 — Project Scaffold & Design Tokens

**Goal:** Set up the Next.js project with all fonts, colors, and design tokens matching the mockup exactly.

### Tasks

- [ ] Initialize Next.js 15 with `pnpm create next-app` (App Router, TypeScript strict, Tailwind, ESLint)
- [ ] Install dependencies: `shadcn/ui`, `lucide-react`
- [ ] Configure `tailwind.config.ts` — extend theme with mockup's color palette:
  - `ink` (#0d0c0b), `ink2` (#3a3835), `ink3` (#7a7772)
  - `bg` (#f6f5f1), `bg2` (#edeae2), `bg3` (#e3dfd5)
  - `accent` (#1a6b4a), `accent2` (#2d8f63), `accent-bg` (#eaf4ef)
  - `amber` (#c17f24), `blue` (#1e4d8c), `red` (#c0392b)
  - Border radius: `--r: 6px`
- [ ] Set up fonts in `app/layout.tsx` using `next/font/google`:
  - **Instrument Serif** (weights: 400, italic) — `--font-serif`
  - **Geist** (weights: 300, 400, 500) — `--font-sans`
  - **Geist Mono** (weights: 400, 500) — `--font-mono`
- [ ] Write `app/globals.css` with CSS custom properties matching all mockup tokens
- [ ] Set up `lib/utils.ts` with `cn()` (clsx + tailwind-merge)
- [ ] Add shadcn/ui components: `Button`, `Badge`, `Card`, `Tabs`
- [ ] Create `lib/data.ts` with TypeScript interfaces and all hardcoded content:
  - `StatCard[]`, `Experience[]`, `SkillCategory[]`, `ContactLink[]`, `OpenToItem[]`
- [ ] Verify `pnpm dev` runs clean with correct fonts and background color

### Acceptance Criteria
- Page loads with `#f6f5f1` background, Geist font renders
- All design tokens accessible via Tailwind utilities (`text-ink`, `bg-accent`, etc.)
- `lib/data.ts` exports typed data matching all mockup content
- shadcn components installed and importable

### Status: `COMPLETED`

---

## Part 2 — Navigation + Hero Section

**Goal:** Build the sticky navigation bar and the hero section with stat cards — pixel-matching the mockup.

### Tasks

- [ ] Build `components/navigation.tsx`
  - Sticky top, `backdrop-blur-md`, semi-transparent bg
  - Left: "Salman Rahman" in Instrument Serif
  - Right: nav links (About, Experience, Skills) + "Hire Me" CTA button (accent bg)
  - Smooth scroll on link click
  - Mobile: hamburger menu with sheet/drawer (shadcn Sheet)
- [ ] Build `components/hero.tsx`
  - Two-column grid: left content, right stat cards
  - "Available" pill with pulsing green dot (CSS animation)
  - Eyebrow: mono font, uppercase, left dash
  - H1: Instrument Serif, 3.4rem, italic `<em>` in accent color
  - Subtitle with `<strong>` tags
  - Target country tags (flag emoji + country name) as badges
  - CTA buttons: "Get in touch" (primary) + "Download CV" (secondary/outline)
  - Stat cards stack (4 cards): large number in serif + label + description
  - Hover: stat cards shift right with accent border
- [ ] Scroll-reveal animation for hero (IntersectionObserver pattern)
- [ ] Responsive: stack to single column on mobile

### Typography Reference (must match exactly)
- Nav brand: `font-serif text-[1.05rem]`
- Nav links: `text-[0.72rem] font-medium tracking-[0.08em] uppercase`
- Eyebrow: `font-mono text-[0.68rem] tracking-[0.12em] uppercase`
- H1: `font-serif text-[3.4rem] leading-[1.06] tracking-[-0.02em]`
- Subtitle: `text-[0.95rem] leading-[1.75]`
- Stat number: `font-serif text-[2.2rem]`
- Stat label: `text-[0.68rem] font-medium tracking-[0.06em] uppercase`

### Acceptance Criteria
- Nav sticks on scroll with blur effect
- Hero layout matches mockup grid proportions
- Stat cards animate on hover
- All font sizes, weights, letter-spacing match mockup values
- Green dot pulses on the "Available" pill
- Responsive on mobile

### Status: `COMPLETED`

---

## Part 3 — About + Experience Sections

**Goal:** Build the About section with photo placeholder and breadth grid, and the Experience timeline.

### Tasks

- [ ] Build `components/about.tsx`
  - Section header: mono label ("About me") with accent line
  - Two-column grid: left image area, right body
  - Photo placeholder: 3:4 aspect ratio, rounded, border, camera emoji
  - Badge overlay: absolute positioned, bottom-right, dark bg ("Dhaka · Remote-ready")
  - Body: Serif h3, multiple `<p>` with `<strong>` highlights
  - Breadth grid: 2x2 grid of cards with left accent border
    - Each: uppercase label (accent) + description
  - Scroll-reveal animation
- [ ] Build `components/experience.tsx`
  - Section header: label + serif title + subtitle paragraph
  - Experience items as a vertical list (not timeline dots — clean grid layout)
  - Each item: left meta column (180px) + right content column
    - Left: company name, period (mono), location, client badge (blue pill)
    - Right: role title (serif), summary, bullet list with arrow prefix, tech tags
  - Bullet arrows: `→` in accent color
  - Tech tags: mono font, small, bg2 background, bordered
  - Border-bottom between items
  - Scroll-reveal with staggered delays per item

### Typography Reference
- Section label: `font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent`
- Section title: `font-serif text-[2.2rem] tracking-[-0.02em]`
- About h3: `font-serif text-[1.6rem]`
- Body text: `text-[0.88rem] leading-[1.8]`
- Breadth label: `text-[0.68rem] font-medium tracking-[0.08em] uppercase text-accent`
- Exp company: `font-medium text-[0.88rem]`
- Exp period: `font-mono text-[0.65rem] tracking-[0.04em]`
- Exp role: `font-serif text-[1.4rem]`
- Exp bullets: `text-[0.8rem] leading-[1.6]`
- Exp tags: `font-mono text-[0.62rem]`

### Acceptance Criteria
- About grid matches mockup proportions (300px image, 1fr body)
- Breadth items have left accent border
- Experience items render with correct grid layout
- Client badges show country flag + label in blue pill
- Bullet points use `→` prefix in accent color
- All spacing, font sizes, borders match mockup

### Status: `COMPLETED`

---

## Part 4 — Skills (Tabbed) + CTA Band

**Goal:** Build the interactive tabbed skills panel and the dark "Currently Seeking" CTA band.

### Tasks

- [ ] Build `components/skills.tsx`
  - Section header (label + title + subtitle)
  - Two-column layout: left sticky nav (220px) + right panel
  - Tab navigation: 5 buttons with emoji prefixes
    - Frontend, Backend, DevOps, AI & Tools, Leadership
    - Active state: accent bg, left border accent
    - Sticky at `top: 64px`
  - Skill panels (one visible at a time, fade-in animation):
    - Group titles: mono uppercase with trailing line
    - Skill tags in 3 tiers:
      - `core`: dark bg (`--ink`), light text — expert level
      - `strong`: `bg2` bg, bordered — regular production use
      - `know`: transparent bg, bordered — working knowledge
    - Note text: italic, smaller, with top border
  - Use shadcn Tabs OR custom implementation matching mockup's tab behavior
  - Panel switch animation: `fadeIn` (opacity + translateY)
- [ ] Build `components/cta-band.tsx`
  - Full-width dark background (`--ink` / near-black)
  - Inner container: two-column grid (copy + cards)
  - Left: mono label (accent2 color), serif title (light), subtitle (50% opacity)
  - Right: 4 info cards (semi-transparent bg, subtle border)
    - Each: emoji icon + label + value
    - Hover: slightly brighter background
  - Scroll-reveal animation

### Typography Reference
- Skill group title: `text-[0.65rem] font-medium tracking-[0.1em] uppercase`
- Skill tag: `text-[0.75rem]`
- Skills note: `text-[0.75rem] italic`
- CTA label: `font-mono text-[0.65rem] tracking-[0.12em] uppercase`
- CTA title: `font-serif text-[2rem] tracking-[-0.02em]`
- CTA subtitle: `text-[0.85rem] leading-[1.7]`
- CTA card label: `text-[0.7rem] font-medium tracking-[0.04em] uppercase`
- CTA card value: `text-[0.8rem]`

### Acceptance Criteria
- Tab switching works with correct panel visibility
- Skill tags render in 3 visual tiers (core/strong/know)
- Left nav is sticky while scrolling within skills section
- CTA band spans full width with dark bg
- Cards have subtle hover effect
- Typography and spacing match mockup exactly

### Status: `COMPLETED`

---

## Part 5 — Contact + Footer + Polish & Deploy

**Goal:** Build contact section, footer, add final responsive polish, performance optimization, and deploy.

### Tasks

- [ ] Build `components/contact.tsx`
  - Section header
  - Two-column grid: left contact info, right "Open to" card
  - Left: serif heading, description paragraph, contact link cards
    - Each link: icon circle + label + value (email, LinkedIn, GitHub)
    - Hover: accent border + accent text
  - Right: "What I'm open to" card
    - Rounded card with bg2, bordered
    - Serif h4 title
    - Checklist with `checkmark` prefix in accent color
  - Scroll-reveal
- [ ] Build `components/footer.tsx`
  - Top border, max-width container
  - Left: copyright text
  - Right: links (Email, LinkedIn, GitHub, Resume PDF)
  - Small text, ink3 color
- [ ] Compose everything in `app/page.tsx`
  - Import all section components in order
  - Verify section flow and spacing matches mockup
- [ ] Responsive polish (all breakpoints)
  - Mobile nav: hamburger + slide-out menu
  - Hero: single column stack
  - About: single column (image on top)
  - Experience: single column (no left meta column)
  - Skills: tabs on top (horizontal scroll) instead of side nav
  - CTA band: single column stack
  - Contact: single column stack
- [ ] Performance & SEO
  - Add SEO metadata in `layout.tsx` (title, description, OG tags)
  - Add `robots.txt` and `sitemap.xml`
  - Optimize fonts (preload, swap)
  - Verify Lighthouse score (target: 95+ all categories)
  - Add Vercel Analytics
- [ ] Deploy to Vercel

### Typography Reference
- Contact heading: `font-serif text-[1.8rem]`
- Contact description: `text-[0.85rem] leading-[1.75]`
- Contact link label: `text-[0.65rem] uppercase tracking-[0.07em]`
- Contact link value: `text-[0.82rem] font-medium`
- Open-to title: `font-serif text-[1.2rem]`
- Open-to items: `text-[0.8rem] leading-[1.5]`
- Footer text: `text-[0.72rem]`

### Acceptance Criteria
- Full page renders identically to HTML mockup on desktop
- Responsive at 768px, 640px, and 375px breakpoints
- Smooth scroll between sections
- All links functional (email mailto, LinkedIn, GitHub, CV download)
- Lighthouse: Performance 95+, Accessibility 100, Best Practices 95+, SEO 100
- Deployed and live on Vercel

### Status: `COMPLETED` (deploy pending user action)

---

## Progress Tracker

| Part | Description | Status |
|------|-------------|--------|
| 1 | Project Scaffold & Design Tokens | COMPLETED |
| 2 | Navigation + Hero Section | COMPLETED |
| 3 | About + Experience Sections | COMPLETED |
| 4 | Skills (Tabbed) + CTA Band | COMPLETED |
| 5 | Contact + Footer + Polish & Deploy | COMPLETED |

---

## Notes

- Each part should result in a working, visually verifiable state
- Run `pnpm dev` after each part to verify
- Commit after each part completion
- Reference `salman_portfolio_redesign_mockup.html` for exact pixel values
