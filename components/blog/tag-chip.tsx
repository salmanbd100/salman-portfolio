import Link from "next/link";
import { cn } from "@/lib/utils";

export function TagChip({
  tag,
  count,
  active = false,
}: {
  tag: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <Link
      href={`/blog/tag/${tag}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5",
        "font-mono text-[0.65rem] tracking-[0.04em] no-underline",
        "border transition-colors duration-150",
        active
          ? "border-accent/40 bg-accent-bg text-accent-dark"
          : "border-bg3 bg-bg2 text-ink3 hover:border-accent/30 hover:bg-accent-bg hover:text-accent",
      )}
    >
      <span>#{tag}</span>
      {count !== undefined ? (
        <span className="text-ink3/70">{count}</span>
      ) : null}
    </Link>
  );
}
