"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** The only client component on a post page. */
export function CopyButton({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API is unavailable outside secure contexts. Nothing useful
      // to do here, and a thrown error would surface as an unhandled rejection.
      return;
    }

    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy code"}
      className={cn(
        "absolute right-2.5 z-10 rounded-md p-1.5",
        "border border-[#373e47] bg-[#2d333b]/90 text-[#768390]",
        "transition-all duration-150 hover:text-[#adbac7] hover:border-[#444c56]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#539bf5]",
        // Hover-reveal on pointer devices only. Touch devices have no hover,
        // so the button must stay visible or it is unreachable there.
        "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  );
}
