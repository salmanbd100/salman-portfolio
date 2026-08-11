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
        "my-6 flex gap-3 rounded-lg border px-4 py-3.5",
        variant.wrapper,
      )}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", variant.icon_)}
        aria-hidden
      />
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 text-[0.9rem] leading-relaxed text-ink2">
        <span className="sr-only">{variant.label}: </span>
        {children}
      </div>
    </aside>
  );
}
