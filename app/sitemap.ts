import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * sitemap.xml — lists public, indexable pages for search and AI crawlers.
 * Rendered by Next.js at /sitemap.xml automatically.
 *
 * Only public citation surfaces are listed. Private per-user results pages
 * (/results/[slug]) are intentionally excluded.
 *
 * `lastModified` is sourced from the site's benchmark review date where the
 * page's freshness is tied to the benchmarks; static pages use build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/scorecard`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

