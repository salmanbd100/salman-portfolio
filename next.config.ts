import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { HANDBOOK } from "./lib/site";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // The handbook is built with base "/handbook/", and its own vercel.json
  // strips that prefix again, so the path is passed through unchanged. No
  // trailing slash: the handbook 308s one to its own *.vercel.app host.
  async rewrites() {
    return [
      { source: HANDBOOK.path, destination: `${HANDBOOK.origin}${HANDBOOK.path}` },
      {
        source: `${HANDBOOK.path}/:path*`,
        destination: `${HANDBOOK.origin}${HANDBOOK.path}/:path*`,
      },
    ];
  },
};

// Plugins MUST be named as strings with serializable options only. Turbopack
// (the Next 16 default) passes these to Rust and cannot marshal JS functions.
// This is also why syntax highlighting lives in a Server Component rather than
// a rehype plugin — see components/blog/code-block.tsx.
//
// Local plugins need an ABSOLUTE path: @next/mdx resolves these with
// require.resolve(spec, { paths: [projectRoot] }), and Node ignores `paths` for
// relative specifiers, so "./lib/..." resolves against @next/mdx's own
// directory and throws MODULE_NOT_FOUND.
const localPlugin = (relativePath: string) =>
  path.join(process.cwd(), relativePath);

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      localPlugin("lib/blog/rehype-code-meta.mjs"),
    ],
  },
});

export default withMDX(nextConfig);
