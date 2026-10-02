/**
 * Scaffolds a new post.
 *
 *   pnpm new-post "Why RSC Changes Data Fetching"
 *
 * Exists mainly to stamp the date. Copying an old post and forgetting to change
 * `date` produces a post that silently sorts to the wrong place in the index
 * and the feed.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

async function main() {
  const title = process.argv.slice(2).join(" ").trim();

  if (!title) {
    console.error('Usage: pnpm new-post "Your Post Title"');
    process.exit(1);
  }

  const slug = slugify(title);

  if (!slug) {
    console.error(`Could not derive a slug from "${title}".`);
    process.exit(1);
  }

  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  const today = localDate(new Date());

  await mkdir(CONTENT_DIR, { recursive: true });

  try {
    await writeFile(file, template(title, today), { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      console.error(`content/blog/${slug}.mdx already exists.`);
      process.exit(1);
    }
    throw error;
  }

  console.log(`Created content/blog/${slug}.mdx`);
  console.log(`Preview at  http://localhost:3000/blog/${slug}`);
  console.log(`Share card  http://localhost:3000/blog/${slug}/opengraph-image`);
  console.log(
    "\nFill in `description` and `tags`, then set `draft: false` to publish.",
  );
}

// toISOString() is UTC, which can be yesterday or tomorrow relative to the
// author's wall clock.
function localDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function template(title: string, date: string): string {
  // The escaped backticks keep the fence intact inside this template literal.
  return `export const meta = {
  title: ${JSON.stringify(title)},
  description: "",
  date: "${date}",
  tags: [],
  draft: true,
};

## Introduction

Write here.

\`\`\`ts title="example.ts"
const example = "hello";
\`\`\`
`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
