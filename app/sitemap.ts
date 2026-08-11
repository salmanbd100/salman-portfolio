import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  // getAllPosts includes drafts outside production, and tags are derived from
  // this filtered list rather than getAllTags() so a draft-only tag can never
  // be advertised to a crawler — not even from a preview build.
  const published = posts.filter((post) => !post.meta.draft);
  const tags = [...new Set(published.flatMap((post) => post.meta.tags))].sort();

  const newest = published[0]?.meta.date;
  const newestDate = newest ? utcDate(newest) : new Date();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: newestDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...published.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: utcDate(post.meta.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: absoluteUrl(`/blog/tag/${tag}`),
      lastModified: newestDate,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];
}

function utcDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}
