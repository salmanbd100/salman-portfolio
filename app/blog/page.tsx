import type { Metadata } from "next";
import { JsonLd } from "@/components/blog/json-ld";
import { PostCard } from "@/components/blog/post-card";
import { TagChip } from "@/components/blog/tag-chip";
import {
  blogAlternates,
  blogJsonLd,
  breadcrumbJsonLd,
} from "@/lib/blog/metadata";
import { getAllPosts, getAllTags } from "@/lib/blog/posts";
import { BLOG, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BLOG.title} — ${SITE_NAME}`,
  description: BLOG.description,
  alternates: blogAlternates("/blog"),
  openGraph: {
    type: "website",
    title: `${BLOG.title} — ${SITE_NAME}`,
    description: BLOG.description,
    url: "/blog",
    siteName: SITE_NAME,
  },
  twitter: { card: "summary_large_image" },
};

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    // w-full min-w-0: body is `flex flex-col`, so main must not be sized by its
    // content. See the note in app/blog/[slug]/page.tsx.
    <main className="mx-auto w-full min-w-0 max-w-[720px] px-7 py-14">
      <JsonLd data={blogJsonLd(posts)} />
      <JsonLd data={breadcrumbJsonLd([{ name: BLOG.title, path: "/blog" }])} />

      <div className="mb-2 flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent">
        Writing
        <span className="h-px w-8 bg-accent/40" />
      </div>

      <h1 className="font-serif text-[1.9rem] font-semibold tracking-[-0.03em] text-ink">
        {BLOG.title}
      </h1>

      <p className="mt-3 max-w-[56ch] text-[0.95rem] leading-[1.7] text-ink2">
        {BLOG.description}
      </p>

      {tags.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {tags.map(({ tag, count }) => (
            <TagChip key={tag} tag={tag} count={count} />
          ))}
        </div>
      ) : null}

      <div className="mt-12">
        {posts.length === 0 ? (
          <p className="text-[0.9rem] text-ink3">
            No posts published yet. Check back soon.
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </main>
  );
}
