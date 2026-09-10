# Sources

Everything a resume or cover letter needs is in this repo. There is no external source —
no Drive, no docx, no CMS. Two files carry it all: `lib/data.ts` for the work, and
`references/personal-facts.md` for what the site does not say.

## Facts the repo holds

Read these from the files each run; the site changes and a stale metric is worse than a
missing one.

| Fact | Location |
|---|---|
| Name, role title, site URL | `lib/site.ts` — `AUTHOR`, `SITE_URL` |
| Email, LinkedIn, GitHub | `lib/data.ts` — `contactLinks` |
| Four roles: periods, summaries, bullets, tech tags | `lib/data.ts` — `experiences` |
| Skills, grouped and tiered `core` / `strong` / `know` | `lib/data.ts` — `skillCategories` |
| Headline metrics | `lib/data.ts` — `statCards` |
| Full-stack breadth claim | `lib/data.ts` — `breadthItems` |
| What kind of role he wants | `lib/data.ts` — `bestFitItems` |
| Positioning, years, client geographies | `components/hero.tsx` |
| Statistics degree narrative, cross-timezone work, Dhaka / remote-ready | `components/about.tsx` |

## Facts only `personal-facts.md` holds

Phone, both degrees, the "led a team of 3+" wording, Azure DevOps. That file is
authoritative for them — do not retype them from here, and do not fill a gap in it from
general knowledge. Read it: `references/personal-facts.md`.

## What is deliberately not a source

**`content/blog/`.** The posts are good, but they are not resume evidence, and a one-page
resume has no room for a writing section. Reading them burns context the tailoring needs.
The site URL in the header is the whole pointer to his writing. If a JD is explicitly about
developer education, technical writing or DevRel, mention the blog in the *cover letter*
instead, where a sentence about it is cheaper than a resume section.

**`public/Salman_Rahman_Resume.pdf`.** This is the file behind the site's "Download CV"
button, and it is output, not input. Never read it to learn what the resume says. After a
general run it is stale — say so in the report. This skill does not produce PDFs.

## The two positionings

The site's `experiences` and `skillCategories` support two honest readings of the same
career, and picking one is the first real decision of every run.

| | Frontend reading | Full-stack reading |
|---|---|---|
| Headline | Senior Frontend Engineer · React, TypeScript, Next.js | Senior Software Engineer |
| Leads with | The 30+ ECharts visualisations, Svelte 5 product ownership, WCAG work, Redux architecture | Biomethane product ownership end to end, plus Node.js, Express, PostgreSQL, Prisma, Docker, CI/CD, AWS |
| Skills order | Frontend row first, backend row demoted or merged | Frontend, backend and infrastructure rows in that order |
| Risk if wrong | Looks under-qualified for a platform role | Looks unfocused for a design-systems role |

Default to full-stack for a general resume — it is the site's own claim and the broader
one. Let the job description choose for a targeted resume. Say which was used when
reporting back.

## The most recent work is the most senior

The energy-market analytics platform at Cefalo — biomethane product ownership, 70+
features, 30+ ECharts visualisations, PPA and EAC — is both the newest and the strongest
evidence he has. It never gets cut to make room for older roles. If the page is tight,
Spondon and Kinship AI compress to one line each first.
