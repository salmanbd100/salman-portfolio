---
name: write-blog-post
description: Use when the user gives a topic and wants a blog post written for this portfolio's tech blog — e.g. "write a blog post about X", "blog this", "add a post on React Server Components". Scaffolds the MDX file with the project's script, writes in simple English with diagrams and tables where they help, and verifies the build before handing back.
---

# Writing a blog post

Turn a topic into a finished, verified draft in `content/blog/`.

The post stays `draft: true` at the end. Publishing is the user's call — never flip it to `false` without being asked.

## 1. Scaffold the file

Always use the script. Never hand-create the file — the script stamps today's date, and a wrong date silently sorts the post to the wrong place in the index and the RSS feed.

```bash
pnpm new-post "Your Post Title"
```

This creates `content/blog/<slug>.mdx` with `draft: true` and prints the preview URL.

## 2. Get the facts right before writing

This blog is read by engineers. A wrong claim costs more than a missing one.

- If the topic touches Next.js, **read `node_modules/next/dist/docs/`** before writing. Per `AGENTS.md` this version has breaking changes that differ from training data.
- For other libraries, check the installed version in `package.json` and read that version's docs (the context7 MCP tools are good for this).
- Verify any code snippet you write actually runs or compiles. Do not publish untested code.
- If you cannot verify a claim, cut it or say plainly that it is unverified.

## 3. Fill in `meta`

The build **fails** on invalid `meta`, so get these right:

| Field | Rule |
|---|---|
| `title` | Non-empty. Keep to **60 characters or fewer** — longer warns and truncates in Google. |
| `description` | Non-empty, **50–155 characters**. Outside that range warns. Used in search results, the card on `/blog`, `og:description`, and RSS. |
| `date` | `YYYY-MM-DD`, a real calendar date. `2026-02-30` fails the build. |
| `tags` | At least one, lowercase kebab-case. Each becomes a URL at `/blog/tag/<tag>`. |
| `draft` | Leave `true`. |

Reuse existing tags where they fit — check `content/blog/*.mdx` first. Inventing a near-duplicate tag (`nextjs` vs `next-js`) splits the tag pages.

## 4. Write in simple English

The reader may be tired, on a phone, or reading in a second language. Write for that person.

- **Short sentences.** Aim under 20 words. One idea per sentence.
- **Common words.** "use" not "utilize", "help" not "facilitate", "to" not "in order to", "so" not "consequently".
- **Active voice.** "Turbopack drops the plugin" beats "the plugin is dropped by Turbopack".
- **Define jargon on first use**, in one clause. Then use it freely.
- **Cut hedging.** "This fails" not "this may potentially fail in some cases".
- **No filler openings.** Never start with "In today's fast-paced world of web development". Start with the problem.

Write the post the user would want to read: concrete, specific, and honest about limits.

## 5. Keep it short

| Target | Value |
|---|---|
| Length | **600–1000 words** |
| Reading time | 3–5 minutes (shown on the post) |
| H2 sections | 4–6 |
| Paragraph | 2–4 sentences, never more |

If the topic will not fit, do not sprawl — narrow the angle, or propose splitting it into two posts and ask which to write first.

Structure that works:

<Flow
  steps={[
    { label: "The problem", note: "1 short paragraph" },
    { label: "Why it happens", note: "the mechanism" },
    { label: "The fix", note: "code + explanation" },
    { label: "Takeaway", note: "2-3 sentences" },
  ]}
/>

Three or more H2 headings triggers the table of contents automatically. Use `##` for sections and `###` sparingly.

## 6. Use visuals where they explain better than prose

Do not decorate. Add a visual only when it carries information the sentence cannot.

| What you need to show | Use |
|---|---|
| Linear pipeline or ordered steps | `<Flow>` component |
| Branching, nesting, tree shapes | ASCII art in a ` ```text ` fence |
| Comparing options across 2+ dimensions | Markdown table |
| A warning, gotcha, or aside | `<Callout>` |
| Real code | Fenced block with `title=` |

`Callout` and `Flow` need **no import** — they are registered globally in `mdx-components.tsx`.

### Flow — linear steps only

```mdx
<Flow
  caption="Optional line under the diagram."
  steps={[
    { label: "Request", note: "GET /blog" },
    { label: "Middleware", note: "rewrite" },
    { label: "Handler", note: "render" },
  ]}
/>
```

Horizontal on desktop, stacked on mobile. **Not** for branching — use ASCII for that:

```text
request
  ├─ cache hit  → return cached
  └─ cache miss → render → store → return
```

### Callout

```mdx
<Callout type="warn">
  Fence meta lands on hast `data`, not `properties`.
</Callout>
```

Types: `info`, `warn`, `tip`.

### Code blocks

````mdx
```ts title="lib/example.ts" {2-3}
const a = 1;
const b = 2;
const c = 3;
```
````

- `title="path"` renders a filename header. Use it whenever the file matters.
- `{2-3}` highlights lines. Highlight the lines you are actually discussing.
- `showLineNumbers` when you refer to lines by number.
- `// [!code ++]` / `// [!code --]` for diffs, `// [!code focus]` to dim everything else.
- **Keep lines under ~60 characters.** Longer lines force horizontal scrolling on phones.

## 7. Formatting for readability

- **Blank line between every block.** Headings, paragraphs, fences, components — all separated.
- **Wrap the MDX source at about 80 characters.** It keeps diffs reviewable. It does not affect rendering.
- **Bold sparingly** — one or two per section, for the thing you would say louder.
- Break up any run of three or more plain paragraphs with a list, table, visual, or subheading.

### The MDX brace trap

MDX reads a bare `{` as the start of a JSX expression, and the build fails. Any brace in prose must be inside backticks:

- Wrong: highlight lines with {2-3}
- Right: highlight lines with `` `{2-3}` ``

## 8. Verify before handing back

Run these. Do not report the post as done without them.

```bash
pnpm build        # must exit 0 — this is what catches invalid meta
```

Then with `pnpm dev` running:

1. Open `/blog/<slug>` — check headings, code blocks, and any diagram render.
2. Open `/blog/<slug>/opengraph-image` — confirm the share card is a clean 1200×630 with the title fully visible and nothing clipped.
3. Check the reading time shown on the post is in the 3–5 minute range.
4. Watch the build output for `[blog]` warnings about title or description length.

The draft is reachable in dev and on Vercel previews, and hidden on production, so it is safe to push while `draft: true`.

## 9. Hand back

Tell the user:

- The file path and the local preview URL.
- Word count and reading time.
- Anything you could not verify, or any claim you cut for that reason.
- That it is still `draft: true`, and flipping it to `false` publishes on the next push.

## Checklist

- [ ] Created with `pnpm new-post`, not by hand
- [ ] Technical claims checked against installed docs
- [ ] Code snippets actually compile or run
- [ ] `title` ≤ 60 chars, `description` 50–155 chars, real date, ≥1 existing-style tag
- [ ] 600–1000 words, 4–6 H2 sections, paragraphs of 2–4 sentences
- [ ] Simple English: short sentences, common words, active voice
- [ ] Visuals earn their place; `<Flow>` used only for linear steps
- [ ] Code fence lines under ~60 chars, `title=` set where the file matters
- [ ] Braces in prose wrapped in backticks
- [ ] `pnpm build` exits 0 with no `[blog]` warnings
- [ ] OG card checked in the browser
- [ ] Still `draft: true`
