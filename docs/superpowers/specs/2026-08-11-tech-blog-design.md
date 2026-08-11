# Tech Blog — Design Spec

**Date:** 2026-08-11
**Status:** Approved, pending implementation plan
**Branch:** `feat/blog`

## Goal

Add a technical blog to the portfolio. Three requirements drive every decision:

1. **Code snippets must look excellent** — this is a blog about code, read by engineers.
2. **SEO-optimized** — statically rendered, complete structured metadata, indexable tag pages.
3. **Social share cards must be correct** — when a post URL is dropped into LinkedIn, X, or Slack, the title and image render as a full-width card with nothing cropped.

Non-goals for v1: comments, newsletter signup, search, pagination, i18n, view counts, a CMS.

## Context

Existing site (as of this spec):

- Next.js **16.2.6**, React 19.2, Tailwind v4, shadcn + `@base-ui/react`
- Single page: `app/page.tsx` composes section components; content in `lib/data.ts`
- SEO groundwork present: `app/opengraph-image.tsx` (dynamic `ImageResponse`), `app/twitter-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, full `metadata` in `app/layout.tsx`
- Design tokens defined as CSS custom properties in `app/globals.css` under `@theme inline`

### Pre-existing bug this spec fixes

`app/sitemap.ts` declares `https://salmanrahman.dev` while `app/layout.tsx` uses `https://www.salmanrahman.com` for both `metadataBase` and `alternates.canonical`. Mismatched domains split ranking signals and can cause the sitemap to be rejected. **Canonical domain is `https://www.salmanrahman.com`.** Both are replaced by a single shared constant so they cannot drift again.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Authoring | MDX files committed to the repo | Author is a frontend engineer writing about code; the editor is the best writing tool. Fully static output, no vendor, no runtime cost, no monthly limit. |
| Content location | `content/blog/*.mdx` | Outside `app/`, so posts are data rather than routes. Keeps one `[slug]` route in charge of layout. |
| Post metadata | Typed `export const meta` inside each MDX file | `@next/mdx` does not support YAML frontmatter without extra plugins, but it does support ESM exports natively. TypeScript then catches a missing title or malformed date. |
| Syntax highlighting | Shiki, called from a **Server Component** | See "The Turbopack constraint" below. Strictly more capable than the rehype-plugin route. |
| CMS | None | Rejected: for a code-heavy blog, CMS code-block editing is worse than an editor, and it adds a network dependency and a vendor account for no gain at this scale. |

### The Turbopack constraint

Turbopack is the default bundler in Next 16. The Next MDX guide states:

> remark and rehype plugins without serializable options cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust.

This rules out the conventional highlighting setup. `rehype-pretty-code` and `@shikijs/rehype` accept a `transformers` array of **functions** — exactly what provides line highlighting, line focus, and diff notation — and functions cannot cross the JS/Rust boundary.

**Resolution:** do not highlight via a bundler plugin. Override `pre` in `mdx-components.tsx` with a `<CodeBlock>` Server Component that calls Shiki's `codeToHast` directly.

Consequences, all favourable:

- Shiki runs as ordinary application code, so the serialization limit does not apply and **every** transformer is available.
- Posts are statically generated, so highlighting happens at build time only — no client-side highlighter, no runtime cost.
- Themes are swappable without touching `next.config.ts`.

Plugins still used via Turbopack's string form (no options, therefore serializable): `remark-gfm`, `rehype-slug`.

### Risk: dynamic MDX import

The content layer resolves a post with a template-literal dynamic import:

```ts
const { default: Post, meta } = await import(`../../content/blog/${slug}.mdx`)
```

This requires Turbopack to build a context module for the directory. Expected to work, but it is the riskiest assumption in this design, so it is verified by a spike as the **first** implementation step.

Fallback if the spike fails: `content/blog/registry.ts` holding explicit static imports keyed by slug — one line to add per new post, no bundler magic. A relative path is used rather than the `@/` alias, since alias resolution inside context modules is the more fragile path.

## Architecture

```
content/blog/*.mdx                     Posts. Each exports `meta` + MDX body.

lib/site.ts                            SITE_URL and author constants. Single source of truth.
lib/blog/schema.ts                     PostMeta type + validation that throws at build.
lib/blog/posts.ts                      Content layer. The only module that touches the filesystem.

mdx-components.tsx                     Required by @next/mdx. Maps MDX elements to components.

components/blog/code-block.tsx         Server. Shiki -> HAST -> JSX.
components/blog/copy-button.tsx        Client. The only client JS on a post page.
components/blog/toc.tsx                Heading nav.
components/blog/post-card.tsx          Index/tag list item.
components/blog/tag-chip.tsx           Tag pill, links to tag page.

app/blog/layout.tsx                    Nav + footer shell.
app/blog/page.tsx                      Index.
app/blog/[slug]/page.tsx               Post.
app/blog/[slug]/opengraph-image.tsx    Per-post share card.
app/blog/[slug]/twitter-image.tsx      Re-exports the OG image.
app/blog/tag/[tag]/page.tsx            Tag archive.
app/blog/rss.xml/route.ts              Feed.
```

### Content layer (`lib/blog/posts.ts`)

Single responsibility: turn a directory of MDX files into validated, sorted post objects. It is the only module that knows content lives on disk, so replacing MDX with a CMS later would touch this file and nothing else.

Public interface:

```ts
getAllPosts(): Promise<Post[]>        // published only, newest first
getPost(slug): Promise<Post | null>   // includes the rendered component
getAllTags(): Promise<TagCount[]>
getPostsByTag(tag): Promise<Post[]>
```

`Post` carries `slug`, validated `meta`, `readingTime`, and `headings`.

Implementation notes:

- Slugs come from `fs.readdir` on `content/blog`, filtered to `.mdx`. The filename is the slug.
- `meta` is read by dynamic-importing each file. Safe at build time; `/blog` and every post are statically generated.
- **Reading time** = word count of the raw source ÷ 200, rounded up, minimum 1.
- **Headings** for the TOC are parsed from the raw source, matching `##` and `###`. The parser must track fenced code blocks and skip their contents — a naive line regex picks up comments inside snippets. Slugs are generated with the same algorithm `rehype-slug` uses, so TOC anchors match the rendered heading ids.

### Validation (`lib/blog/schema.ts`)

```ts
type PostMeta = {
  title: string          // non-empty; used in <h1>, <title>, og:title, OG image
  description: string    // non-empty; meta description + og:description
  date: string           // YYYY-MM-DD, must parse to a valid Date
  tags: string[]         // >= 1, lowercase kebab-case
  draft?: boolean        // default false
}
```

Validation is hand-written — no Zod dependency for five fields. On failure it **throws with the offending filename and field**, which fails `next build`. A malformed post must never reach production, because a broken share card is invisible until someone posts the link.

### Drafts

Gated on `process.env.VERCEL_ENV !== "production"`.

Deliberately **not** `NODE_ENV`: Vercel preview deployments build with `NODE_ENV=production`, so the obvious check would hide drafts exactly where they most need reviewing. With this gate, drafts are visible locally and on preview URLs, hidden on the production domain.

Draft posts are additionally excluded from `sitemap.ts` and RSS, and carry `robots: { index: false, follow: false }`.

### Code blocks

`components/blog/code-block.tsx`, a Server Component:

- Dual themes via Shiki's `themes: { light, dark }` option, which emits CSS custom properties — one render serves both colour schemes.
- Transformers from `@shikijs/transformers` for line highlighting (`{1,3-5}`), line focus, and diff notation.
- Supported meta on the fence: `title="app/page.tsx"` renders a filename header; `showLineNumbers` opts into line numbers.
- Long lines scroll horizontally **inside** the block. The page body must never scroll horizontally on mobile.
- A copy button (the sole client component on the page) receives the raw source as a prop.
- Unknown languages fall back to plaintext rather than throwing the build.

### Table of contents

Rendered only when a post has **3 or more** headings — a TOC over two headings is noise. Sticky in a right-hand column at `lg` and above; on smaller viewports it collapses to a closed `<details>` element above the post body, so it never consumes a screenful of a phone before the reader reaches the first paragraph.

Anchor links only, no scroll-spy in v1 — active-heading tracking needs an intersection observer and client JS for a marginal gain.

### Blog index and tag pages

Both list every matching published post, newest first, as `post-card.tsx` items showing date, title, description, reading time, and tag chips. No pagination — it is not needed until well past 50 posts, and adding it now would mean paginated URLs with no content to fill them.

### Navigation change (required, not optional)

`components/navigation.tsx` currently uses bare fragment anchors (`#about`, `#experience`) because the site is a single page. From any `/blog/*` URL those resolve to `/blog/about` and break. They become root-relative (`/#about`), and a `Blog` link is added.

## SEO

Per post, via `generateMetadata`:

- `title`, `description` from `meta`
- `alternates.canonical` — absolute, built from `SITE_URL`
- `openGraph`: `type: "article"`, `publishedTime`, `authors`, `tags`, `url`, `siteName`
- `twitter`: `card: "summary_large_image"`, `title`, `description`

Structured data: JSON-LD `BlogPosting` + `BreadcrumbList` on posts, `Blog` on the index. Injected via a `<script type="application/ld+json">` tag in the server-rendered output.

`app/sitemap.ts` is rewritten to use `SITE_URL` and to enumerate the home page, `/blog`, every published post (with real `lastModified`), and every tag page.

Tag pages are individually indexable, which is what makes them worth building — they establish topical clustering for the subjects written about most.

### RSS

`app/blog/rss.xml/route.ts` emits an RSS 2.0 feed of published posts, using absolute URLs from `SITE_URL` and each post's `description` as the item description.

`app/blog/layout.tsx` declares the feed for autodiscovery via `metadata.alternates.types["application/rss+xml"]`, so feed readers and aggregators find it from any blog page without being told the URL. A feed nothing links to is a feed nobody subscribes to.

## Social share cards

Correctness details, since this is a stated priority and the common failure modes are silent.

- **1200×630 (1.91:1)** — the ratio LinkedIn, X, Facebook, and Slack all render as a full-width card. Other ratios get letterboxed or demoted to a small thumbnail.
- **`metadataBase` must be set** (it already is). LinkedIn rejects relative `og:image` URLs outright. Every image URL must resolve absolute.
- **Explicit `width`, `height`, `type`, and `alt`** on the image object. Omitting dimensions makes some crawlers fall back to the small `summary` card instead of the large one.
- **Text safe zone: ~80px padding on all sides.** LinkedIn crops a few pixels and X rounds the corners; content inset from the edge survives both.
- **`runtime = "edge"` is omitted on the blog OG route.** The profile photo must be embedded as a base64 data URI read from `public/profile.jpg`, and the edge runtime has no `fs`. Node is the default runtime and there is no downside, as this executes only at build time. The existing root `app/opengraph-image.tsx` keeps `runtime = "edge"` — it uses no local assets and is not in scope.
- **`params` and `id` are Promises.** Next 16 breaking change: image-generating functions in `opengraph-image`, `twitter-image`, `icon`, and `apple-icon` now receive promises. `const { slug } = await params`. Every tutorial written for Next 15 or earlier shows the synchronous form.
- `app/blog/[slug]/twitter-image.tsx` re-exports the OG image module rather than duplicating the layout.

Card layout, matching the existing dark-gradient card so the brand stays consistent:

```
+------------------------------------------------------+
|  [80px padding]                                      |
|  react · nextjs                        <- tag chips  |
|                                                      |
|  Post Title Rendered Large              <- 56-72px,  |
|  Wrapping To Two Lines If Needed           shrinks   |
|                                            for long  |
|                                            titles    |
|  (o)  Salman Rahman            salmanrahman.com      |
|  photo                                               |
+------------------------------------------------------+
```

Title font size steps down by title length so a long title never overflows or gets clipped.

### Known platform limitation

LinkedIn caches Open Graph data aggressively and indefinitely. Any URL shared before deployment will keep showing its old preview until refreshed through LinkedIn Post Inspector. This is platform behaviour and cannot be fixed in code — it is documented here so it is not mistaken for a bug.

## Verification

The repo has no test infrastructure, and adding a test runner for a blog is not justified. Verification is:

1. **`next build`** — must succeed, and must report every blog route as static (`○` or `●`, never `ƒ`). A dynamic route here means the content layer leaked a request-time dependency and the SEO benefit is lost.
2. **Content validation** — a deliberately malformed post must fail the build with a message naming the file and field.
3. **OG image renders** — `/blog/<slug>/opengraph-image` returns a valid 1200×630 PNG with no clipped text, checked for both a short and a long title.
4. **Tags are absolute and complete** — `curl` the deployed post, confirm `og:image`, `og:title`, `og:type`, `article:published_time`, and `twitter:card` are present and that image URLs are absolute.
5. **External validators** — LinkedIn Post Inspector and X Card Validator against one live post.
6. **No horizontal page scroll** at 375px viewport width on a post with wide code blocks.
7. **`/blog/rss.xml`** parses as valid XML, contains only published posts, and every URL in it is absolute.

## Dependencies

```
@next/mdx  @mdx-js/loader  @mdx-js/react  @types/mdx
shiki  @shikijs/transformers
remark-gfm  rehype-slug
```

All build-time. Nothing fetches at runtime; no vendor account.

`next.config.ts` gains `pageExtensions` and the `createMDX` wrapper with `remarkPlugins: ['remark-gfm']` and `rehypePlugins: ['rehype-slug']` in string form.

`mdx-components.tsx` must export `useMDXComponents()` **taking no arguments** — Next 16 changed this signature; older versions accepted a `components` parameter, which is still what most published examples show.

## Out of scope

Comments, newsletter, search, pagination, related posts, view counts, series/multi-part grouping, i18n, and any CMS migration. Each is additive and none block v1.
