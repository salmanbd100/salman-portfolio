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
    //
    // The 990px cap is derived, not picked: it is the article measure below
    // (56ch) plus the contents column and the gap, so the two-column layout
    // leaves no dead space between the prose and the contents list.
    <main className="mx-auto w-full min-w-0 max-w-[990px] px-7 py-12">
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
        {/* The measure lives on <article> so the header, the prose, the code
            blocks and the tables all share one left and right edge. `ch`
            resolves against this element's font-size, which is why the prose
            scale is set here too — inherited from the 0.9375rem body size the
            same value would come out roughly 150px narrower. 56ch is about 76
            characters a line, the top of the comfortable range: past ~80 the
            eye starts losing its place on the return sweep. */}
        <article className="min-w-0 max-w-[56ch] text-prose md:text-prose-lg">
          <header className="border-b border-bg3 pb-8">
            <div className="mb-3.5 flex flex-wrap items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink3">
              <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
              <span className="h-1 w-1 rounded-full bg-bg3" aria-hidden />
              <span>{readingTime} min read</span>
              {meta.draft ? (
                <span className="rounded-sm bg-amber-bg px-1.5 py-0.5 text-amber">
                  Draft
                </span>
              ) : null}
            </div>

            {/* text-balance keeps a long title from dropping one orphan word
                onto its own line — the most common look of a broken headline. */}
            <h1 className="font-editorial text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.015em] text-balance text-ink md:text-[2.9rem]">
              {meta.title}
            </h1>

            <p className="mt-4 text-prose text-pretty text-ink2 md:text-[1.3rem] md:leading-[1.55]">
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

          <Content />
        </article>

        <aside className="hidden lg:block">
          <TableOfContents headings={headings} variant="sidebar" />
        </aside>
      </div>
    </main>
  );
}
