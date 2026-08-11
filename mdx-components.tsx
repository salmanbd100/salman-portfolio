import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/blog/callout";
import { CodeBlock } from "@/components/blog/code-block";
import { Flow } from "@/components/blog/flow";

/**
 * Prose styling for MDX output.
 *
 * Hand-written rather than @tailwindcss/typography: the site has a specific
 * type scale (0.9375rem base, Space Grotesk headings via --font-serif) and its
 * own ink/bg token set, and overriding the plugin's defaults to match would be
 * more code than writing these directly.
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
        className="rounded-[4px] border border-bg3 bg-bg2 px-[0.3em] py-[0.1em] font-mono text-[0.85em] text-ink"
        {...rest}
      >
        {children}
      </code>
    );
  },

  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      // Offsets the 52px sticky nav so anchor jumps don't hide the heading.
      className="scroll-mt-20 font-serif text-[1.45rem] font-semibold tracking-[-0.02em] text-ink mt-12 mb-3.5"
      {...props}
    />
  ),

  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="scroll-mt-20 font-serif text-[1.12rem] font-semibold tracking-[-0.01em] text-ink mt-8 mb-2.5"
      {...props}
    />
  ),

  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="scroll-mt-20 font-sans text-[0.95rem] font-semibold text-ink mt-6 mb-2"
      {...props}
    />
  ),

  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 leading-[1.75] text-ink2" {...props} />
  ),

  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
      {...props}
    />
  ),

  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 list-disc space-y-1.5 pl-5.5 text-ink2" {...props} />
  ),

  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-5.5 text-ink2" {...props} />
  ),

  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-[1.7] pl-1" {...props} />
  ),

  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-accent/40 pl-4 text-ink3 italic [&>p]:my-2"
      {...props}
    />
  ),

  hr: () => <hr className="my-10 border-t border-bg3" />,

  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),

  // Tables scroll inside their own container so a wide table never makes the
  // page body scroll horizontally on mobile.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-bg3">
      <table className="w-full border-collapse text-[0.875rem]" {...props} />
    </div>
  ),

  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-bg3 bg-bg2 px-4 py-2.5 text-left font-semibold text-ink whitespace-nowrap"
      {...props}
    />
  ),

  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-bg3 px-4 py-2.5 align-top text-ink2 last:border-b-0"
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
