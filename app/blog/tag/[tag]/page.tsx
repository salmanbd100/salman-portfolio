import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/blog/json-ld";
import { PostCard } from "@/components/blog/post-card";
import { blogAlternates, breadcrumbJsonLd } from "@/lib/blog/metadata";
import { getAllTags, getPostsByTag } from "@/lib/blog/posts";
import { BLOG, SITE_NAME } from "@/lib/site";

type Params = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) return {};

  const title = `${tag} — ${BLOG.title} — ${SITE_NAME}`;
  const description = `${posts.length} ${posts.length === 1 ? "post" : "posts"} tagged ${tag}: frontend engineering notes by ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: blogAlternates(`/blog/tag/${tag}`),
    openGraph: {
      type: "website",
      title,
      description,
      url: `/blog/tag/${tag}`,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    // w-full min-w-0: body is `flex flex-col`, so main must not be sized by its
    // content. See the note in app/blog/[slug]/page.tsx.
    <main className="mx-auto w-full min-w-0 max-w-[720px] px-7 py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: BLOG.title, path: "/blog" },
          { name: tag, path: `/blog/tag/${tag}` },
        ])}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink3 no-underline transition-colors duration-150 hover:text-accent"
      >
        <ArrowLeft className="h-3 w-3" aria-hidden />
        All posts
      </Link>

      <h1 className="mt-7 font-serif text-[1.7rem] font-semibold tracking-[-0.03em] text-ink">
        <span className="text-ink3">#</span>
        {tag}
      </h1>

      <p className="mt-2 text-[0.9rem] text-ink3">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>

      <div className="mt-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
