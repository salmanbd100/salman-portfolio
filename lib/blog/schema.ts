/**
 * Post metadata contract.
 *
 * Two tiers deliberately:
 *  - Structural problems THROW, which fails `next build`. A post with no title
 *    or a bad date renders a broken page and a broken share card, and you only
 *    find out after someone posts the link.
 *  - Soft SEO limits WARN. They're judgement calls, not errors — a 70-character
 *    title is worse than a 55-character one, but it isn't broken.
 */

export type PostMeta = {
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  tags: string[];
  draft?: boolean;
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TAG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Google truncates titles around 60 chars and descriptions around 155. */
const SOFT_TITLE_MAX = 60;
const SOFT_DESCRIPTION_MAX = 155;
const SOFT_DESCRIPTION_MIN = 50;

function requireString(
  value: unknown,
  field: string,
  where: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `[blog] ${where}: \`meta.${field}\` must be a non-empty string, got ${JSON.stringify(value)}`,
    );
  }
  return value.trim();
}

export function validatePostMeta(slug: string, raw: unknown): PostMeta {
  const where = `content/blog/${slug}.mdx`;

  if (typeof raw !== "object" || raw === null) {
    throw new Error(
      `[blog] ${where}: missing \`export const meta = { ... }\`. Every post needs one.`,
    );
  }

  const input = raw as Record<string, unknown>;

  const title = requireString(input.title, "title", where);
  const description = requireString(input.description, "description", where);
  const date = requireString(input.date, "date", where);

  if (!DATE_PATTERN.test(date)) {
    throw new Error(
      `[blog] ${where}: \`meta.date\` must be YYYY-MM-DD, got "${date}"`,
    );
  }
  // Round-trip rather than Date.parse: V8 does NOT reject impossible days.
  // Date.parse("2026-02-30") returns a valid timestamp, silently rolling the
  // date over to March 2 — so the post would publish under a date nobody wrote.
  // Comparing the parsed components back to the input is what actually catches it.
  if (!isRealCalendarDate(date)) {
    throw new Error(
      `[blog] ${where}: \`meta.date\` "${date}" is not a real calendar date`,
    );
  }

  if (!Array.isArray(input.tags) || input.tags.length === 0) {
    throw new Error(
      `[blog] ${where}: \`meta.tags\` must be a non-empty array. Tags drive the tag pages and the share card.`,
    );
  }

  const tags = input.tags.map((tag, i) => {
    const value = requireString(tag, `tags[${i}]`, where);
    if (!TAG_PATTERN.test(value)) {
      throw new Error(
        `[blog] ${where}: \`meta.tags[${i}]\` must be lowercase kebab-case (it becomes a URL), got "${value}"`,
      );
    }
    return value;
  });

  if (input.draft !== undefined && typeof input.draft !== "boolean") {
    throw new Error(
      `[blog] ${where}: \`meta.draft\` must be a boolean if present, got ${JSON.stringify(input.draft)}`,
    );
  }

  lintForSeo({ slug, title, description });

  return {
    title,
    description,
    date,
    tags,
    draft: input.draft === true,
  };
}

function isRealCalendarDate(date: string): boolean {
  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function lintForSeo({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}): void {
  const warn = (message: string) =>
    console.warn(`[blog] ${slug}: ${message}`);

  if (title.length > SOFT_TITLE_MAX) {
    warn(
      `title is ${title.length} chars; Google truncates around ${SOFT_TITLE_MAX}`,
    );
  }
  if (description.length > SOFT_DESCRIPTION_MAX) {
    warn(
      `description is ${description.length} chars; search results truncate around ${SOFT_DESCRIPTION_MAX}`,
    );
  }
  if (description.length < SOFT_DESCRIPTION_MIN) {
    warn(
      `description is only ${description.length} chars; under ${SOFT_DESCRIPTION_MIN} tends to read as thin in search results`,
    );
  }
}
