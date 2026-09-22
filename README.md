# Salman Rahman — Senior Software Engineer

**Full-stack TypeScript · 9+ years · Dhaka, Bangladesh (remote-first)**

I turn messy requirements into products people actually use — for Norwegian
government agencies, Swiss insurers, and US startups. React, Next.js and Svelte
at the front; Node.js, PostgreSQL, Docker and CI/CD behind them, set up by me
rather than handed over at the API boundary.

[Live site](https://www.salmanrahman.com) ·
[Blog](https://www.salmanrahman.com/blog) ·
[Resume PDF](https://www.salmanrahman.com/Salman_Rahman_Resume.pdf) ·
[LinkedIn](https://linkedin.com/in/salmanbd) ·
[GitHub](https://github.com/salmanbd100) ·
[salman.bd100@gmail.com](mailto:salman.bd100@gmail.com)

> **This repository is two things:** my personal site and blog, and a working
> sample of how I build — Next.js 16, fully static, no runtime data fetching.
> Jump to [About this repository](#about-this-repository) for the engineering
> detail.

---

## The 30-second version

| | |
|---|---|
| **Current role** | Senior Software Engineer at Cefalo (Nov 2022 – present) |
| **Experience** | 9+ years, all in production web applications |
| **Core stack** | TypeScript, React, Next.js, Svelte 5 / SvelteKit, Node.js, PostgreSQL |
| **Also owns** | REST/GraphQL API design, Docker, CI/CD, AWS deployments |
| **Clients worked with** | 🇳🇴 Norwegian public sector · 🇨🇭 Swiss enterprise · 🇺🇸 US startups |
| **Education** | MSc and BSc in Statistics — the reason I argue from measurements, not opinions |
| **Location** | Dhaka, Bangladesh · fully remote for 3+ years, comfortable across time zones |
| **Looking for** | Senior or Lead, full-stack TypeScript, remote-first — sponsorship welcome if the role is on-site |

**What I'm doing right now:** I own the biomethane product end to end on a
European energy-market analytics platform built in Svelte 5 / SvelteKit —
dashboards, charts, and the data layer behind them. 70+ features in 8 months,
including 30+ ECharts visualisations backed by TanStack Query and a Sanity
content layer.

### Results I can point to

| Impact | Where |
|---|---|
| **70+ features in 8 months**, incl. 30+ charts | European energy-market analytics platform (Svelte 5 / SvelteKit) |
| **40% faster form rendering** | Dynamic form-builder used across Norwegian municipalities |
| **50% faster developer onboarding** | Scalable Redux architecture and React conventions I introduced |
| **20% higher retention and conversion** | Customer-facing insurance portal for a Swiss enterprise |
| **35% fewer data-fetching issues** | Refactored the frontend–backend communication layer |
| **25% fewer frontend bugs** | State management overhaul at a US AI startup |

### Where I'm the right hire

- Products with real users and real constraints — public sector, enterprise, regulated
- Codebases that have outgrown their architecture and need untangling
- Teams that want one person across the stack, not a handoff at the API boundary
- Work where performance and accessibility are requirements, not nice-to-haves

---

## Work history

**Cefalo** — Senior Software Engineer · *Nov 2022 – Present* · Norwegian clients
Currently own the biomethane product on an energy-market analytics platform:
dashboards, 30+ ECharts visualisations, and the migration from hand-written
chart components to reusable JSON configurations. Before that, architected the
dynamic form-builder platform used across Norwegian municipalities, and act as
technical advisor across teams.
`Svelte 5 · SvelteKit · TypeScript · ECharts · TanStack Query · Sanity · React · Redux · Next.js · Node.js · AWS`

**SELISE** — Software Engineer · *Sep 2020 – Oct 2022* · Swiss enterprise
Built and scaled a customer-facing insurance portal, plus the shared component
library that kept its modules consistent. Refactored the frontend–backend
communication layer.
`Angular · TypeScript · RxJS · Material UI`

**Kinship AI** — Frontend Engineer · *Dec 2017 – Aug 2020* · US startup, remote
Delivered a pixel-perfect, WCAG-compliant React application, working fully
remote with US-based designers and engineers — three years before remote became
mainstream.
`React · Redux · JavaScript · SCSS`

**Spondon** — Frontend Web Developer · *Sep 2016 – Nov 2017* · International clients
Delivered 15+ responsive HTML5 templates across education, SaaS and hospitality,
with a 100% approval rate on ThemeForest.
`HTML5 · CSS3 · Bootstrap · jQuery · SCSS`

---

## Tech stack

**Frontend** — React · TypeScript · Next.js · Svelte 5 / SvelteKit · Redux · TanStack Query · Angular · TailwindCSS · SCSS · ECharts · Framer Motion · WCAG accessibility

**Backend** — Node.js · Express · NestJS · REST API design · GraphQL · Socket.IO

**Data** — PostgreSQL · Prisma · MongoDB · Sanity CMS

**Infrastructure** — AWS · Docker · CI/CD pipelines · GitHub Actions · Vercel · Vite · Jest · Storybook

**AI** — Claude / GPT API integration · prompt engineering · AI-assisted development (Cursor, Claude Code)

---

## About this repository

The source of [salmanrahman.com](https://www.salmanrahman.com) — a portfolio
and technical blog. It is also the honest answer to "how does he actually
build things", so it is worth a look if you are evaluating the code and not
just the CV.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 ·
shadcn on `@base-ui/react` · MDX · Shiki · deployed on Vercel.

**Every route is prerendered at build time.** There is no runtime data fetching
anywhere in the site — no database, no CMS call, no API on the request path. A
dynamic route in the build output is treated as a regression, not a detail.

### Running it locally

```bash
pnpm install     # pnpm only — there is a pnpm-lock.yaml
pnpm dev         # http://localhost:3000
```

### The checks

There is no test suite; these three are the whole gate, and `pnpm build`
doubles as the validator for blog post metadata.

```bash
pnpm build
pnpm lint
npx tsc --noEmit
```

### Layout

```
app/              routes, metadata, OG image generation, sitemap, RSS
components/       portfolio sections; components/blog/* for post rendering
content/blog/     the posts, as MDX
lib/data.ts       every CV fact on the page — experience, skills, stats
lib/blog/         the only code that touches the filesystem
docs/             design records, including what the first design got wrong
```

`lib/data.ts` is deliberately the single source of truth for the portfolio
content, and `lib/blog/posts.ts` the single module that reads the filesystem —
so swapping the blog to a CMS later is one file, not a refactor.

### The blog

MDX files in `content/blog/`, compiled at build. No CMS, no vendor account, no
runtime fetching — a post is a file in a pull request.

- Syntax highlighting with line highlights, diff and focus annotations, filename
  headers and a copy button
- Per-post Open Graph and Twitter cards generated at 1200×630, so a shared link
  renders a real card on LinkedIn, X and Slack
- Canonical URLs, `BlogPosting` / `BreadcrumbList` JSON-LD, RSS at
  `/blog/rss.xml`, sitemap entries, reading time, tag pages, and a table of
  contents that tracks the current section
- Drafts are visible in development and on Vercel previews, hidden in production
- Invalid post metadata fails the build rather than shipping a broken page

**Highlighting runs in a Server Component, not a rehype plugin.** Turbopack —
the default bundler in Next 16 — cannot marshal function-valued plugin options
across to Rust, which rules out `rehype-pretty-code` and `@shikijs/rehype`
entirely: their `transformers` option is an array of functions. Calling Shiki
from a Server Component sidesteps that, keeps every transformer available, and
because posts are statically generated it only ever runs at build. No
highlighter reaches the browser.

Scaffolding a post:

```bash
pnpm new-post "Why RSC Changes Data Fetching"
```

That writes `content/blog/<slug>.mdx` with today's date and `draft: true`, and
prints the preview URL. See `content/blog/_template.mdx` for the available
components and `docs/superpowers/specs/2026-08-11-tech-blog-design.md` for the
design record.

---

## Contact

- **Email** — [salman.bd100@gmail.com](mailto:salman.bd100@gmail.com)
- **LinkedIn** — [linkedin.com/in/salmanbd](https://linkedin.com/in/salmanbd)
- **GitHub** — [github.com/salmanbd100](https://github.com/salmanbd100)

Tell me what you're building or fixing and I'll tell you straight whether I'm
the right person for it.
