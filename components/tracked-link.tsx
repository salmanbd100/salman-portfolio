"use client";

import { track } from "@vercel/analytics";
import type { ComponentProps } from "react";

// Event names are a closed union because Vercel's dashboard groups by the raw
// string — a typo silently becomes a second, near-empty row rather than an error.
type EventName = "cv_download" | "contact_click" | "chat_open";

type EventProps = Record<string, string | number | boolean>;

type TrackedLinkProps = ComponentProps<"a"> & {
  event: EventName;
  eventProps?: EventProps;
};

/**
 * An anchor that reports a custom event before the browser follows it. Safe for
 * the links it is used on — `download`, `mailto:`, and `target="_blank"` all
 * leave the page alive, so the event is never cut off by an unload.
 */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
