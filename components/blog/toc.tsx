import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog/posts";

/**
 * Anchor-only table of contents — no scroll-spy, so no client JS.
 *
 * The caller picks the variant: `inline` collapses into a <details> so it
 * doesn't push the first paragraph off a phone screen, `sidebar` sticks
 * alongside the article on wide viewports.
 */

const MIN_HEADINGS = 3;

export function TableOfContents({
  headings,
  variant,
}: {
  headings: Heading[];
  variant: "inline" | "sidebar";
}) {
  // A table of contents over one or two headings is noise.
  if (headings.length < MIN_HEADINGS) return null;

  if (variant === "inline") {
    return (
      <details className="my-6 rounded-lg border border-bg3 bg-bg2 px-4 py-3">
        <summary className="cursor-pointer font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent">
          Contents
        </summary>
        <List headings={headings} className="mt-3" />
      </details>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[76px] max-h-[calc(100vh-120px)] overflow-y-auto"
    >
      <div className="mb-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent">
        Contents
      </div>
      <List headings={headings} />
    </nav>
  );
}

function List({
  headings,
  className,
}: {
  headings: Heading[];
  className?: string;
}) {
  return (
    <ul className={cn("list-none space-y-1.5 text-[0.78rem]", className)}>
      {headings.map((heading) => (
        <li
          key={heading.slug}
          className={heading.depth === 3 ? "pl-3.5" : undefined}
        >
          <a
            href={`#${heading.slug}`}
            className="block leading-snug text-ink3 no-underline transition-colors duration-150 hover:text-accent"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
