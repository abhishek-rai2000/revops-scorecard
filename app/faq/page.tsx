import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { AuthorBlock } from "@/components/AuthorBlock";
import { SourcesStrip } from "@/components/SourcesStrip";

export const metadata: Metadata = {
  title: "B2B SaaS Revenue Retention FAQ | GRR, NRR & RevOps Benchmarks",
  description:
    "Answer-first explanations of B2B SaaS revenue operations metrics: what good GRR and NRR look like in 2026, the difference between them, how to measure RevOps health, and how to reduce churn.",
  alternates: { canonical: "/faq" },
};

/**
 * Single source of truth for the FAQ. Both the visible page and the FAQPage
 * JSON-LD schema render from this array, so they can never drift apart.
 * Answers are answer-first and self-contained (each quotable in isolation).
 */
const faqs: { question: string; answer: string }[] = [
  {
    question: "What is a good gross revenue retention (GRR) rate for B2B SaaS?",
    answer:
      "A good gross revenue retention rate for B2B SaaS is around 90% or higher. The 2026 median for private B2B SaaS sits near 88–91% (SaaS Capital, 2026; Benchmarkit, 2025), with top-quartile companies reaching 92% or above. GRR is capped at 100% because it measures pure revenue leakage — how much of last year's recurring revenue you keep before any expansion. Consistently scoring below 90% usually signals a structural pricing or product-fit problem that upsells cannot mask.",
  },
  {
    question: "What is the difference between GRR and NRR?",
    answer:
      "Gross revenue retention (GRR) measures how much existing revenue you keep after churn and contraction, excluding any expansion — so it is capped at 100%. Net revenue retention (NRR) adds expansion revenue (upsells, cross-sells, seat growth) back in, so it can exceed 100%. GRR tells you how leaky the bucket is; NRR tells you whether the water level is still rising despite the leaks. Reading them together separates two questions: are customers leaving, and are the ones who stay spending more?",
  },
  {
    question: "What is a good net revenue retention (NRR) rate for B2B SaaS?",
    answer:
      "A good NRR for B2B SaaS depends heavily on segment. The blended 2026 median is roughly 101–108%, but that hides a wide spread: Enterprise (ACV above $100K) runs near 118%, Mid-Market around 108%, and SMB near 97% (Optifai/ChartMogul, 2026). Above 100% means your existing base grows on its own, even before new logos. For enterprise-focused SaaS, aim for 115%+; at SMB scale, holding 100% is genuinely strong and 120% is exceptional.",
  },
  {
    question: "How do you measure revenue operations health?",
    answer:
      "Revenue operations health is measured across the systems that determine whether revenue compounds or leaks: churn signal visibility, SLA and operational discipline, process documentation, automation maturity, data and reporting trust, and renewal and expansion motion. The strongest single indicator is whether you can see churn coming 60 to 90 days out rather than discovering it at renewal. A structured diagnostic scores each area, weights it by revenue impact, and surfaces the highest-leverage gaps.",
  },
  {
    question: "How far in advance can you predict customer churn?",
    answer:
      "Teams with mature operations can reliably predict churn 60 to 90 days in advance by tracking leading signals: declining product usage, falling support sentiment, champion or stakeholder departure, and reduced engagement with QBRs. The difference is decisive — teams that see churn coming 90 days out recover the majority of at-risk accounts, while teams that find out at renewal recover almost none. Early visibility, not effort, is what separates top-quartile retention from average.",
  },
  {
    question: "What is a healthy NRR–GRR gap?",
    answer:
      "A healthy NRR–GRR gap for B2B SaaS is roughly 15 to 25 percentage points (for example, 108% NRR against 88% GRR). The gap equals expansion revenue divided by beginning ARR, so it measures expansion strength. A gap under 10 points suggests an under-developed expansion motion — customers stay but do not buy more. A gap above 30 points can be a warning sign that aggressive expansion is masking churn that will eventually surface.",
  },
  {
    question: "How do you reduce churn in B2B SaaS?",
    answer:
      "You reduce B2B SaaS churn by making it visible before it happens and intervening systematically. The highest-leverage moves are: build an account health score from leading signals (usage, support, stakeholder changes) reviewed weekly; start renewal conversations 90+ days out instead of at the deadline; and fix involuntary churn from failed payments, which accounts for up to roughly a quarter to a half of all churn and is recoverable through better dunning. Concentrate effort on the first 90 days of the customer lifecycle, where most cancellations originate.",
  },
  {
    question: "What is RevOps (revenue operations)?",
    answer:
      "Revenue operations (RevOps) is the function that aligns the systems, processes, and data behind a company's entire revenue engine — marketing, sales, and customer success — so they operate as one motion rather than three silos. In practice it covers churn and renewal operations, SLA discipline, process documentation, automation, and reporting. The goal is durable, capital-efficient growth: retaining and expanding existing revenue rather than relying on constant new-customer acquisition to replace what leaks out.",
  },
];

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/faq#faqpage`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-parchment-100">
      <FaqSchema />

      {/* Header */}
      <header className="px-6 lg:px-12 py-6 max-w-canvas mx-auto flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ember-800" aria-hidden />
          <span className="font-display text-lg tracking-tight text-ink-900">
            {siteConfig.shortName}
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/methodology"
            className="text-caption hover:text-ember-600 transition-colors hidden sm:inline"
          >
            Methodology
          </Link>
          <Link href="/scorecard" className="btn-ghost">
            Take the assessment
            <span aria-hidden>→</span>
          </Link>
        </nav>
      </header>

      {/* Answer-first opening */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto pt-12 lg:pt-16 pb-8">
        <p className="text-eyebrow mb-4">FAQ</p>
        <h1 className="font-display text-display-lg text-ink-900 mb-6">
          B2B SaaS revenue retention, answered
        </h1>
        <p className="text-xl text-ink-700 leading-relaxed">
          Clear, current answers to the questions revenue and operations leaders
          ask most about B2B SaaS retention — what good gross and net revenue
          retention look like in 2026, how they differ, how to measure
          operational health, and how to reduce churn. Figures are drawn from
          named industry benchmarks and reviewed regularly.
        </p>
        <div className="mt-6">
          <SourcesStrip variant="inline" />
        </div>
      </section>

      <SectionRule />

      {/* The FAQ list */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
          {faqs.map((f, i) => (
            <div key={i} className="py-8">
              <h2 className="font-display text-xl lg:text-2xl text-ink-900 mb-3 leading-snug">
                {f.question}
              </h2>
              <p className="text-ink-700 leading-relaxed max-w-prose">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SectionRule />

      {/* Author */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <AuthorBlock variant="full" />
      </section>

      <SectionRule />

      {/* CTA */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-md text-ink-900 mb-4">
            See where your revenue operations stand
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed mb-8">
            The RevOps Health Scorecard scores your operation across six pillars
            in about 5 minutes and returns a personalised report with your
            three highest-leverage fixes.
          </p>
          <Link href="/scorecard" className="btn-primary">
            Take the scorecard
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-900/10 mt-12">
        <div className="max-w-canvas mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="font-display text-ink-900">{siteConfig.shortName}</p>
            <p className="text-caption max-w-md">
              Built by {siteConfig.author.name}. A free tool for B2B SaaS ops
              leaders.
            </p>
          </div>
          <div className="flex items-center gap-6 text-caption">
            <Link href="/methodology" className="hover:text-ember-600 transition-colors">
              Methodology
            </Link>
            <Link href="/faq" className="hover:text-ember-600 transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-ember-600 transition-colors">
              Privacy
            </Link>
            
            <a href={siteConfig.author.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ember-600 transition-colors"
          >
            Portfolio
          </a>

             <a href={`mailto:${siteConfig.contactEmail}`}
              className="hover:text-ember-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionRule() {
  return (
    <div className="max-w-narrow mx-auto px-6 lg:px-12">
      <div className="editorial-rule" />
    </div>
  );
}

