import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { ComponentType } from "react";
import { validatePostMeta, type PostMeta } from "./schema";

/**
 * The content layer. The only module that knows posts live on disk, so
 * swapping MDX for a CMS later would touch this file and nothing else.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const WORDS_PER_MINUTE = 200;

/**
 * Drafts are visible everywhere except the production domain.
 *
 * Deliberately not NODE_ENV: Vercel preview deployments build with
 * NODE_ENV=production, so a NODE_ENV check would hide drafts on exactly the
 * URLs you use to review them before publishing.
 */
const INCLUDE_DRAFTS = process.env.VERCEL_ENV !== "production";

export type Heading = {
  depth: 2 | 3;
  text: string;
  slug: string;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  /** Whole minutes, minimum 1. */
  readingTime: number;
  headings: Heading[];
};

export type PostWithContent = Post & {
  Content: ComponentType;
};

export type TagCount = {
  tag: string;
  count: number;
};

// ─── Public API ───

export async function getAllPosts(): Promise<Post[]> {
  const posts = await loadAllPosts();
  return posts.filter((post) => INCLUDE_DRAFTS || !post.meta.draft);
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  const posts = await loadAllPosts();
  const post = posts.find((candidate) => candidate.slug === slug);

  if (!post) return null;
  if (post.meta.draft && !INCLUDE_DRAFTS) return null;

  const { default: Content } = await importPost(slug);
  return { ...post, Content };
}

export async function getAllTags(): Promise<TagCount[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.meta.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.meta.tags.includes(tag));
}

// ─── Loading ───

/**
 * Turbopack builds a context module from this template literal, which is why
 * the path prefix must stay a static relative literal. Do not refactor it to
 * use the `@/` alias or a variable — alias resolution inside context modules
 * is unreliable and the build would silently stop finding posts.
 */
function importPost(slug: string) {
  return import(`../../content/blog/${slug}.mdx`);
}

// Memoized for production builds, where getAllPosts is called by the index,
// every post, every tag page, the sitemap and the feed. Never memoized in dev:
// a stale cache would mean edits to `meta` don't show up until you restart.
let cachedPosts: Promise<Post[]> | null = null;

function loadAllPosts(): Promise<Post[]> {
  if (process.env.NODE_ENV !== "production") return readAllPosts();
  cachedPosts ??= readAllPosts();
  return cachedPosts;
}

async function readAllPosts(): Promise<Post[]> {
  const slugs = await listSlugs();
  const posts = await Promise.all(slugs.map(readPost));

  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

async function listSlugs(): Promise<string[]> {
  let entries: string[];

  try {
    entries = await readdir(CONTENT_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  return entries
    .filter((name) => name.endsWith(".mdx"))
    // Leading underscore marks scaffolding (_template.mdx), not a post.
    .filter((name) => !name.startsWith("_"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

async function readPost(slug: string): Promise<Post> {
  const [module, source] = await Promise.all([
    importPost(slug),
    readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8"),
  ]);

  const body = stripEsmExports(source);

  return {
    slug,
    meta: validatePostMeta(slug, module.meta),
    readingTime: estimateReadingTime(body),
    headings: parseHeadings(body),
  };
}

// ─── Source parsing ───

/**
 * Drops top-level `import`/`export` statements so the `meta` block doesn't
 * count toward reading time or get scanned for headings.
 */
function stripEsmExports(source: string): string {
  return source
    .replace(/^export\s+const\s+meta\s*=\s*\{[\s\S]*?^\};?\s*$/m, "")
    .replace(/^import\s+.*$/gm, "");
}

function estimateReadingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Extracts h2/h3 for the table of contents.
 *
 * Fence tracking is the point here: a naive line-by-line regex treats `# a
 * comment` inside a shell or Python snippet as a heading, which produces TOC
 * entries that link nowhere.
 */
function parseHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  let fence: { char: string; length: number } | null = null;

  for (const line of body.split("\n")) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);

    if (fenceMatch) {
      const marker = fenceMatch[1];
      const char = marker[0];

      if (!fence) {
        fence = { char, length: marker.length };
      } else if (char === fence.char && marker.length >= fence.length) {
        fence = null;
      }
      continue;
    }

    if (fence) continue;

    const headingMatch = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!headingMatch) continue;

    const text = stripInlineMarkdown(headingMatch[2]);

    headings.push({
      depth: headingMatch[1].length as 2 | 3,
      text,
      // Same slugger rehype-slug uses, including its duplicate-suffix
      // behaviour, so these anchors match the rendered heading ids.
      slug: slugger.slug(text),
    });
  }

  return headings;
}

/** rehype-slug slugs the rendered text, so inline syntax must go first. */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim();
}
