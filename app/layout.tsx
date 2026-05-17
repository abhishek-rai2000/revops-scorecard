import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevOps Health Scorecard | A diagnostic for B2B SaaS operations",
  description:
    "A 5-minute diagnostic that scores your revenue operations health across 6 pillars, benchmarks you against 2025 industry data, and returns a personalised report with prioritised fixes.",
  metadataBase: new URL("https://getrevscore.vercel.app"),
  openGraph: {
    title: "RevOps Health Scorecard",
    description:
      "Score your B2B SaaS revenue operations across 6 pillars in 5 minutes.",
    type: "website",
    url: "https://getrevscore.vercel.app",
    siteName: "RevOps Scorecard",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevOps Health Scorecard",
    description:
      "Score your B2B SaaS revenue operations across 6 pillars in 5 minutes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

