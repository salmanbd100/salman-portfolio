"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const CHAT_APP_URL = "https://ai-powered-app-client.vercel.app/";

export function ChatWidget() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) track("chat_open");
      }}
    >
      {/* Floating CTA bubble */}
      <SheetTrigger
        className={cn(
          "fixed bottom-5 right-5 z-40",
          "inline-flex items-center gap-2",
          "bg-accent text-white",
          "rounded-full shadow-lg shadow-accent/25",
          "px-4 py-3 sm:px-5",
          "text-[0.85rem] font-medium",
          "cursor-pointer",
          "transition-all duration-200",
          "hover:bg-accent-dark hover:-translate-y-px hover:shadow-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        aria-label="Chat with my AI"
      >
        <Sparkles className="size-[1.05rem] shrink-0" />
        <span className="hidden sm:inline">Chat with my AI</span>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "gap-0 w-full data-[side=right]:w-full sm:max-w-md"
        )}
      >
        {/* Accessible title (visually hidden) */}
        <SheetTitle className="sr-only">Chat with my AI</SheetTitle>

        {/* Embedded chat app */}
        <div className="relative flex-1 overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg">
              <Loader2 className="size-6 animate-spin text-accent" />
            </div>
          )}
          <iframe
            src={CHAT_APP_URL}
            title="AI chat assistant"
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0"
            allow="clipboard-write; microphone"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
