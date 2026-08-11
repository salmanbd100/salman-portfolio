import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { bundledLanguages, codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/**
 * Syntax highlighting as a Server Component rather than a rehype plugin.
 *
 * Turbopack cannot marshal function-valued plugin options to Rust, which rules
 * out rehype-pretty-code and @shikijs/rehype — their `transformers` option is
 * an array of functions. Running Shiki here sidesteps that entirely: it is
 * ordinary application code, every transformer is available, and because posts
 * are statically generated it executes only at build time. No highlighter
 * reaches the browser.
 */

const THEME = "github-dark-dimmed";

/** Shiki accepts these but they are absent from `bundledLanguages`. */
const PLAIN_LANGUAGES = new Set(["text", "plaintext", "txt", "ansi"]);

export async function CodeBlock({
  code,
  lang,
  meta,
}: {
  code: string;
  lang?: string;
  meta?: string;
}) {
  // mdast-util-to-hast appends a trailing newline to every fence's value.
  const source = code.replace(/\n$/, "");
  const language = resolveLanguage(lang);
  const { title, showLineNumbers } = parseMeta(meta);

  const html = await codeToHtml(source, {
    lang: language,
    theme: THEME,
    // transformerMetaHighlight reads the raw fence meta to find `{1,3-5}`.
    meta: { __raw: meta ?? "" },
    transformers: [
      transformerMetaHighlight(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
      transformerNotationDiff(),
    ],
  });

  return (
    <figure className="group relative my-6 overflow-hidden rounded-lg border border-[#373e47] bg-[#22272e]">
      {title ? (
        <figcaption className="flex items-center justify-between gap-3 border-b border-[#373e47] px-4 py-2">
          <span className="truncate font-mono text-[0.72rem] text-[#adbac7]">
            {title}
          </span>
          {language !== "text" ? (
            <span className="shrink-0 font-mono text-[0.62rem] tracking-[0.1em] uppercase text-[#636e7b]">
              {language}
            </span>
          ) : null}
        </figcaption>
      ) : null}

      <CopyButton code={source} className={title ? "top-11" : "top-2.5"} />

      <div
        className={cn("code-scroll", showLineNumbers && "code-line-numbers")}
        // Shiki output over MDX authored in this repo. Not user input.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}

function resolveLanguage(lang?: string): string {
  if (!lang) return "text";

  const normalized = lang.toLowerCase();
  if (PLAIN_LANGUAGES.has(normalized)) return normalized;

  // Fall back rather than throw: a typo'd language in one fence should not
  // fail the whole build.
  return normalized in bundledLanguages ? normalized : "text";
}

function parseMeta(meta?: string): {
  title?: string;
  showLineNumbers: boolean;
} {
  if (!meta) return { showLineNumbers: false };

  const title =
    meta.match(/title="([^"]*)"/)?.[1] ?? meta.match(/title='([^']*)'/)?.[1];

  return {
    title: title?.trim() || undefined,
    showLineNumbers: /\bshowLineNumbers\b/.test(meta),
  };
}
