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
    "Notes on frontend architecture, React, TypeScript, and shipping production web applications.",
  rssPath: "/blog/rss.xml",
} as const;

/** Absolute URL for a site-relative path. Crawlers — LinkedIn especially —
 *  reject relative og:image URLs outright. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
