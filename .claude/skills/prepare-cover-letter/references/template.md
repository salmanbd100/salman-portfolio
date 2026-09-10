# Cover letter shape

Four paragraphs. Each has one job, and none of them is "summarise the resume".

```markdown
# Salman Rahman

Dhaka, Bangladesh · [+8801911921394](tel:+8801911921394) · [salman.bd100@gmail.com](mailto:salman.bd100@gmail.com) · [salmanrahman.com](https://www.salmanrahman.com)

<Date, written out: 10 September 2026>

Dear <Hiring Manager's name, if the JD gives one — otherwise "Hiring Team">,

<Paragraph 1 — the hook, 2–3 sentences. Name the role and the company, then the single
strongest reason he fits it. No throat-clearing, no "I am writing to".>

<Paragraph 2 — the primary claim, 3–4 sentences. The closest match between the JD's main
requirement and his real work, told as a short story with the number in it. This is the
paragraph that earns the interview.>

<Paragraph 3 — the second claim, 2–3 sentences. A different axis from paragraph 2: breadth
where 2 was depth, leadership where 2 was hands-on, domain where 2 was technology. If the
JD's biggest gap is being addressed, it goes here, in one sentence, without apology.>

<Paragraph 4 — the close, 2 sentences. Why this role specifically, from the JD's own
substance or from what the user told you. Then a plain statement of availability. No
"I look forward to hearing from you at your earliest convenience".>

Yours sincerely,

Salman Rahman
```

## What each paragraph is for

**1 — The hook.** The reader decides here whether to read on. Name the role so it is
unambiguous which application this is, then land the strongest fit in one clause. If the JD
leads on energy-market data visualisation, the hook says he owns the biomethane product on
a European energy-market analytics platform. Specific beats enthusiastic.

**2 — Depth.** Take the JD's must-have and show the work behind it. Numbers belong here —
70+ features, 30+ visualisations, 40% latency reduction — but wrapped in what the work
involved and why it mattered, which is exactly what the resume's bullet had no room for.
One story, told properly.

**3 — A different axis.** Repeating paragraph 2 louder is the most common failure. If 2 was
frontend depth, 3 is the full-stack path or the team he led. If 2 was hands-on delivery, 3
is the architecture ownership. If the role is remote or cross-border, the nine years of
working with Norwegian, Swiss and US clients across time zones belongs here — it is
evidence most candidates cannot offer.

**4 — The close.** Two sentences. The first is the honest reason for wanting this role,
which comes from the JD's substance or from the user; the second states availability and
stops. Do not restate the letter, do not thank them for their time twice, do not add a
postscript.

## Register

Simple English. Short sentences. `components/about.tsx` is the reference for how he writes
about his own work — read it and match that voice. Confident without inflation: "I own the
biomethane product end to end" rather than "I have had the privilege of contributing to".

Contractions are fine. First person throughout, and not every sentence needs to start
with "I" — vary the openings or the letter reads as a list.

## Formatting constraints

- **Every standalone line needs a blank line around it** — the contact line, the date, the
  salutation, the sign-off. A single newline is a soft wrap in markdown and they would
  render as one paragraph.
- **No `---` rules**, no headings inside the letter body, no bullet lists. A cover letter
  is prose; bullets in one signal that the writer could not decide what mattered.
- One `#` heading, his name. Nothing else takes a heading.
- **Contact details are clickable**, same as the resume's header — `tel:`, `mailto:`, and
  the `www.salmanrahman.com` URL, with the display text left bare so it survives printing.
  LinkedIn and GitHub are left off: the paired resume carries them, and a letter's header
  should read as prose rather than as a link list.
- No emoji, no unicode icons.
- Em dashes and `·` separators are fine.
- Bold sparingly or not at all. In a 300-word letter, bolding a phrase implies the rest is
  skippable.

## Length

250–320 words of body — paragraphs 1 to 4, excluding the header block, date, salutation and
sign-off. Check it:

```bash
wc -w app/resume/cover-letters/<file>.md
```

The whole file lands around 340–370 words with the header. Over that, the fix is cutting a
claim, not compressing sentences into fragments.
