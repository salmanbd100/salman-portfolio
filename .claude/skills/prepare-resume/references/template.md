# Resume shape

One page, five sections, ~465 words. This template is not a sketch — it is a description of
`app/resume/resume.md` as he approved it on 2026-09-10. When in doubt about spacing, a
label, or how much a role gets, open that file and copy what is there.

Every section added is a bullet of real evidence removed. That is why there are only five.

## The whole document

```markdown
# Salman Rahman

**<role title>** · 9+ years

Dhaka, Bangladesh · [+8801911921394](tel:+8801911921394) · [salman.bd100@gmail.com](mailto:salman.bd100@gmail.com) · [linkedin.com/in/salmanbd](https://linkedin.com/in/salmanbd) · [github.com/salmanbd100](https://github.com/salmanbd100) · [salmanrahman.com](https://www.salmanrahman.com)

## Summary

<Three sentences, 55–70 words.>

## Experience

### Senior Software Engineer — Cefalo

_Nov 2022 – Present · Dhaka, Bangladesh · Norwegian clients_

- <bullet>
- <bullet>
- <bullet>
- <bullet>
- <bullet>

### Software Engineer — Selise

_Sep 2020 – Oct 2022 · Dhaka, Bangladesh · Swiss enterprise_

- <bullet>
- <bullet>
- <bullet>

### Frontend Engineer — Kinship AI

_Dec 2017 – Aug 2020 · Remote · US startup_

- <bullet>
- <bullet>

### Frontend Web Developer — Spondon

_Sep 2016 – Nov 2017 · Dhaka, Bangladesh · International clients_

- <bullet>

## Skills

**Frontend** — <core tier first, then strong; stop when the row is full>

**Backend & Infrastructure** — <merged, because two thin rows cost more than one full one>

**AI & leadership** — <the shortest row>

## Education

**Master of Science in Statistics** — University of Dhaka, 2013–2014

**Bachelor of Science in Statistics** — National University, 2009–2012
```

## The header

Four lines, plain markdown, no HTML. A two-column HTML flex header was tried and he
replaced it by hand with this — so plain markdown is the answer, and the location now rides
on the contact line rather than sitting on its own.

**Role title matches the positioning** chosen in step 2 of the skill — the JD's own title
for a targeted resume, when he genuinely holds it.

**Every contact detail is a link, and the display text stays bare.** A resume is read on
screen far more often than on paper: an unclickable `linkedin.com/in/salmanbd` makes the
reader retype it, while `[LinkedIn](…)` loses the address when it is printed. Bare display
text inside a markdown link gives both. These exact hrefs — `www.salmanrahman.com` is what
`SITE_URL` is, and dropping the `www.` is the easy mistake:

| Display | href |
|---|---|
| `+8801911921394` | `tel:+8801911921394` |
| `salman.bd100@gmail.com` | `mailto:salman.bd100@gmail.com` |
| `linkedin.com/in/salmanbd` | `https://linkedin.com/in/salmanbd` |
| `github.com/salmanbd100` | `https://github.com/salmanbd100` |
| `salmanrahman.com` | `https://www.salmanrahman.com` |

**No location qualifier.** Just `Dhaka, Bangladesh` — "Remote-ready" was in an earlier
version and he removed it. Remote willingness belongs in a cover letter, where it can be a
sentence rather than a hyphenated hedge.

## Every role has bullets

Four roles, all the same shape: `###` heading, blank line, `_meta_` on its own line, blank
line, then bullets. No per-role summary line — on one page the bullets carry it, and a
summary plus bullets says the same thing twice. No `**Tech:**` line either; it duplicates
the Skills section and costs ~15 words four times over.

**There is no compressed one-line role format.** An earlier version put the meta and the
evidence on one line for the two oldest roles — `_meta_ — Delivered 15+ templates…`. His
editor reformats markdown on save and splits that into two paragraphs, orphaning the em
dash as a line that starts with `—` and reads as a typo. Spondon gets one real bullet
instead. Short roles get fewer bullets, never a different shape.

Bullet allocation follows relevance rather than fairness:

| Role | General | Targeted |
|---|---|---|
| Cefalo | 5 | 4–5, reordered against the JD |
| Selise | 3 | 2–3 |
| Kinship AI | 2 | 1–2 |
| Spondon | 1 | 1, or cut if the page is tight |

Kinship AI keeps two because its second bullet — asynchronous collaboration with US
designers and engineers across time zones, remote since 2017 — is evidence for exactly the
remote-first senior roles in `bestFitItems`, and no amount of recent work replaces it.

Every bullet opens with a past-tense verb — Delivered, Built, Architected, Drove,
Introduced, Led — and carries a number wherever the source has one. Numbers are the whole
point of a bullet. Bold the verb phrase and bold the number, so a skimming reader finds
both; leave the connecting prose unbolded. One line each, two only when the second pays for
itself — the approved Cefalo resume has exactly one two-line bullet, the Node.js APIs plus
50% ramp-up one, and it earns it by carrying two claims.

## The other sections

**Summary.** Never a bullet list. Never opens with "Results-driven" or "Passionate". Lead
with what he does, not with an adjective. This is the only section a human reads in full,
so it earns its 70 words.

**Skills.** Three prose rows, not five, and not a grid. Tier controls order only: `core`
first, `strong` next, `know` dropped — on one page there is no room for the low end. Do not
print the words "core" or "also know"; a resume that grades its own skills invites the
reader to discount the bottom of the list. Order the rows to match the positioning: a
frontend resume can shorten Backend & Infrastructure and give Frontend the space.

**Education.** Degree, institution, years. Two entries, nothing more.

**No Selected Writing, Certifications, or Interests section.** Each costs 40–80 words the
experience needs. The site URL in the header carries the blog.

## Formatting constraints

- **No HTML anywhere.** Plain markdown throughout, including the header.
- **A blank line after every `###`, and `_meta_` on its own line.** This is what his editor
  produces on save, so writing it this way means the file stops being reformatted behind
  you. Use `_underscores_` for the meta line, not `*asterisks*`, for the same reason.
- **Every standalone line needs a blank line around it.** In markdown a single newline is
  a soft wrap, so the two education entries would otherwise render as one run-on paragraph.
- **No `---` rules.** The `##` headings already separate the sections, and rules render as
  page-breaking noise in most markdown-to-PDF paths.
- **No tables in the resume body.** Text extractors flatten cells unpredictably and ATS
  parsers read the result out of order.
- No emoji, no unicode icons, no flags — the site's `clientFlag` values stay on the site.
- Em dashes and `·` separators are fine. Avoid `→` and other arrows.
- One `#` heading, his name. `##` for sections, `###` for roles.
