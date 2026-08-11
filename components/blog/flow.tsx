import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * A step/pipeline diagram: boxes joined by arrows.
 *
 * Deliberately CSS rather than a diagram library. Mermaid needs a browser DOM
 * to render, so it would mean either shipping a client-side renderer to every
 * reader or adding Playwright to the build — both a bad trade for a blog whose
 * whole design is zero client JS and build-time-only work.
 *
 * Flows horizontally on desktop and stacks vertically on mobile, so a
 * four-stage pipeline stays readable on a phone instead of overflowing.
 *
 * For branching or tree-shaped diagrams this is the wrong tool — use ASCII art
 * in a ```text fence, which wraps and scrolls like any other code block.
 */

export type FlowStep = {
  label: string;
  /** Optional second line — a file path, a timing, a condition. */
  note?: string;
};

export function Flow({
  steps,
  caption,
}: {
  steps: FlowStep[];
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <div className="flex flex-col md:flex-row md:items-stretch">
        {steps.map((step, index) => (
          <Fragment key={`${step.label}-${index}`}>
            {index > 0 ? (
              <div
                className="flex shrink-0 items-center justify-center px-1 py-1 text-ink3 md:px-2 md:py-0"
                aria-hidden
              >
                <span className="md:hidden">&darr;</span>
                <span className="hidden md:inline">&rarr;</span>
              </div>
            ) : null}

            <div
              className={cn(
                "min-w-0 flex-1 rounded-md border border-bg3 bg-bg2 px-3 py-2.5",
              )}
            >
              <div className="text-[0.8rem] leading-snug font-medium text-ink">
                {step.label}
              </div>
              {step.note ? (
                <div className="mt-1 font-mono text-[0.66rem] leading-snug text-ink3">
                  {step.note}
                </div>
              ) : null}
            </div>
          </Fragment>
        ))}
      </div>

      {caption ? (
        <figcaption className="mt-2.5 text-[0.75rem] text-ink3">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
