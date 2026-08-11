import { toRfc822 } from "@/lib/blog/format";
import { getAllPosts } from "@/lib/blog/posts";
import { AUTHOR, BLOG, SITE_NAME, absoluteUrl } from "@/lib/site";

/**
 * RSS 2.0 feed. Published posts only — getAllPosts already applies the draft
 * gate, so drafts never reach a subscriber's reader.
 */

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const feedUrl = absoluteUrl(BLOG.rssPath);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);

      return `    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.meta.description)}</description>
      <pubDate>${toRfc822(post.meta.date)}</pubDate>
      <author>${escapeXml(AUTHOR.name)}</author>
${post.meta.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — ${BLOG.title}`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(BLOG.description)}</description>
    <language>en-us</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
