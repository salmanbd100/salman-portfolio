# Facts the site does not carry

The portfolio site is the source of truth for the work. It says nothing about education or
how to phone him, and it softens the leadership claim. This file is the source of truth for
those, and it is the only place they exist in the repo — so it is authoritative, not a
fallback. Anything not written here does not go on a resume or a cover letter.

Both `prepare-resume` and `prepare-cover-letter` read this file. Keep it here; the cover
letter skill points at this path rather than holding its own copy.

## Contact

| Fact | Value |
|---|---|
| Phone | `+8801911921394` |
| Personal email | `salman.bd100@gmail.com` — the one on applications, not the Cefalo address |
| Location | Dhaka, Bangladesh · remote-ready |

The email, LinkedIn and GitHub URLs are also in `lib/data.ts` under `contactLinks`; the
phone number exists nowhere but here.

## Education

Both degrees appear on the resume, newest first. Degree, institution, years — nothing more.

- **Master of Science in Statistics** — University of Dhaka, 2013–2014
- **Bachelor of Science in Statistics** — National University, 2009–2012

The statistics background is worth a clause in the summary when the role is
data-, analytics- or charting-heavy. `components/about.tsx` carries the narrative framing
of it ("profile before optimising, measure before claiming"); the degree itself comes
from here.

## Leadership framing

`lib/data.ts` only gestures at this with "technical advisor". The concrete, usable claim is:

> Led a frontend team of 3+ engineers, owning architecture decisions, code reviews, and
> technical mentorship across product squads.

Use it verbatim or close to it. It belongs to the Cefalo role.

## Skills the site omits

- **Azure DevOps** — real, and absent from `skillCategories`. Goes in the infrastructure
  row when a JD mentions Azure or Microsoft tooling.

## Still unknown — ask, never invent

None of these exist in any source. If a resume or cover letter needs one, ask the user and
add the answer to this file so the next run has it.

- Full postal address
- Notice period and earliest start date
- Work authorisation, visa status, sponsorship requirements
- Certifications and courses
- Language proficiency levels
- Referees
- Salary expectation
