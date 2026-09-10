---
name: prepare-cover-letter
description: Use when the user asks for a cover letter, covering letter, motivation letter, application email, or a note to a hiring manager — "write a cover letter for this role", "draft the covering note", "what should I say in the application email" — or when they paste a job description and want the written pitch that goes with the resume. Also use straight after preparing a resume, when the same application still needs its letter.
---

# Preparing a cover letter

A cover letter answers the one question a resume cannot: *why this role, and why you.* It
is not a prose retelling of the resume — a hiring manager reading both will read the
resume's bullets once and resent reading them twice.

**The deliverable is one markdown file in `app/resume/cover-letters/`.** Nothing else. No
Google Doc, no PDF, no email sent.

**One page, and comfortably so.** 250–320 words of body. A cover letter that fills the page
is already too long; nobody has ever been rejected for brevity here.

This skill is the sibling of `prepare-resume` and shares its sources and its honesty rules.

## 1. You need a job description

Without one there is nothing to argue against, and the letter degenerates into adjectives.
If the user has not given a JD, ask for it — or for the company name and role title at
minimum — before drafting.

If they explicitly want a general introduction note with no target, write one, keep it to
three short paragraphs, and say in the report that it is a template to adapt rather than
something to send as-is.

**One thing only the user knows: why he wants this job.** The repo cannot tell you, and
inventing it produces the flattery that makes cover letters worthless — "I have long
admired your commitment to innovation" says nothing and reads as filler. If the JD does not
itself give an honest hook (the domain, the product, the engineering problem, the way the
team works), ask the user for one sentence on why this role interests him, and build the
closing paragraph on that. Asking is cheap; fabricating enthusiasm is not.

## 2. Read the sources

| Source | What to take from it |
|---|---|
| `app/resume/<company>-<role-slug>.md` | If a matching resume exists, this is the primary source. The letter must agree with it. |
| `.claude/skills/prepare-resume/references/personal-facts.md` | Phone, email, education, leadership framing, and the list of things to ask about rather than invent |
| `lib/data.ts` | `experiences`, `skillCategories` tiers, `statCards`, `bestFitItems` — if no resume exists yet |
| `components/about.tsx` | The statistics degree narrative and the cross-timezone working history — both are cover-letter material more than resume material |

**If a targeted resume for this application already exists, read it first and stay
consistent with it.** Same positioning, same headline claim, same numbers. A letter that
calls him a frontend specialist beside a resume that sells full-stack breadth undermines
both. If no resume exists, offer to run `prepare-resume` for the same JD — they are meant
to go out together — but do not block on it.

**Ignore `content/blog/`.** One exception, and it is a real one: if the JD is about
developer education, technical writing, documentation or DevRel, one sentence naming the
blog and its URL is strong evidence. Even then, do not read the posts — link the site.

## 3. Structure

Read `references/template.md` and follow it. It fixes the four paragraphs and what each
one is for.

## 4. What makes the letter worth reading

**One claim per paragraph, each backed by something concrete.** The resume proves breadth;
the letter proves fit. Pick the two strongest matches between the JD and his real
experience and spend the whole middle on them. Three well-argued sentences about owning the
biomethane product beat eight sentences listing technologies.

**Use the numbers, but tell the story around them.** The resume says "30+ ECharts
visualisations". The letter says what that work actually involved — the migration from
hand-written chart components to reusable JSON configurations, and why that mattered to the
product. That reframing is the letter's whole value, and it is not invention as long as
every fact traces to a source.

**Name the specific overlap with the JD.** If the JD wants energy-sector domain knowledge,
say he already works in European energy-market analytics. If it wants Svelte, say he ships
Svelte 5 daily. Vague competence claims are what everyone else writes.

**Write in his voice, not a template's.** Simple English, short sentences, no
throat-clearing. Read `components/about.tsx` for how he actually writes about his own work
and match that register.

### Openings to never write

- "I am writing to express my interest in the position of…"
- "I am a passionate / results-driven / detail-oriented engineer with a proven track record"
- "When I saw this role, I knew I had to apply"
- Anything that spends the first sentence on the fact that a letter is being written

Open with the substance instead: which role, and the single strongest reason he fits it.

## 5. Honesty rules

Identical to the resume's, because the two documents are read side by side:

**Forbidden:**

- Inventing a technology, metric, client, year, or title that is not in the sources
- Claiming familiarity with the company's product or values beyond what the JD states
- Claiming a skill tier above what `skillCategories` records
- Stating a notice period, start date, salary expectation, or visa position that the user
  has not given — ask, and add the answer to `personal-facts.md` so the next run has it
- Naming a hiring manager whose name is not in the JD or given by the user. "Dear Hiring
  Team" is fine and normal.

**Gaps in the JD's requirements** get handled in one of two ways, and it is the user's
choice: leave them unmentioned, or address the biggest one in a single confident sentence
about adjacent experience. Never pretend the gap does not exist, and never apologise for it
at length. Say which approach was taken.

## 6. Write the markdown

Path: `app/resume/cover-letters/<company>-<role-slug>.md`, the same slug as the resume so
the pair sorts together. If the company is unnamed in the JD, use the role alone.

If the file exists, read it, say what it currently says, and ask before overwriting.

British English throughout — `optimise`, `organised`, `behaviour`, `programme`.

Verify the length rather than estimating:

```bash
wc -w app/resume/cover-letters/<file>.md
```

Over 320 words of body, cut the weaker of the two middle paragraphs' claims. Markdown in
`app/resume/` is inert — Next only routes `page.tsx` and `route.ts` — so no build check is
needed. Never add a `page.tsx` there.

## 7. Report back

- The file path and the word count
- Which resume it pairs with, or that no resume exists yet for this application
- The two JD requirements the letter argues hardest for
- Any requirement with no evidence behind it, and how the letter handled it
- Anything you had to ask for, or should have asked for — notice period, start date, a
  hiring manager's name

## Common mistakes

| Mistake | Fix |
|---|---|
| Retelling the resume in prose | The letter argues fit; the resume lists evidence. Pick two claims and go deep. |
| Inventing admiration for the company | Ask the user for the real reason, or build the close on the JD's own substance. |
| Running long | 250–320 words. Run `wc -w`. |
| Contradicting the paired resume's positioning | Read the resume in `app/resume/` first and match it. |
| Listing technologies | The skills row is the resume's job. Here, one technology in a sentence that shows what he did with it. |
| "I am writing to express my interest" | Open with the strongest reason he fits. |
| Inventing a notice period or start date | Ask. Then record it in `personal-facts.md`. |
| American spelling | British English. The repo is `en-GB`. |
