import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevOps Health Scorecard",
  description:
    "A 5-minute diagnostic that scores your revenue operations health across 6 pillars, benchmarks you against 2025 industry data, and returns a personalised report with prioritised fixes.",
  openGraph: {
    title: "RevOps Health Scorecard",
    description:
      "Score your B2B SaaS revenue operations across 6 pillars in 5 minutes.",
    type: "website",
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

