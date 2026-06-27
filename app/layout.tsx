import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "RevOps Health Scorecard | A diagnostic for B2B SaaS operations",
  description:
    "A 5-minute diagnostic that scores your revenue operations health across 6 pillars, benchmarks you against current industry data, and returns a personalised report with prioritised fixes.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "RevOps Health Scorecard",
    description:
      "Score your B2B SaaS revenue operations across 6 pillars in 5 minutes.",
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "RevOps Health Scorecard — How healthy is your revenue operations really?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RevOps Health Scorecard",
    description:
      "Score your B2B SaaS revenue operations across 6 pillars in 5 minutes.",
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

/**
 * Site-wide JSON-LD schema (@graph).
 * Three linked entities: Organization, WebSite, Person.
 * Server-rendered into every page's raw HTML for AI + search extraction.
 * All values read from siteConfig — single source of truth, domain-ready.
 */
function SiteSchema() {
  const { url, name, shortName, description, author } = siteConfig;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: shortName,
        url: url,
        description: description,
        founder: { "@id": `${url}/#person` },
        knowsAbout: [
          "Revenue Operations",
          "B2B SaaS",
          "Customer Retention",
          "Gross Revenue Retention",
          "Net Revenue Retention",
          "Churn Analytics",
          "Sales Operations",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url: url,
        name: name,
        description: description,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: author.name,
        description: author.bio,
        jobTitle: author.role,
        url: author.portfolio,
        sameAs: [author.linkedin, author.portfolio],
        knowsAbout: [
          "Revenue Operations",
          "B2B Enterprise Operations",
          "Churn Analytics",
          "Customer Success Operations",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SiteSchema />
      </head>
      <body>{children}</body>
    </html>
  );
}


