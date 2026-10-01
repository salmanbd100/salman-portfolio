/**
 * Single source of truth for anything that needs the site's own address.
 *
 * Before this existed, app/sitemap.ts advertised salmanrahman.dev while
 * app/layout.tsx set metadataBase to www.salmanrahman.com — mismatched domains
 * split ranking signals. Everything derives from SITE_URL now.
 */

export const SITE_URL = "https://www.salmanrahman.com";

export const SITE_NAME = "Salman Rahman";

export const AUTHOR = {
  name: "Salman Rahman",
  role: "Senior Software Engineer",
  url: SITE_URL,
  /** Small avatar used in generated OG cards. NOT public/profile.jpg — that
   *  one is 3.1MB and gets base64-inlined per card. See scripts note in README. */
  ogAvatar: "public/avatar-og.jpg",
} as const;

export const BLOG = {
  title: "Blog",
  description:
    "Notes on full-stack TypeScript — React and Next.js at the front, Node.js and Postgres behind them — and what it takes to ship production web applications.",
  rssPath: "/blog/rss.xml",
} as const;

/**
 * The Senior Full Stack Handbook is a VitePress site built from its own repo
 * (salmanbd100/full-stack-software-engineer-guide) and deployed as its own
 * Vercel project on every push there. next.config.ts rewrites PATH to ORIGIN,
 * so a book change never needs this site redeployed. Links to it must be plain
 * <a>, not next/link — it is another app, and the client router cannot render it.
 */
export const HANDBOOK = {
  path: "/handbook",
  origin:
    process.env.HANDBOOK_ORIGIN ?? "https://senior-full-stack-handbook.vercel.app",
} as const;

/** Absolute URL for a site-relative path. Crawlers — LinkedIn especially —
 *  reject relative og:image URLs outright. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
