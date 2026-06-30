import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * robots.txt — explicitly welcomes AI search crawlers and traditional
 * search engines, and points to the sitemap. Rendered by Next.js at
 * /robots.txt automatically.
 *
 * AI crawlers must be allowed or the site is invisible to that engine,
 * regardless of content quality.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers, including AI search bots:
        // GPTBot (ChatGPT), OAI-SearchBot (ChatGPT Search), ClaudeBot &
        // anthropic-ai (Claude), PerplexityBot, Applebot, Google-Extended
        // (Gemini grounding) are all covered by the wildcard allow.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/results/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

