import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog/posts";
import { AUTHOR, SITE_NAME } from "@/lib/site";

/**
 * Per-post share card.
 *
 * Deliberately NOT on the edge runtime: the edge runtime disables static
 * generation (the build warns about this) and has no `fs`, and the avatar has
 * to be read from disk and inlined as a data URI. On Node this prerenders once
 * at build time.
 */

// One value for every post: `alt` is a static export, and file-based metadata
// overrides generateMetadata, so a per-post alt would mean generateImageMetadata
// and a changed image URL shape. Not worth it for an attribute most social
// platforms ignore — the card itself carries the title.
export const alt = "Article by Salman Rahman, Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Metadata image routes are separate route handlers, so they need their own
// params enumeration — the page's generateStaticParams does not cover them.
// Without this the card is server-rendered on demand for every crawl.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** All content sits inside this inset. LinkedIn trims a few pixels from the
 *  edges and X rounds the corners; an 80px safe zone survives both. */
const PADDING = 80;

export default async function BlogPostOgImage({
  params,
}: {
  // Next 16: params is a Promise in image-generating functions.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.meta.title ?? SITE_NAME;
  const tags = post?.meta.tags ?? [];
  const avatar = await loadAvatarDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: PADDING,
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 8,
                border: "1px solid rgba(58, 152, 180, 0.45)",
                backgroundColor: "rgba(46, 125, 150, 0.18)",
                fontSize: 24,
                color: "#7fc4d8",
              }}
            >
              #{tag}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleFontSize(title),
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            // Satori has no line-clamp; the font-size ramp is what keeps long
            // titles inside the safe zone.
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {avatar ? (
              <img
                src={avatar}
                alt=""
                width={72}
                height={72}
                style={{
                  borderRadius: "50%",
                  border: "2px solid rgba(255, 255, 255, 0.22)",
                }}
              />
            ) : null}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
                {AUTHOR.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "rgba(255, 255, 255, 0.55)",
                }}
              >
                {AUTHOR.role}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            salmanrahman.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

/** Steps down so a long title never overflows the 1200x630 safe zone. */
function titleFontSize(title: string): number {
  if (title.length <= 40) return 76;
  if (title.length <= 60) return 64;
  if (title.length <= 85) return 54;
  return 46;
}

let cachedAvatar: string | null | undefined;

async function loadAvatarDataUri(): Promise<string | null> {
  if (cachedAvatar !== undefined) return cachedAvatar;

  try {
    const file = await readFile(
      path.join(process.cwd(), "public", "avatar-og.jpg"),
    );
    cachedAvatar = `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    // Card is still correct without the photo — don't fail the build over it.
    cachedAvatar = null;
  }

  return cachedAvatar;
}
