# Salman Rahman — Portfolio

Senior Software Engineer with 9+ years building high-performance, accessible web applications for clients across Norway, Switzerland, and the US. Based in Dhaka, Bangladesh. Open to remote roles with visa sponsorship.

---

## About Me

I specialize in React, TypeScript, and Next.js, with a strong background in frontend architecture, scalable state management, and cross-functional team leadership. I've worked on everything from government form-builder platforms used across Norwegian municipalities to enterprise insurance portals and AI-powered startup products.

- **Current role:** Senior Software Engineer at Cefalo (Nov 2022 – Present)
- **Experience:** 9+ years
- **Education:** Statistics — evidence-based thinking, A/B testing, performance analysis
- **Location:** Dhaka, Bangladesh (remote-ready)

---

## Tech Stack

**Frontend**
React · TypeScript · Next.js · Redux · React Query · Angular · Svelte · TailwindCSS · Framer Motion · SCSS · WCAG Accessibility

**Backend**
Node.js · Express · NestJS · REST API · GraphQL

**Database**
PostgreSQL · Prisma · MongoDB

**Infrastructure & Tooling**
AWS · Docker · GitHub Actions · CI/CD · Vite · Jest · Storybook · Figma

**AI**
Claude / GPT API integration · Prompt engineering · Cursor · Claude Code

---

## Career Highlights

| Impact | Context |
|---|---|
| 40% faster form rendering | Architected dynamic form-builder for Norwegian government |
| 50% faster developer onboarding | Introduced scalable Redux patterns and React best practices |
| 20% higher user retention | Rebuilt customer-facing insurance portal (Swiss enterprise) |
| 25% fewer frontend bugs | Overhauled state management at US AI startup |

---

## Work History

**Cefalo** — Senior Software Engineer *(Nov 2022 – Present)*
Led frontend architecture for a government form-builder platform serving Norwegian municipalities. Built data visualization dashboards in Svelte, developed Node.js APIs, and acted as technical advisor across teams.
`React · Redux · TypeScript · Next.js · Svelte · Node.js · AWS`

**SELISE** — Software Engineer *(Sep 2020 – Oct 2022)*
Built and scaled a customer-facing insurance portal for a Swiss enterprise client. Developed a shared component library and refactored the frontend-backend communication layer, reducing data-fetching issues by 35%.
`Angular · TypeScript · RxJS · Material UI`

**Kinship AI** — Frontend Engineer *(Dec 2017 – Aug 2020)*
Delivered pixel-perfect, WCAG-compliant React application for a US AI startup. Worked fully remote with US-based designers and engineers across timezones.
`React · Redux · JavaScript · SCSS`

**Spondon** — Frontend Web Developer *(Sep 2016 – Nov 2017)*
Built responsive web templates and marketing sites for international clients. Delivered 15+ HTML5 templates across education, SaaS, and hospitality verticals with a 100% approval rate on ThemeForest.
`HTML5 · CSS3 · Bootstrap · jQuery · SCSS`

---

## This Portfolio

Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, deployed on Vercel.
Every route is prerendered at build — there is no runtime data fetching anywhere
in the site.

**Running locally:**

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

---

## Blog

A technical blog at [`/blog`](https://www.salmanrahman.com/blog). Posts are MDX
files in `content/blog/`, compiled at build time. No CMS, no vendor account, no
runtime fetching — a post is a file in a pull request.

**What it does**

- Syntax highlighting with line highlights, diff and focus annotations, filename
  headers and a copy button
- Per-post Open Graph and Twitter cards generated at 1200×630, so a shared link
  renders a real card on LinkedIn, X and Slack
- Canonical URLs, `BlogPosting` / `BreadcrumbList` JSON-LD, RSS at
  `/blog/rss.xml`, sitemap entries, reading time, tag pages and a table of
  contents that tracks the current section
- Drafts are visible in development and on Vercel previews, hidden in production

**Highlighting runs in a Server Component, not a rehype plugin.** Turbopack —
the default bundler in Next 16 — cannot marshal function-valued plugin options
across to Rust, which rules out `rehype-pretty-code` and `@shikijs/rehype`
entirely: their `transformers` option is an array of functions. Calling Shiki
from a Server Component sidesteps that, keeps every transformer available, and
because posts are statically generated it only ever runs at build. No
highlighter reaches the browser.

**Writing a post**

```bash
pnpm new-post "Why RSC Changes Data Fetching"
```

That scaffolds `content/blog/<slug>.mdx` with today's date and `draft: true`,
and prints the preview URL. Write MDX, check the share card at
`/blog/<slug>/opengraph-image`, then set `draft: false` and push — the post
joins the index, the sitemap and the feed with no index file to update.

Invalid post metadata fails the build rather than shipping a broken page. See
`content/blog/_template.mdx` for the available components, and
`docs/superpowers/specs/2026-08-11-tech-blog-design.md` for the design record.

---

## Contact

- Email: salman.bd100@gmail.com
- LinkedIn: [linkedin.com/in/salmanbd](https://linkedin.com/in/salmanbd)
- GitHub: [github.com/salmanbd100](https://github.com/salmanbd100)

Open to **Senior or Lead Frontend Engineer** roles — remote-first, USD/EUR compensation, preferably with teams in Germany, Netherlands, Sweden, Canada, Australia, or fully remote.
