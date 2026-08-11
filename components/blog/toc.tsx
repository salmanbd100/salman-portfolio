"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog/posts";

/**
 * Table of contents with the current section tracked as the reader scrolls.
 *
 * This is the second client component on a post page, after the copy button.
 * Tracking the active heading cannot be done without JS, so the choice is a few
 * hundred bytes of listener or no indicator at all; the rest of the page stays
 * static either way.
 *
 * A scroll listener rather than IntersectionObserver: the question here is
 * "which heading did I last pass", which is a position test, not a visibility
 * test. IntersectionObserver answers the visibility question and then needs
 * rootMargin arithmetic to be bent into answering this one — and it goes silent
 * exactly when a section is taller than the viewport, so no heading is
 * intersecting and the indicator sticks on the wrong entry.
 */

const MIN_HEADINGS = 3;

/** Sticky nav is 52px; the extra clears the heading's own top margin. */
const ACTIVE_LINE_OFFSET = 84;

export function TableOfContents({
  headings,
  variant,
}: {
  headings: Heading[];
  variant: "inline" | "sidebar";
}) {
  // Only the sidebar shows an indicator, and only when it actually renders —
  // otherwise the listeners attach for a component that returns null.
  const enabled = variant === "sidebar" && headings.length >= MIN_HEADINGS;
  const active = useActiveHeading(headings, enabled);

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
      <List headings={headings} active={active} />
    </nav>
  );
}

/**
 * Index of the last heading whose top edge has passed under the nav, or null
 * when tracking is off or the reader is still above the first one.
 */
function useActiveHeading(headings: Heading[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  // Depend on the slugs rather than the array: a server component hands down a
  // fresh array on every render, which would restart the effect each time.
  const key = headings.map((heading) => heading.slug).join("|");

  useEffect(() => {
    if (!enabled) return;

    const elements = key
      .split("|")
      .map((slug) => document.getElementById(slug))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      // The last section can be too short to ever reach the line, so at the
      // bottom of the page it takes the highlight regardless.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      let current: HTMLElement | null = null;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > ACTIVE_LINE_OFFSET) break;
        current = element;
      }

      setActive(current?.id ?? null);
    };

    // Coalesce a burst of scroll events into one measurement per frame; reading
    // getBoundingClientRect forces layout, so doing it per event is wasteful.
    const schedule = () => {
      frame ||= requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, enabled]);

  return active;
}

function List({
  headings,
  active,
  className,
}: {
  headings: Heading[];
  active?: string | null;
  className?: string;
}) {
  return (
    <ul className={cn("list-none space-y-0.5 text-[0.85rem]", className)}>
      {headings.map((heading) => {
        const isActive = active === heading.slug;

        return (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                // The left border is always there, transparent until active, so
                // the text never shifts sideways when the highlight moves.
                "block border-l-2 border-transparent py-1 leading-snug no-underline",
                "transition-colors duration-200",
                heading.depth === 3 ? "pl-6" : "pl-3",
                isActive
                  ? "border-accent font-medium text-accent"
                  : "text-ink3 hover:border-bg3 hover:text-ink2",
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
