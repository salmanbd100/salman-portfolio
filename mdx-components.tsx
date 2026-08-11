import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/blog/callout";
import { CodeBlock } from "@/components/blog/code-block";
import { Flow } from "@/components/blog/flow";

/**
 * Prose styling for MDX output.
 *
 * Hand-written rather than @tailwindcss/typography: the site has a specific
 * type scale (Space Grotesk headings via --font-serif) and its own ink/bg
 * token set, and overriding the plugin's defaults to match would be more code
 * than writing these directly.
 *
 * Body text runs on the `prose` scale from globals.css — 17px on a phone,
 * 19px from 48rem up — rather than the 0.9375rem the rest of the site uses.
 * Headings are sized here because each appears exactly once; the body scale is
 * a token because post cards, callouts and page ledes all have to match it.
 */

const LANGUAGE_PREFIX = "language-";

type CodeProps = ComponentPropsWithoutRef<"code"> & { meta?: string };

const components: MDXComponents = {
  // Unwrapped so CodeBlock owns its own <figure><pre> wrapper. MDX emits
  // pre > code; the language and fence meta both live on the inner <code>.
  pre: ({ children }: ComponentPropsWithoutRef<"pre">) => <>{children}</>,

  code: ({ className, children, meta, ...rest }: CodeProps) => {
    const language =
      typeof className === "string" && className.startsWith(LANGUAGE_PREFIX)
        ? className.slice(LANGUAGE_PREFIX.length)
        : undefined;

    if (language !== undefined) {
      return (
        <CodeBlock code={String(children ?? "")} lang={language} meta={meta} />
      );
    }

    return (
      <code
        className="rounded-[4px] border border-bg3 bg-bg2 px-[0.32em] py-[0.12em] font-mono text-[0.875em] text-ink"
        {...rest}
      >
        {children}
      </code>
    );
  },

  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      // Offsets the 52px sticky nav so anchor jumps don't hide the heading.
      // The asymmetric margin (large above, small below) is what makes a
      // section read as a unit rather than as evenly spaced blocks.
      // Newsreader is a true serif, so the tight tracking that suited Space
      // Grotesk is dialled back — negative tracking closes serif apertures and
      // the heading starts to look congested.
      className="scroll-mt-20 mt-14 mb-4 font-editorial text-[1.6rem] font-semibold tracking-[-0.01em] text-balance text-ink md:text-[1.9rem]"
      {...props}
    />
  ),

  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="scroll-mt-20 mt-10 mb-3 font-editorial text-[1.3rem] font-semibold text-balance text-ink md:text-[1.45rem]"
      {...props}
    />
  ),

  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="scroll-mt-20 mt-8 mb-2 font-sans text-prose font-semibold text-ink md:text-prose-lg"
      {...props}
    />
  ),

  p: (props: ComponentPropsWithoutRef<"p">) => (
    // text-pretty keeps a one-word last line from stranding at prose widths.
    <p className="my-5 text-prose text-pretty text-ink2 md:text-prose-lg" {...props} />
  ),

  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-accent underline decoration-accent/40 decoration-1 underline-offset-[3px] transition-colors hover:decoration-accent"
      {...props}
    />
  ),

  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-5 list-disc space-y-2 pl-6 text-prose text-ink2 md:text-prose-lg"
      {...props}
    />
  ),

  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-prose text-ink2 md:text-prose-lg"
      {...props}
    />
  ),

  li: (props: ComponentPropsWithoutRef<"li">) => (
    // A loose list wraps each item's text in <p>, which would otherwise pick up
    // the paragraph's my-5 and tear the list apart.
    <li className="pl-1 [&>p]:my-2" {...props} />
  ),

  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    // Filled surface rather than a bare rule: at prose size a quote needs to be
    // visibly set apart. Not italicised — a multi-line italic block at 19px is
    // measurably slower to read, and the surface already does the signalling.
    <blockquote
      className="my-7 rounded-r-lg border-l-[3px] border-accent/50 bg-bg4 px-5 py-4 text-prose text-ink2 md:text-prose-lg [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-3"
      {...props}
    />
  ),

  hr: () => <hr className="my-12 border-t border-bg3" />,

  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),

  // Tables scroll inside their own container so a wide table never makes the
  // page body scroll horizontally on mobile.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-7 overflow-x-auto rounded-lg border border-bg3">
      {/* One tier below body text: a table is scanned, not read line by line,
          and staying smaller keeps more columns on screen before it scrolls. */}
      {/* The last-row rule is dropped from here rather than with `last:` on the
          cell — `last:` matches the last cell of every row, which left each row
          divider stopping short of the final column. */}
      <table
        className="w-full border-collapse text-[0.9375rem] md:text-prose-sm [&_tr:last-child>td]:border-b-0"
        {...props}
      />
    </div>
  ),

  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-bg3 bg-bg2 px-4 py-3 text-left font-semibold text-ink whitespace-nowrap"
      {...props}
    />
  ),

  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-bg3 px-4 py-3 align-top leading-[1.65] text-ink2"
      {...props}
    />
  ),

  img: ({ alt, ...rest }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className="my-6 h-auto w-full rounded-lg border border-bg3"
      {...rest}
    />
  ),

  // Available in any post without an import.
  Callout,
  Flow,
};

// Next 16: this function takes NO arguments. Earlier versions accepted a
// `components` param, which is still what most published examples show.
export function useMDXComponents(): MDXComponents {
  return components;
}
