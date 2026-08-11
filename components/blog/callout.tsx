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
    <aside
      className={cn(
        "my-7 flex gap-3 rounded-lg border px-4 py-4 md:px-5",
        variant.wrapper,
      )}
    >
      <Icon
        className={cn("mt-1 h-[1.05rem] w-[1.05rem] shrink-0", variant.icon_)}
        aria-hidden
      />
      {/* One tier below body prose so an aside stays an aside, but large enough
          not to look like fine print next to 19px text. */}
      <div className="text-prose-sm text-ink2 md:text-prose [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-3">
        <span className="sr-only">{variant.label}: </span>
        {children}
      </div>
    </aside>
  );
}
