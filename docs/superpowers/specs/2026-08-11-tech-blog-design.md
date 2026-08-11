# Tech Blog — Design & Implementation

**Date:** 2026-08-11
**Status:** Implemented on `feat/blog`. Build, lint, and typecheck clean; all routes prerendered.
**Revised:** 2026-08-11, after implementation — see [What changed during implementation](#what-changed-during-implementation).

## Goal

Add a technical blog to the portfolio. Three requirements drive every decision:

1. **Code snippets must look excellent** — this is a blog about code, read by engineers.
2. **SEO-optimized** — statically rendered, complete structured metadata, indexable tag pages.
3. **Social share cards must be correct** — when a post URL is dropped into LinkedIn, X, or Slack, the title and image render as a full-width card with nothing cropped.

Non-goals: comments, newsletter signup, search, pagination, i18n, view counts, a CMS.

## Context

Site before this work:

- Next.js **16.2.6**, React 19.2, Tailwind v4, shadcn + `@base-ui/react`
- Single page: `app/page.tsx` composes section components; content in `lib/data.ts`
- SEO groundwork present: `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, full `metadata` in `app/layout.tsx`
- Design tokens as CSS custom properties in `app/globals.css` under `@theme inline`
- **Light mode only** — `@custom-variant dark` is declared but no dark tokens exist and no `.dark` class is ever applied

### Pre-existing bugs this work fixed

1. **Domain drift.** `app/sitemap.ts` declared `https://salmanrahman.dev` while `app/layout.tsx` used `https://www.salmanrahman.com` for `metadataBase` and canonical. Mismatched domains split ranking signals. Canonical domain is now `https://www.salmanrahman.com`, and both derive from `SITE_URL` in `lib/site.ts`.
2. **Root OG images were server-rendered on demand.** `app/opengraph-image.tsx` and `app/twitter-image.tsx` set `runtime = "edge"`, which disables static generation — the build warns about it. Both now prerender.
3. **Nav anchors broke on any sub-route.** Bare fragments (`#about`) resolve against the current path, so from `/blog/*` they became `/blog/about`.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Authoring | MDX files committed to the repo | Author is a frontend engineer writing about code; the editor is the best writing tool. Fully static output, no vendor, no runtime cost. |
| Content location | `content/blog/*.mdx` | Outside `app/`, so posts are data rather than routes. One `[slug]` route owns layout. |
| Post metadata | Typed `export const meta` in each MDX file | `@next/mdx` has no frontmatter support but handles ESM exports natively. |
| Syntax highlighting | Shiki in a **Server Component** | Turbopack cannot receive function-valued plugin options. See below. |
| Diagrams | CSS `<Flow>` component + ASCII fences | Mermaid needs a browser DOM — either ship a client renderer or add Playwright to the build. Both contradict a zero-client-JS design. |
| Code theme | Single dark theme (`github-dark-dimmed`) | The site is light-mode only, so dual-theme Shiki output would be unused CSS. One-line change if dark mode is added. |
| CMS | None | For a code-heavy blog, CMS code editing is worse than an editor, and it adds a network dependency and vendor account for no gain at this scale. |

### The Turbopack constraint

Turbopack is the default bundler in Next 16. The Next MDX guide states:

> remark and rehype plugins without serializable options cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust.

This rules out the conventional highlighting setup. `rehype-pretty-code` and `@shikijs/rehype` take a `transformers` array of **functions** — exactly what provides line highlighting, focus, and diff notation — and functions cannot cross the JS/Rust boundary.

**Resolution:** highlight in a Server Component. `mdx-components.tsx` maps `pre` to `<CodeBlock>`, which calls Shiki's `codeToHtml` directly.

Consequences, all favourable:

- Shiki is ordinary application code, so the serialization limit does not apply and **every** transformer is available.
- Posts are statically generated, so highlighting runs at build time only. No highlighter reaches the browser.
- Themes change in a component, not `next.config.ts`.

Plugins still usable via Turbopack's string form: `remark-gfm`, `rehype-slug`, and one local plugin (below).

### Fence meta requires a local rehype plugin

`mdast-util-to-hast` puts a fence's meta string on hast **`data`**, not `properties`:

```js title="mdast-util-to-hast/lib/handlers/code.js"
if (node.meta) {
  result.data = {meta: node.meta}
}
```

Only `properties` becomes JSX props, so ` ```ts title="x" {2-3} ` reaches the component as nothing at all. `lib/blog/rehype-code-meta.mjs` copies `data.meta` across.

Registering it has its own trap. `@next/mdx` resolves plugin strings with `require.resolve(spec, { paths: [projectRoot] })`, and **Node ignores `paths` for relative specifiers** — so `"./lib/blog/rehype-code-meta.mjs"` resolves against `@next/mdx`'s own directory and throws `MODULE_NOT_FOUND`. `next.config.ts` passes an absolute path built with `path.join(process.cwd(), ...)`, which is still a plain string and therefore still serializable.

### Dynamic MDX import — verified

The content layer resolves a post with a template-literal dynamic import:

```ts
return import(`../../content/blog/${slug}.mdx`);
```

This was the design's riskiest assumption, so it was spiked first. **It works** in both `next dev` and `next build` — Turbopack builds a context module for the directory. The registry fallback was not needed.

The path prefix must stay a static relative literal. Do not refactor to the `@/` alias or a variable: alias resolution inside context modules is unreliable, and the build would silently stop finding posts.

## Architecture

```
content/blog/*.mdx                     Posts. Each exports `meta` + MDX body.
content/blog/_template.mdx             Authoring reference. `_` prefix excludes it from the scan.

lib/site.ts                            SITE_URL, author, blog constants. Single source of truth.
lib/blog/schema.ts                     PostMeta type, throwing validation, SEO lint warnings.
lib/blog/posts.ts                      Content layer. The only module that touches the filesystem.
lib/blog/format.ts                     Date formatting (display, RFC 822, ISO).
lib/blog/metadata.ts                   generateMetadata builders + JSON-LD builders.
lib/blog/rehype-code-meta.mjs          Copies fence meta from hast data to properties.

mdx-components.tsx                     Required by @next/mdx. Maps MDX elements to components.

components/blog/code-block.tsx         Server. Shiki -> HTML.
components/blog/copy-button.tsx        Client. The only client JS on a post page.
components/blog/callout.tsx            info / warn / tip asides.
components/blog/flow.tsx               CSS step diagram.
components/blog/toc.tsx                Heading nav (inline | sidebar variants).
components/blog/post-card.tsx          Index/tag list item.
components/blog/tag-chip.tsx           Tag pill, links to tag page.
components/blog/json-ld.tsx            Escaped application/ld+json script tag.

app/blog/layout.tsx                    Nav + footer shell.
app/blog/page.tsx                      Index.
app/blog/[slug]/page.tsx               Post.
app/blog/[slug]/opengraph-image.tsx    Per-post share card.
app/blog/[slug]/twitter-image.tsx      Re-exports the OG image.
app/blog/tag/[tag]/page.tsx            Tag archive.
app/blog/rss.xml/route.ts              Feed.

scripts/new-post.mts                   Scaffold. `pnpm new-post "Title"`.
public/avatar-og.jpg                   12KB avatar for OG cards.
```

### Content layer (`lib/blog/posts.ts`)

Turns a directory of MDX files into validated, sorted post objects. The only module that knows content lives on disk, so a CMS swap would touch this file and nothing else.

```ts
getAllPosts(): Promise<Post[]>                  // respects the draft gate, newest first
getPost(slug): Promise<PostWithContent | null>  // adds the rendered MDX component
getAllTags(): Promise<TagCount[]>               // sorted by count, then name
getPostsByTag(tag): Promise<Post[]>
```

`Post` carries `slug`, validated `meta`, `readingTime`, and `headings`.

Implementation notes:

- Slugs come from `fs.readdir`, filtered to `.mdx` and excluding a leading `_`. The filename is the slug.
- Reading time = words ÷ 200, rounded up, minimum 1, computed after stripping the `meta` export and import lines.
- Headings (`##`, `###`) are parsed from the raw source with **fence tracking** — a naive line regex treats `# a comment` inside a shell snippet as a heading. Slugs come from `github-slugger`, the same package `rehype-slug` uses, so TOC anchors match rendered heading ids exactly (verified).
- Results are memoized **only in production builds**. Memoizing in dev would mean edits to `meta` don't appear until the dev server restarts.

### Validation (`lib/blog/schema.ts`)

```ts
type PostMeta = {
  title: string          // non-empty
  description: string    // non-empty
  date: string           // YYYY-MM-DD, must be a real calendar date
  tags: string[]         // >= 1, lowercase kebab-case (each becomes a URL)
  draft?: boolean        // default false
}
```

Two tiers:

- **Structural problems throw**, failing `next build` with the filename and field named. A broken post is invisible until someone shares the link.
- **Soft SEO limits warn**: title over 60 chars, description over 155 or under 50.

Hand-written — no Zod for five fields.

**Date validation cannot use `Date.parse`.** V8 does not reject impossible days: `Date.parse("2026-02-30")` returns a valid timestamp and silently rolls over to March 2, so a post would publish under a date nobody wrote. `isRealCalendarDate` round-trips the components through `Date.UTC` and compares them back. Verified against `2026-02-30`, `2026-13-01`, `2026-04-31`, `2026-02-29` (all rejected) and `2024-02-29` (accepted).

### Drafts

Gated on `process.env.VERCEL_ENV !== "production"`.

Deliberately **not** `NODE_ENV`: Vercel preview deployments build with `NODE_ENV=production`, so that check would hide drafts on exactly the URLs used to review them. Drafts are visible locally and on preview URLs, hidden on the production domain.

Drafts are also excluded from `sitemap.ts` and RSS, and carry `robots: { index: false, follow: false }`.

Verified: a production build drops the draft post **and** the `performance` tag that only the draft carried.

### Code blocks

`components/blog/code-block.tsx`, a Server Component:

- Single dark theme, `github-dark-dimmed`.
- Transformers: `transformerMetaHighlight` for `{1,3-5}`, plus notation-based highlight, focus, and diff.
- Fence meta: `title="app/page.tsx"` renders a filename header; `showLineNumbers` opts into line numbers.
- Long lines scroll **inside** the block via `.code-scroll`. Shiki's `<pre>` background is overridden to transparent so the figure's rounded corners survive; `code` is `display: grid` so line highlights span the full row.
- The copy button is the only client component on a post page. It is hover-revealed on pointer devices but **always visible below `md`** — touch devices have no hover, so it would otherwise be unreachable.
- Unknown languages fall back to plaintext rather than failing the build.

### Diagrams

`<Flow steps={[...]} caption="..." />` renders labeled boxes joined by arrows — horizontal at `md` and up, stacked vertically on mobile. Available in MDX without an import.

Branching or tree-shaped diagrams use ASCII art in a ```text fence, which wraps and scrolls like any other code block. `<Flow>` is for linear pipelines only, and that limit is deliberate.

### Table of contents

Rendered only when a post has **3 or more** headings. The caller picks the variant: `inline` collapses into a `<details>` above the body on small screens, `sidebar` sticks alongside the article at `lg` and up. Anchor links only, no scroll-spy — active-heading tracking needs an intersection observer for a marginal gain.

### Blog index and tag pages

Both list every matching published post, newest first, as `post-card.tsx` items with date, title, description, reading time, and tag chips. No pagination — unnecessary until well past 50 posts.

### The mobile overflow trap

`app/layout.tsx` sets `<body className="min-h-full flex flex-col">`, which makes every page-level child a **flex item**. Flex items default to `min-width: auto`, meaning they size to their content's min-content width — and a code block with long unwrapped lines has a wide min-content. The result: the block widened the entire document, producing a horizontal scrollbar on the page instead of inside the block.

Every blog `main` therefore carries `w-full min-w-0`. Both are required — `width: 100%` alone gets clamped back up by `min-width: auto`, and `min-width: 0` alone leaves the width content-derived.

A global `body > * { width: 100%; min-width: 0 }` rule was tried first and **rejected**: it also applies to the fixed-position `ChatWidget`, which it stretched across the full viewport.

## SEO

Per post, via `generateMetadata` (`lib/blog/metadata.ts`):

- `title`, `description`, `keywords` from `meta`
- `alternates.canonical` — absolute, from `SITE_URL`
- `openGraph`: `type: "article"`, `publishedTime`, `authors`, `tags`, `url`, `siteName`
- `twitter`: `card: "summary_large_image"`
- `robots: { index: false, follow: false }` on drafts

`alternates` is built by a shared `blogAlternates(path)` helper rather than declared once in the blog layout, because **Next replaces a metadata field wholesale when a child route defines it** — a post setting `alternates.canonical` would otherwise drop the layout's RSS autodiscovery.

Structured data via `components/blog/json-ld.tsx`: `BlogPosting` + `BreadcrumbList` on posts, `Blog` on the index. Every `<` in the serialized JSON is replaced with its escape sequence (`\u003c`) so a `</script>` occurring anywhere in the data cannot terminate the tag early and spill the rest into the document.

`app/sitemap.ts` enumerates the home page, `/blog`, every published post with a real `lastModified`, and every tag page. Tags are derived from the **already-filtered** published list rather than `getAllTags()`, so a draft-only tag cannot be advertised even from a preview build.

### RSS

`app/blog/rss.xml/route.ts` emits RSS 2.0 with absolute URLs and `force-static`. Autodiscovery is declared through `blogAlternates`, so readers find the feed from any blog page. A feed nothing links to is a feed nobody subscribes to.

## Social share cards

- **1200×630 (1.91:1)** — the ratio LinkedIn, X, Facebook, and Slack all render full-width. Other ratios get letterboxed or demoted to a thumbnail.
- **`metadataBase` must be set.** LinkedIn rejects relative `og:image` URLs outright.
- **Explicit `width`, `height`, `type`, `alt`.** Omitting dimensions makes some crawlers fall back to the small `summary` card.
- **~80px safe zone** on all sides. LinkedIn trims a few pixels and X rounds the corners.
- **No `runtime = "edge"`.** The edge runtime disables static generation and has no `fs`, and the avatar is read from disk and inlined as a base64 data URI.
- **`params` is a Promise.** Next 16 breaking change for `opengraph-image`, `twitter-image`, `icon`, and `apple-icon`. Every pre-16 tutorial shows the synchronous form.
- **The image route needs its own `generateStaticParams`.** Metadata image routes are separate route handlers; the page's version does not cover them. Without it the card is server-rendered on every crawl — this was caught in the build output as `ƒ /blog/-/opengraph-image`.
- **Avatar is `public/avatar-og.jpg` (12KB), not `public/profile.jpg` (3.1MB).** Base64 inflates by ~33% per card. The original stays for `components/about.tsx`, which serves it through `next/image`. Regenerate with:
  ```bash
  sips -Z 256 public/profile.jpg --out public/avatar-og.jpg
  ```

Card layout:

```
+------------------------------------------------------+
|  [80px padding]                                      |
|  #nextjs  #mdx  #turbopack              <- tag chips  |
|                                                      |
|  Post Title Rendered Large              <- 46-76px,  |
|  Wrapping To Two Lines If Needed           stepped   |
|                                            by length |
|  (o)  Salman Rahman            salmanrahman.com      |
|  avatar  Senior Software Engineer                     |
+------------------------------------------------------+
```

Title size steps 76 / 64 / 54 / 46px by character count. Verified: a 44-char title and a 96-char title both render fully inside the safe zone.

Fonts stay `system-ui`, matching the existing root card. Loading Space Grotesk into `ImageResponse` would mean committing a font binary.

### Known limitations

- **`og:image:alt` is one shared string**, not per-post. `alt` is a static export, and file-based metadata overrides `generateMetadata`, so a per-post alt would require `generateImageMetadata` and a changed image URL shape. Judged a bad trade for an attribute most platforms ignore — the card itself carries the title.
- **LinkedIn caches Open Graph data indefinitely.** Any URL shared before deployment keeps its old preview until refreshed through LinkedIn Post Inspector. Platform behaviour, not a bug.

## Authoring workflow

```bash
pnpm new-post "Why RSC Changes Data Fetching"   # slugifies, stamps today, draft: true
pnpm dev                                        # live immediately, hot reload
```

Write MDX → check the card at `/blog/<slug>/opengraph-image` → set `draft: false` → commit and push. Nothing to register; the content layer scans the directory.

Pushing while `draft: true` publishes to the Vercel preview URL but not production, so a link can be shared for review.

`scripts/new-post.mts` is `.mts`, not `.ts` — Node 22.18+ runs TypeScript natively, and the explicit ESM extension avoids the `MODULE_TYPELESS_PACKAGE_JSON` warning without adding `"type": "module"` to `package.json` (which would affect the whole project).

## Verification performed

No test runner was added; a blog does not justify one. What was actually run:

| Check | Result |
|---|---|
| `pnpm build` | Exit 0 |
| `pnpm lint`, `tsc --noEmit` | Exit 0 |
| All routes static | 17 routes, **zero** `ƒ` |
| Malformed post fails build | Exit 1, names file + field |
| Draft gating | Draft post and its orphan tag absent under `VERCEL_ENV=production` |
| OG PNG | Exactly 1200×630, valid PNG |
| Long title (96 chars) | Two lines, inside safe zone, not clipped |
| Meta tags | `og:image` absolute, width/height/type/alt present, `og:type=article`, `article:published_time`, `article:tag`, `twitter:card=summary_large_image` |
| Canonical + RSS autodiscovery | Both absolute, one domain |
| RSS | Valid XML, published only, absolute URLs |
| Sitemap | One domain, no draft |
| TOC anchors | All 5 match rendered heading ids exactly |
| Code features | Line highlight, diff add/remove, focus, line numbers, filename headers, callouts all render |
| Horizontal page scroll | None; wide code blocks scroll internally |
| Nav from `/blog` | All links root-relative, client-side via `next/link` |

Not yet done — requires a live deployment: LinkedIn Post Inspector and X Card Validator.

Partial: viewport testing bottomed out at **485px**, not 375px, because Chrome clamps window width. No page-level overflow at 485px and code blocks scroll internally, so 375px should hold, but it is unproven.

## Dependencies added

```
@next/mdx  @mdx-js/loader  @mdx-js/react  @types/mdx
shiki  @shikijs/transformers
remark-gfm  rehype-slug  github-slugger
```

All build-time. Nothing fetches at runtime; no vendor account.

`mdx-components.tsx` must export `useMDXComponents()` **taking no arguments** — Next 16 changed this signature, and most published examples still show the old `components` parameter.

## What changed during implementation

Five things the original design got wrong, each found by building it:

1. **Fence meta needed a local rehype plugin.** The design assumed `title="..."` and `{2-3}` would reach the component. They land on hast `data`, which never becomes props.
2. **Per-post OG images needed their own `generateStaticParams`.** The design assumed the page's version covered the image route.
3. **The root OG images had to leave the edge runtime too.** The design said to leave them; the build output proved edge was what made them dynamic.
4. **Dual-theme code was dropped for a single dark theme.** The site is light-mode only, so the second theme was dead CSS.
5. **`Date.parse` does not validate dates.** The original spec claimed ISO date-only strings parse strictly. They do not.

Plus one bug the design did not anticipate: the flex-item mobile overflow described under [The mobile overflow trap](#the-mobile-overflow-trap).

## Out of scope

Comments, newsletter, search, pagination, related posts, view counts, series grouping, i18n, site-wide dark mode, CMS migration.
