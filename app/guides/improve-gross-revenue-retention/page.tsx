import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { AuthorBlock } from "@/components/AuthorBlock";
import { SourcesStrip } from "@/components/SourcesStrip";

const PUBLISHED = "2026-06-30";
const MODIFIED = "2026-06-30";
const SLUG = "/guides/improve-gross-revenue-retention";

export const metadata: Metadata = {
  title:
    "How to Improve Gross Revenue Retention in B2B SaaS (2026 Guide)",
  description:
    "A practical 2026 guide to improving gross revenue retention (GRR) in B2B SaaS: what GRR is, how to calculate it, current benchmarks by segment, and the five highest-leverage levers to reduce revenue leakage.",
  alternates: { canonical: SLUG },
};

/**
 * Article + Person (author) + BreadcrumbList schema, server-rendered.
 * Article with a named, credentialed author and explicit dates is the
 * structured-data signal AI engines reward for authority.
 */
function GuideSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}${SLUG}#article`,
        headline:
          "How to Improve Gross Revenue Retention in B2B SaaS",
        description:
          "A practical 2026 guide to improving gross revenue retention (GRR) in B2B SaaS: what GRR is, how to calculate it, current benchmarks by segment, and the five highest-leverage levers to reduce revenue leakage.",
        datePublished: PUBLISHED,
        dateModified: MODIFIED,
        author: { "@id": `${siteConfig.url}/#person` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        mainEntityOfPage: `${siteConfig.url}${SLUG}`,
        about: [
          "Gross Revenue Retention",
          "B2B SaaS",
          "Customer Churn",
          "Revenue Operations",
        ],
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}${SLUG}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${siteConfig.url}/guides`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Improving Gross Revenue Retention",
            item: `${siteConfig.url}${SLUG}`,
          },
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

export default function GrrGuidePage() {
  return (
    <main className="min-h-screen bg-parchment-100">
      <GuideSchema />

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
          <Link
            href="/faq"
            className="text-caption hover:text-ember-600 transition-colors hidden sm:inline"
          >
            FAQ
          </Link>
          <Link href="/scorecard" className="btn-ghost">
            Take the assessment
            <span aria-hidden>→</span>
          </Link>
        </nav>
      </header>

      {/* Breadcrumb + title + answer-first opening */}
      <article className="px-6 lg:px-12 max-w-narrow mx-auto pt-10 lg:pt-14 pb-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-caption">
            <li>
              <Link href="/" className="hover:text-ember-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-ink-400">
              /
            </li>
            <li className="text-ink-500">Guides</li>
            <li aria-hidden className="text-ink-400">
              /
            </li>
            <li className="text-ink-700">Gross revenue retention</li>
          </ol>
        </nav>

        <p className="text-eyebrow mb-4">Guide · Retention</p>
        <h1 className="font-display text-display-lg text-ink-900 mb-6 leading-tight">
          How to improve gross revenue retention in B2B SaaS
        </h1>

        <p className="text-xl text-ink-700 leading-relaxed">
          To improve gross revenue retention, make churn visible 60 to 90 days
          before it happens, intervene on at-risk accounts with a defined save
          motion, and close the leaks you are not even counting — failed
          payments and weak onboarding. GRR measures pure revenue leakage, so
          every point you recover is a direct percentage of ARR kept. This
          guide covers what GRR is, where the 2026 benchmarks sit, and the five
          highest-leverage levers to move the number.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-caption">
            By {siteConfig.author.name} · Updated June 2026
          </span>
        </div>
        <div className="mt-4">
          <SourcesStrip variant="inline" />
        </div>
      </article>

      <SectionRule />

      {/* What GRR is */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-10">
        <h2 className="font-display text-2xl lg:text-3xl text-ink-900 mb-5">
          What gross revenue retention is
        </h2>
        <div className="space-y-5 text-ink-700 leading-relaxed">
          <p>
            Gross revenue retention (GRR) is the percentage of recurring revenue
            you keep from your existing customer base over a period, before any
            expansion. It counts only what you lose — churn and contraction —
            and never what you gain from upsells. Because of that, GRR is capped
            at 100 percent. It is the floor metric: how much of last
            year&apos;s revenue survives before anything is added back on top.
          </p>
          <p>The formula is straightforward:</p>
          <div className="bg-parchment-200/60 border border-ink-900/10 rounded-lg p-6 my-2">
            <p className="font-mono text-[15px] text-ink-900 leading-relaxed">
              GRR = (Starting ARR − Churned ARR − Contraction ARR) ÷ Starting
              ARR
            </p>
          </div>
          <p>
            This is what makes GRR the most honest number in a retention review.
            Net revenue retention (NRR) adds expansion back in and can climb
            above 100 percent, which means a strong upsell motion can mask real
            churn underneath. GRR cannot be masked. A company can post 115
            percent NRR and still be losing 12 percent of its base every year —
            the GRR is what reveals it. Reading both together separates two
            questions: are customers leaving, and are the ones who stay growing?
          </p>
        </div>
      </section>

      <SectionRule />

      {/* Benchmarks */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-10">
        <h2 className="font-display text-2xl lg:text-3xl text-ink-900 mb-5">
          What good GRR looks like in 2026
        </h2>
        <div className="space-y-5 text-ink-700 leading-relaxed">
          <p>
            Median gross revenue retention for private B2B SaaS sits at around
            90 to 92 percent in 2026 (SaaS Capital, 2026; Benchmarkit, 2025).
            Top-quartile companies reach 95 percent or higher. Consistently
            scoring below 90 percent is a signal in itself — it usually points
            to a structural pricing or product-fit problem that expansion cannot
            paper over.
          </p>
          <p>
            But a single median hides more than it reveals, because GRR varies
            with contract size. Larger contracts churn less — deeper
            integration, more stakeholders, higher switching cost — while
            smaller, self-serve accounts leak faster. The most common
            benchmarking mistake is comparing yourself to a blended median
            instead of your own segment.
          </p>
        </div>

        {/* Benchmark table */}
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-900/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-parchment-200/70">
                <th className="font-display text-sm text-ink-900 font-semibold px-5 py-3.5 border-b border-ink-900/10">
                  Segment
                </th>
                <th className="font-display text-sm text-ink-900 font-semibold px-5 py-3.5 border-b border-ink-900/10">
                  Median GRR
                </th>
                <th className="font-display text-sm text-ink-900 font-semibold px-5 py-3.5 border-b border-ink-900/10">
                  What strong looks like
                </th>
              </tr>
            </thead>
            <tbody className="text-[15px]">
              <tr>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-800 font-medium">
                  B2B SaaS overall
                </td>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-700 tabular-nums">
                  ~90–92%
                </td>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-700">
                  95%+ (top quartile)
                </td>
              </tr>
              <tr className="bg-parchment-50/40">
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-800 font-medium">
                  Enterprise (&gt;$100K ACV)
                </td>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-700 tabular-nums">
                  ~92%+
                </td>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-700">
                  Highest stickiness; 95%+ common
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-800 font-medium">
                  Mid-market ($25K–$100K ACV)
                </td>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-700 tabular-nums">
                  ~90%
                </td>
                <td className="px-5 py-3.5 border-b border-ink-900/[0.06] text-ink-700">
                  90–93% with a defended renewal motion
                </td>
              </tr>
              <tr className="bg-parchment-50/40">
                <td className="px-5 py-3.5 text-ink-800 font-medium">
                  SMB (&lt;$25K ACV)
                </td>
                <td className="px-5 py-3.5 text-ink-700 tabular-nums">
                  ~85–88%
                </td>
                <td className="px-5 py-3.5 text-ink-700">
                  Holding 90%+ is genuinely strong
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-caption">
          Figures synthesised from SaaS Capital (2026), Benchmarkit (2025), and
          Optifai / ChartMogul (2026). Ranges are directional; calibrate to your
          own ACV tier. Last reviewed June 2026.
        </p>
      </section>

      <SectionRule />

      {/* The five levers */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-10">
        <h2 className="font-display text-2xl lg:text-3xl text-ink-900 mb-5">
          Five levers to improve GRR
        </h2>
        <p className="text-ink-700 leading-relaxed mb-8">
          Improving GRR is not about a single heroic fix. It is about closing
          leaks in the order of their leverage. These five levers are sequenced
          from highest impact to most often overlooked — start at the top.
        </p>

        <div className="space-y-8">
          <Lever
            n={1}
            title="Make churn visible 60 to 90 days out"
            body="The single biggest determinant of GRR is whether you see churn coming or find out at renewal. Build an account health score from leading signals — product usage trend, support ticket sentiment, champion or stakeholder departure, and engagement with QBRs. Even a basic three-signal score reviewed weekly will surface most preventable churn 30 or more days earlier than you catch it now. Visibility, not effort, is what separates top-quartile retention from average."
          />
          <Lever
            n={2}
            title="Fix involuntary churn before anything else"
            body="A surprisingly large share of churn is not a decision at all — it is a failed payment. Involuntary churn from expired cards and billing failures accounts for a meaningful fraction of total churn in B2B SaaS and can quietly cost 2 to 5 percent of ARR a year (Recurly, 2025). It is also the cheapest leak to close: smart dunning — automated retries, pre-expiry card updates, and clear billing communication — recovers a large majority of failed payments with no product change at all. This is the highest return-on-effort lever in the entire list."
          />
          <Lever
            n={3}
            title="Win the first 90 days"
            body="A large share of all cancellations originate in the first 90 days, before a customer ever reaches a renewal. The cause is almost always failed activation — customers who never adopt the core features that deliver value. Map onboarding to specific activation milestones rather than calendar days, and drive adoption of the two or three features that correlate most with retention. Customers who reach meaningful feature adoption early are materially more likely to stay. Onboarding is a retention lever disguised as an onboarding problem."
          />
          <Lever
            n={4}
            title="Start the renewal conversation early"
            body="Renewals handled at the deadline are renewals handled too late to influence. Move the first renewal touch to 90 or more days before the contract date, and treat every account renewing in the next quarter as a tracked motion with an owner and a date. This single calendar discipline — without changing anything else about the product or pricing — reliably lifts renewal rates, because it converts renewal from a scramble into a managed process with time to address risk."
          />
          <Lever
            n={5}
            title="Close the loop with a defined save play"
            body="Visibility only matters if it triggers action. When an account flags as at-risk, what happens next should not be left to whoever has time. Define a save play: the steps, the stakeholder map, the offer, and the owner. Track it through to an outcome, and measure save rate the way sales measures win rate. Diagnosing why accounts leave — through structured exit interviews that separate product gap, value gap, fit gap, and budget cut — tells you which levers above to weight most heavily for your specific book."
          />
        </div>
      </section>

      <SectionRule />

      {/* Where to start / diagnostic bridge */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-10">
        <h2 className="font-display text-2xl lg:text-3xl text-ink-900 mb-5">
          Where to start
        </h2>
        <div className="space-y-5 text-ink-700 leading-relaxed">
          <p>
            The levers are sequenced, but the right starting point depends on
            where your leak actually is. If your GRR is below the segment floor,
            the constraint is almost always churn visibility or involuntary
            churn — fix those before investing in expansion, because expansion
            cannot durably outrun a leaking base. If your GRR is healthy but you
            suspect it is fragile, the work is to make the renewal and save
            motions repeatable before the number slips.
          </p>
          <p>
            The fastest way to find your specific constraint is to score your
            operation honestly across the systems that drive retention — churn
            visibility, SLA discipline, process documentation, automation, data
            trust, and renewal motion — and see which one is dragging the
            others down.
          </p>
        </div>
      </section>

      <SectionRule />

      {/* Author */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-10">
        <AuthorBlock variant="full" />
      </section>

      <SectionRule />

      {/* CTA */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-md text-ink-900 mb-4">
            Find your retention constraint in 5 minutes
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed mb-8">
            The RevOps Health Scorecard scores your operation across six pillars
            and returns a personalised report showing exactly where your revenue
            is leaking — and the three highest-leverage fixes for your stage.
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
            <a
              href={siteConfig.author.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ember-600 transition-colors"
            >
              Portfolio
            </a>
            <Link href="/privacy" className="hover:text-ember-600 transition-colors">
              Privacy
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
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

function Lever({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-ember-600/10 border border-ember-600/30 flex items-center justify-center">
          <span className="font-display text-ember-700 text-sm font-semibold tabular-nums">
            {n}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-display text-xl text-ink-900 mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-ink-700 leading-relaxed text-[15px]">{body}</p>
      </div>
    </div>
  );
}

function SectionRule() {
  return (
    <div className="max-w-narrow mx-auto px-6 lg:px-12">
      <div className="editorial-rule" />
    </div>
  );
}

