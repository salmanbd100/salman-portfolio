---
name: prepare-resume
description: Use when the user asks to prepare, write, refresh or tailor a resume or CV — "prepare a resume", "make me a resume", "update my CV", "tailor my resume to this role" — or when they paste or link a job description and want a resume aligned to it. Also use when they ask for a one-page version, or ask which of their experience to lead with for a particular job.
---

# Preparing a resume

The portfolio site is the source of truth for the work. `references/personal-facts.md` is
the source of truth for everything the site does not carry — phone number, education,
the leadership framing. This skill joins the two.

**The deliverable is one markdown file in `app/resume/`.** Nothing else. No Google Doc, no
PDF, no upload. The markdown is the resume.

**One page, always.** This is the constraint that shapes every other decision, and it is
easier to hit by choosing what to leave out than by shaving words off everything. Step 4
gives the word budget.

## Modes

| Input | Mode | File |
|---|---|---|
| "prepare a resume" with no job description | **General** | `app/resume/resume.md` |
| A job description — pasted, linked, or a file | **Targeted** | `app/resume/<company>-<role-slug>.md` |

Slug in lowercase kebab-case: `vipps-senior-frontend-engineer.md`. If the company is
unnamed in the JD, use the role alone: `staff-engineer-fintech.md`.

If the target file already exists, read it, say what it currently claims, and ask whether
to overwrite it or write a dated sibling — `resume-2026-09-10.md`. Never overwrite silently.

## 1. Read every source, every run

Never write a resume from memory, and never from a previous run's output in `app/resume/`.
`lib/data.ts` changes whenever the site is updated, and a stale metric on a resume is worse
than a missing one.

| Source | What to take from it |
|---|---|
| `references/personal-facts.md` | Phone, education, leadership framing, off-site skills. Read this first. |
| `lib/data.ts` | `experiences`, `skillCategories` with their tiers, `statCards`, `breadthItems`, `bestFitItems`, `contactLinks` |
| `components/hero.tsx` | Positioning line, years of experience, client geographies |
| `components/about.tsx` | Narrative — statistics degree, cross-timezone work, the "whole path" full-stack claim |
| `lib/site.ts` | Name, role title, site URL |

`references/sources.md` records exactly where each fact lives and what each source is
authoritative for. Read it if anything above is ambiguous.

**Ignore `content/blog/`.** The blog is not resume evidence. A one-page resume has no room
for a writing section, and reading the posts costs context that the tailoring needs. The
site URL in the header is the whole pointer to his writing.

**Cleaning `lib/data.ts` bullets:** they carry `<strong>` tags and `\u` escapes for the
site's renderer. Convert `<strong>x</strong>` to `**x**` and render escapes as real
characters (`—`, `·`, `’`). No HTML reaches the markdown.

## 2. Choose the positioning

The site sells a full-stack **Senior Software Engineer**. A frontend-led job description
wants a **Senior Frontend Engineer**. These are different resumes, not different wordings —
the choice drives the headline, the summary, and the order of the skills rows.

| Situation | Positioning |
|---|---|
| General resume | Full-stack, per the site. It is the more current and the broader claim. |
| JD is frontend / UI / design-systems | Frontend. Lead with React, TypeScript, Svelte and the charting work; demote the backend row. |
| JD is full-stack, platform, or product engineering | Full-stack, per the site. |
| JD is backend-led | Full-stack, and say plainly in the report that the evidence is frontend-weighted. |

State which positioning was used when reporting back. Never blend the two into a resume
that claims frontend depth and full-stack breadth in the same breath — it reads as neither.

## 3. Structure

Read `references/template.md` and follow it. It reproduces `app/resume/resume.md` as he
approved it — section order, the header, the identical shape every role takes, and the
exact contact hrefs. Copy the header from the template rather than reconstructing it: the
links have to be real and `www.salmanrahman.com` is easy to get wrong.

If an existing resume in `app/resume/` disagrees with the template, he edited it by hand.
Read what he changed, follow the file, and update the template to match — his edits are the
specification, not a deviation from it.

## 4. The one-page budget

`app/resume/resume.md` is the approved reference: **464 words**, and he called that shape
right. Treat it as the target rather than a ceiling to grow into — a resume drifts longer
one reasonable-looking bullet at a time, and 464 is what got approved.

Counts below include each section's heading and meta line, so they can be checked directly
against the file:

| Section | Words |
|---|---|
| Header block | ~21 |
| Summary | 55–70 |
| Cefalo | 110–125 |
| Selise | ~57 |
| Kinship AI | ~54 |
| Spondon | ~34 |
| Skills — three rows | ~82 |
| Education | ~21 |
| **Total** | **≤480** |

Verify it rather than estimating:

```bash
wc -w app/resume/<file>.md
```

Markdown links count as one word each, which is what you want, and there is no HTML in the
document to inflate the count.

If it comes in over 480, cut whole bullets and whole skills — the weakest evidence for this
particular role — instead of trimming adjectives out of every line. A resume of clipped
fragments reads worse than a resume of five confident sentences.

Spondon is one bullet and Kinship AI is two; `references/template.md` says why, and why
neither is a one-line compressed role.

## 5. Tailoring against a job description

1. **Extract from the JD** — must-have technologies, nice-to-haves, the domain, the
   seniority, the team shape, and the two or three outcomes the role is measured on.
2. **Map each requirement to real evidence** in the sources. Write the mapping down for
   yourself before drafting; it decides both the ordering and what gets cut for the page.
3. **Reorder, never rewrite.**

**Allowed:**

- Reorder bullets within a role, and skill groups within a section, so the JD's must-haves land first
- Cut bullets that carry no signal for this role — with one page, most cutting happens here
- Set the headline role title to the JD's own title, when he genuinely holds it
- Promote a `strong`-tier skill above a `core`-tier one when the JD leads on it
- Use the JD's vocabulary for the same thing — "charting" for "data visualisation"
- Rewrite the summary from scratch, as long as every claim in it traces to a source

**Forbidden:**

- Inventing a technology, year, metric, client, or title that is not in the sources
- Moving a metric from the role that earned it to a different one
- Claiming a tier above what `skillCategories` records — a `know` skill never becomes "expert"
- Inflating years on a specific tool
- Adding a certification, degree, or language level that is not in `references/personal-facts.md`

**Gaps:** if the JD requires something he does not have, do not paper over it. Write the
resume without it and tell the user which requirements are unmet, so they can decide
whether to apply and what to put in the cover letter.

## 6. Write the markdown

Write to the path from the Modes table. British English throughout — `optimise`,
`visualisation`, `behaviour`, `organised` — matching the rest of the repo.

`app/resume/` sits inside Next.js route space, but markdown files there are inert: Next
only routes `page.tsx` and `route.ts`, so no build check is needed for this skill's work.
Never add a `page.tsx` there — rendering the resume as a page is a separate task.

## 7. Report back

- The file path and the word count from step 4
- Which positioning was used, frontend or full-stack
- For a targeted resume: which JD requirements have no evidence behind them
- What was cut to hold the page, so the user can push back if they wanted something kept
- For a general resume: that `public/Salman_Rahman_Resume.pdf`, the site's Download CV
  button, is now behind. This skill does not produce PDFs — refreshing it means printing
  the markdown to PDF and replacing that file under the same name.

## Common mistakes

| Mistake | Fix |
|---|---|
| Writing from the previous resume in `app/resume/` | Re-read `lib/data.ts`. It is the source of truth; the resume is output. |
| Running to two pages | Run `wc -w`. Over 520, cut whole bullets, not words. |
| Reading `content/blog/` | The blog is not resume evidence. Skip it. |
| Adding a "Selected writing" section | It costs 60 words the experience needs. The site URL covers it. |
| Blending the frontend and full-stack positionings | Pick one in step 2 and hold it through the whole document. |
| Leaving `<strong>` tags in the markdown | Convert to `**bold**` while reading the bullets. No HTML belongs in this document. |
| Bare contact text instead of links | Phone, email, LinkedIn, GitHub and the site are all markdown links. The template has the hrefs. |
| Putting a short role's evidence on the meta line | Every role has bullets. The one-line form gets split by his editor into an orphaned `—`. |
| Filling Education from general knowledge | It comes from `references/personal-facts.md` or it does not appear. |
| Copying `statCards` verbatim as bullets | The stats restate metrics already in the role bullets. Use them in the summary, not twice. |
| Giving all four roles equal bullets | Bullet count follows relevance, not fairness. |
| American spelling | British English. The repo is `en-GB`. |
