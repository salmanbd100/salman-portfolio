import type { MetadataRoute } from "next";
import { absoluteUrl, HANDBOOK } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // The handbook publishes its own sitemap; the portfolio's covers only this app.
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl(`${HANDBOOK.path}/sitemap.xml`)],
  };
}
