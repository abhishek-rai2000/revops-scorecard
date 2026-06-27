/**
 * siteConfig.ts
 * Single source of truth for site-wide identity, author, sources, and URLs.
 *
 * DOMAIN-READY: To switch from vercel.app to a custom domain later,
 * change ONLY the `url` value below. Everything else derives from it.
 */

export const siteConfig = {
  // ---- Core identity ----
  name: "RevOps Health Scorecard",
  shortName: "RevOps Scorecard",
  url: "https://getrevscore.vercel.app",
  description:
    "A free 5-minute diagnostic that scores your B2B SaaS revenue operations across six weighted pillars, benchmarks you against current industry data, and returns a personalised report with prioritised fixes.",
  tagline: "How healthy is your revenue operations, really?",

  // ---- Author / operator identity (used for Person schema + AuthorBlock) ----
  author: {
    name: "Abhishek Rai",
    role: "Revenue Operations Professional",
    bio: "Abhishek Rai — Revenue Operations professional with 4 years of B2B enterprise experience, including churn analytics and operations for AT&T Platinum Elite accounts. Builds AI-augmented operations tooling.",
    shortBio:
      "Revenue Operations professional with 4 years of B2B enterprise experience.",
    linkedin: "https://www.linkedin.com/in/abhishekrai2000/",
    portfolio: "https://abhishekrai.vercel.app/",
    email: "abhishek.k0420@gmail.com",
  },

  // ---- Contact ----
  contactEmail: "abhishek.k0420@gmail.com",

  // ---- Benchmark sources (verified real + current) ----
  // Each entry: the named report, its publisher, the year, and the stat it backs.
  // These are cited publicly on /methodology and surfaced via SourcesStrip.
  sources: [
    {
      publisher: "SaaS Capital",
      report: "Private B2B SaaS Retention Benchmarks",
      year: "2026",
      stat: "Median gross revenue retention of 91% and net revenue retention of 103% for bootstrapped B2B SaaS companies ($3M–$20M ARR), based on a survey of 1,000+ private companies.",
      url: "https://www.saas-capital.com/blog-posts/benchmarking-metrics-for-bootstrapped-saas-companies/",
    },
    {
      publisher: "Benchmarkit",
      report: "SaaS Performance Metrics Benchmarks",
      year: "2025",
      stat: "Gross revenue retention has trended between 88–90% at the median, with GRR rising as average contract value increases.",
      url: "https://www.benchmarkit.ai/2025benchmarks",
    },
    {
      publisher: "Optifai / ChartMogul",
      report: "Pipeline Study (N=939 B2B SaaS companies)",
      year: "2026",
      stat: "Median net revenue retention of 118% for Enterprise (>$100K ACV), 108% for Mid-Market ($25K–$100K ACV), and 97% for SMB (<$25K ACV).",
      url: "https://optif.ai/learn/questions/b2b-saas-net-revenue-retention-benchmark/",
    },
    {
      publisher: "Recurly",
      report: "State of Subscriptions & Churn Report",
      year: "2025",
      stat: "B2B SaaS average monthly churn sits at roughly 3.5%, with top performers below 2%.",
      url: "https://recurly.com/research/churn-rate-benchmarks/",
    },
  ],

  // ---- Freshness control ----
  // Bump this whenever you re-verify the benchmarks. Drives the visible
  // "Benchmarks last reviewed" stamp across the site. This is what signals
  // freshness to AI engines and human visitors — update it, not the source years.
  benchmarksLastReviewed: "June 2026",

  // ---- Social / sharing ----
  ogImage: "/og-image.png",
} as const;

// Convenience derived exports
export const siteUrl = siteConfig.url;
export const authorName = siteConfig.author.name;
export const authorSameAs = [
  siteConfig.author.linkedin,
  siteConfig.author.portfolio,
];

