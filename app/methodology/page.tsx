import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { scorecard } from "@/lib/content";
import { AuthorBlock } from "@/components/AuthorBlock";

export const metadata: Metadata = {
  title: "Methodology | How the RevOps Health Scorecard Works",
  description:
    "How the RevOps Health Scorecard measures B2B SaaS revenue operations health: the six weighted pillars, the scoring model, and the industry benchmarks behind every score.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  const pillarCount = scorecard.pillars.length;

  return (
    <main className="min-h-screen bg-parchment-100">
      {/* Header */}
      <header className="px-6 lg:px-12 py-6 max-w-canvas mx-auto flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ember-600" aria-hidden />
          <span className="font-display text-lg tracking-tight text-ink-900">
            {siteConfig.shortName}
          </span>
        </Link>
        <Link href="/scorecard" className="btn-ghost">
          Take the assessment
        </Link>
      </header>

      {/* Answer-first opening — this is the AI extraction target */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto pt-12 lg:pt-16 pb-8">
        <p className="text-eyebrow mb-4">Methodology</p>
        <h1 className="font-display text-display-lg text-ink-900 mb-6">
          How the scorecard works
        </h1>
        <p className="text-xl text-ink-700 leading-relaxed">
          The RevOps Health Scorecard measures the health of a B2B SaaS
          revenue operation across {pillarCount} weighted pillars — churn
          signal visibility, SLA discipline, process documentation, automation
          maturity, data and reporting, and renewal and expansion. Each pillar
          is scored from your answers, weighted by its impact on revenue, and
          combined into a single score from 0 to 100 mapped to one of four
          tiers. Benchmarks are drawn from current industry retention data.
        </p>
      </section>

      <SectionRule />

      {/* The six pillars */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <h2 className="font-display text-display-md text-ink-900 mb-3">
          The {pillarCount} pillars
        </h2>
        <p className="text-ink-600 leading-relaxed mb-10 max-w-prose">
          Each pillar represents a system that determines whether a revenue
          operation compounds revenue or leaks it. The weights reflect how much
          each one moves the outcome — churn signal visibility carries the most
          weight because early visibility has the highest leverage on retained
          ARR.
        </p>

        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
          {scorecard.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="py-6 grid grid-cols-12 gap-4 items-baseline"
            >
              <div className="col-span-8 lg:col-span-9">
                <h3 className="font-display text-xl text-ink-900 mb-1">
                  {pillar.name}
                </h3>
                {pillar.description && (
                  <p className="text-ink-600 text-[15px] leading-relaxed max-w-prose">
                    {pillar.description}
                  </p>
                )}
              </div>
              <div className="col-span-4 lg:col-span-3 text-right">
                <span className="font-display text-2xl text-ember-700 tabular-nums">
                  {Math.round(pillar.weight * 100)}%
                </span>
                <p className="text-caption mt-0.5">weight</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionRule />

      {/* How scoring works */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <h2 className="font-display text-display-md text-ink-900 mb-8">
          How scoring works
        </h2>

        <div className="space-y-8 text-ink-700 leading-relaxed">
          <div>
            <h3 className="font-display text-lg text-ink-900 mb-2">
              1. Each answer maps to a point value
            </h3>
            <p className="max-w-prose">
              Every diagnostic question has weighted answer options. Stronger
              operational practices score higher. Your answers within a pillar
              are summed to a raw pillar score, then converted to a percentage
              of the maximum possible for that pillar.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg text-ink-900 mb-2">
              2. Pillars are weighted, then combined
            </h3>
            <p className="max-w-prose">
              Each pillar percentage is multiplied by its weight and summed.
              The result is your total score from 0 to 100. Because churn signal
              visibility carries the highest weight, a weakness there pulls the
              total down more than an equivalent weakness elsewhere — which
              reflects its real impact on retained revenue.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg text-ink-900 mb-2">
              3. Your score maps to a tier
            </h3>
            <p className="max-w-prose mb-4">
              The total score places you in one of four tiers, each with a
              distinct operating reality:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { range: "0–40", label: "Critical", note: "Foundational gaps leaking revenue now." },
                { range: "41–60", label: "At risk", note: "Functioning, but specific gaps causing measurable leak." },
                { range: "61–80", label: "Functional", note: "Solid foundation, refinement opportunities remain." },
                { range: "81–100", label: "Mature", note: "Systematic operations compounding revenue." },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="p-4 bg-parchment-200/50 border border-ink-900/10 rounded-md"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-display text-ink-900">
                      {tier.label}
                    </span>
                    <span className="text-caption tabular-nums">
                      {tier.range}
                    </span>
                  </div>
                  <p className="text-[13px] text-ink-600 leading-relaxed">
                    {tier.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-ink-900 mb-2">
              4. The three lowest pillars become your priorities
            </h3>
            <p className="max-w-prose">
              The scorecard surfaces your three lowest-scoring pillars as
              prioritised fixes — ranked by where the biggest gains are, each
              with a specific first step and an estimated revenue impact based
              on the benchmark data below.
            </p>
          </div>
        </div>
      </section>

      <SectionRule />

      {/* Benchmarks — the credibility + citation core */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <h2 className="font-display text-display-md text-ink-900 mb-3">
          The benchmarks behind the scores
        </h2>
        <p className="text-ink-600 leading-relaxed mb-2 max-w-prose">
          Estimated impacts and tier framing are grounded in published B2B SaaS
          retention research, not opinion. Each source below is named, dated,
          and linked to its primary report.
        </p>
        <p className="text-caption mb-10">
          Benchmarks last reviewed: {siteConfig.benchmarksLastReviewed}
        </p>

        <div className="space-y-px bg-ink-900/[0.08] border border-ink-900/[0.08] rounded-lg overflow-hidden">
          {siteConfig.sources.map((source) => (
            <div key={source.publisher + source.year} className="bg-parchment-100 p-5 lg:p-6">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="font-display text-lg text-ink-900">
                  {source.publisher}
                </h3>
                <span className="text-caption whitespace-nowrap tabular-nums">
                  {source.year}
                </span>
              </div>
              <p className="text-[13px] uppercase tracking-wider text-ember-700 mb-2">
                {source.report}
              </p>
              <p className="text-ink-700 text-[15px] leading-relaxed max-w-prose mb-3">
                {source.stat}
              </p>
              
                <a href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ember-700 hover:text-ember-600 transition-colors inline-flex items-center gap-1.5"
              >
                View source
                <span aria-hidden className="text-xs">↗</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-ember-50 border-l-2 border-ember-600 rounded-r-md">
          <p className="text-ink-800 text-[15px] leading-relaxed max-w-prose">
            <strong className="text-ink-900">A note on freshness:</strong>{" "}
            Retention benchmarks shift slowly — median gross revenue retention
            for B2B SaaS has held in the 88–92% range for several years. These
            figures are re-verified periodically against the latest published
            reports; the review date above reflects the last check.
          </p>
        </div>
      </section>

      <SectionRule />

      {/* Author credibility */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <AuthorBlock variant="full" />
      </section>

      <SectionRule />

      {/* CTA */}
      <section className="px-6 lg:px-12 max-w-narrow mx-auto py-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-md text-ink-900 mb-4">
            See where you stand
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed mb-8">
            The assessment takes about 5 minutes and returns your full scorecard
            immediately — score, pillar breakdown, and your three highest-leverage
            fixes.
          </p>
          <Link href="/scorecard" className="btn-primary">
            Take the scorecard
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
            <Link href="/privacy" className="hover:text-ember-600 transition-colors">
              Privacy
            </Link>
            
              < a href={`mailto:${siteConfig.contactEmail}`}
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


