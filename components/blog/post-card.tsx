import Link from "next/link";
import { formatPostDate } from "@/lib/blog/format";
import type { Post } from "@/lib/blog/posts";
import { TagChip } from "./tag-chip";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-t border-bg3 py-7 first:border-t-0 first:pt-0">
      <div className="mb-2.5 flex flex-wrap items-center gap-2.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink3">
        <time dateTime={post.meta.date}>{formatPostDate(post.meta.date)}</time>
        <span className="h-1 w-1 rounded-full bg-bg3" aria-hidden />
        <span>{post.readingTime} min read</span>
        {post.meta.draft ? (
          <span className="rounded-sm bg-amber-bg px-1.5 py-0.5 text-amber not-italic">
            Draft
          </span>
        ) : null}
      </div>

      <h2 className="font-serif text-[1.28rem] font-semibold tracking-[-0.02em] leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="text-ink no-underline transition-colors duration-150 hover:text-accent"
        >
          {post.meta.title}
        </Link>
      </h2>

      <p className="mt-2 text-[0.9rem] leading-[1.7] text-ink2">
        {post.meta.description}
      </p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {post.meta.tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}
