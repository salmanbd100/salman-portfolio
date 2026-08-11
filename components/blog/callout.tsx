import type { ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warn" | "tip";

const VARIANTS: Record<
  CalloutType,
  { icon: typeof Info; wrapper: string; icon_: string; label: string }
> = {
  info: {
    icon: Info,
    wrapper: "border-accent/25 bg-accent-bg",
    icon_: "text-accent",
    label: "Note",
  },
  warn: {
    icon: TriangleAlert,
    wrapper: "border-amber/30 bg-amber-bg",
    icon_: "text-amber",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    wrapper: "border-bg3 bg-bg2",
    icon_: "text-ink3",
    label: "Tip",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const variant = VARIANTS[type];
  const Icon = variant.icon;

  return (
    // The type scale sits here, on the row, rather than on the text div: `em`
    // units on the icon then resolve against the same font-size the text uses.
    // Previously the icon measured itself against the article's 19px while the
    // text ran at 16–17px, so it could not stay aligned at both breakpoints.
    //
    // One tier below body prose so an aside stays an aside, but large enough not
    // to look like fine print next to 19px text.
    <aside
      className={cn(
        "my-7 flex gap-2.5 rounded-lg border px-4 py-4 text-prose-sm md:px-5 md:text-prose",
        variant.wrapper,
      )}
    >
      {/* Announced first, and a sibling of the icon rather than of the text: as
          the text block's first child it took the `:first-child` margin reset
          meant for the first paragraph, so the paragraph kept its top margin and
          the text sat 12px below the icon. sr-only is absolutely positioned, so
          it adds no flex item of its own. */}
      <span className="sr-only">{variant.label}: </span>

      {/* Centred on the first line, not hung off the top: the line box is
          1.7em tall and the icon 1.15em, so half the difference centres it —
          and it stays centred when the type scale steps up at md. */}
      <Icon
        className={cn("mt-[0.28em] h-[1.15em] w-[1.15em] shrink-0", variant.icon_)}
        aria-hidden
      />
      <div className="min-w-0 text-ink2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-3">
        {children}
      </div>
    </aside>
  );
}
