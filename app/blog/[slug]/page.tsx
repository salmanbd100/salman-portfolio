import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/blog/json-ld";
import { TagChip } from "@/components/blog/tag-chip";
import { TableOfContents } from "@/components/blog/toc";
import { formatPostDate } from "@/lib/blog/format";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  postMetadata,
} from "@/lib/blog/metadata";
import { getAllPosts, getPost } from "@/lib/blog/posts";
import { BLOG } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};
  return postMetadata(post);
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const { Content, meta, headings, readingTime } = post;

  return (
    // `w-full min-w-0` is load-bearing, not decoration: body is `flex flex-col`,
    // so main is a flex item that would otherwise size to its content's
    // min-content width. A code block with long unwrapped lines would then
    // widen the whole page instead of scrolling inside its own container.
    <main className="mx-auto w-full min-w-0 max-w-[1060px] px-7 py-12">
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: BLOG.title, path: "/blog" },
          { name: meta.title, path: `/blog/${post.slug}` },
        ])}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink3 no-underline transition-colors duration-150 hover:text-accent"
      >
        <ArrowLeft className="h-3 w-3" aria-hidden />
        All posts
      </Link>

      <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_180px] lg:gap-12">
        <article className="min-w-0">
          <header className="border-b border-bg3 pb-7">
            <div className="mb-3 flex flex-wrap items-center gap-2.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink3">
              <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
              <span className="h-1 w-1 rounded-full bg-bg3" aria-hidden />
              <span>{readingTime} min read</span>
              {meta.draft ? (
                <span className="rounded-sm bg-amber-bg px-1.5 py-0.5 text-amber">
                  Draft
                </span>
              ) : null}
            </div>

            <h1 className="font-serif text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
              {meta.title}
            </h1>

            <p className="mt-3.5 text-[1rem] leading-[1.65] text-ink2">
              {meta.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {meta.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </header>

          <div className="lg:hidden">
            <TableOfContents headings={headings} variant="inline" />
          </div>

          <div className="max-w-[68ch]">
            <Content />
          </div>
        </article>

        <aside className="hidden lg:block">
          <TableOfContents headings={headings} variant="sidebar" />
        </aside>
      </div>
    </main>
  );
}
