import type { Metadata } from "next";
import { AUTHOR, BLOG, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { toIsoDate } from "./format";
import type { Post } from "./posts";

/**
 * Metadata and structured data for blog routes.
 *
 * `alternates` is built by a helper rather than declared once in the blog
 * layout because Next replaces a metadata field wholesale when a child route
 * defines it — a post setting `alternates.canonical` would otherwise drop the
 * layout's RSS autodiscovery.
 */

export function blogAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path),
    types: {
      "application/rss+xml": [
        { url: absoluteUrl(BLOG.rssPath), title: `${SITE_NAME} — Blog` },
      ],
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const path = `/blog/${post.slug}`;
  const { title, description, tags, date, draft } = post.meta;

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: blogAlternates(path),
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: toIsoDate(date),
      authors: [AUTHOR.name],
      tags,
      // Next resolves the colocated opengraph-image.tsx against metadataBase,
      // so og:image comes out absolute. LinkedIn rejects relative URLs.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    // Drafts are only reachable on preview deployments, but say so explicitly
    // rather than relying on the environment to keep them out of an index.
    robots: draft
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// ─── JSON-LD ───

export function blogPostingJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: toIsoDate(post.meta.date),
    dateModified: toIsoDate(post.meta.date),
    keywords: post.meta.tags.join(", "),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: AUTHOR.role,
    },
    publisher: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
  };
}

export function blogJsonLd(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} — ${BLOG.title}`,
    description: BLOG.description,
    url: absoluteUrl("/blog"),
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.meta.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: toIsoDate(post.meta.date),
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: SITE_NAME, path: "/" },
      ...trail,
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : absoluteUrl(item.path),
    })),
  };
}
