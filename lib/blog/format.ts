/**
 * Renders a YYYY-MM-DD post date.
 *
 * Parsed as explicit UTC midnight and formatted in UTC. `new Date("2026-08-11")`
 * is already UTC midnight, but formatting it in a negative-offset timezone
 * renders the previous day — so a post dated the 11th shows as the 10th for
 * readers in the Americas.
 */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** RFC 822, as required by RSS 2.0 pubDate. */
export function toRfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

/** ISO 8601 for article:published_time and sitemap lastModified. */
export function toIsoDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toISOString();
}
