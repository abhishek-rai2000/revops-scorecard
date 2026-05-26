import Link from "next/link";
import { scorecard } from "@/lib/content";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-parchment-100">
      <Header />
      <Hero />
      <SectionRule />
      <WhyItMatters />
      <SectionRule />
      <WhatYouGet />
      <SectionRule />
      <CallToAction />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="px-6 lg:px-12 py-6 max-w-canvas mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#0D6B5E" }} aria-hidden />
        <span className="font-display text-lg tracking-tight text-ink-900">
          RevOps Scorecard
        </span>
      </div>
      <Link href="/scorecard" className="btn-ghost">
        Take the assessment
        <span aria-hidden>→</span>
      </Link>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-6 lg:px-12 py-20 lg:py-28 max-w-canvas mx-auto">
      <div className="max-w-4xl">
        <p className="text-eyebrow mb-8 animate-fade-in">
          A diagnostic · 18 questions · {scorecard.meta.estimatedMinutes} minutes
        </p>

        <h1 className="font-display text-display-xl text-ink-900 mb-8 animate-fade-up [animation-delay:100ms] opacity-0">
          How healthy is your{" "}
          <span className="italic font-light text-ember-600">revenue operations</span>{" "}
          really?
        </h1>

        <p className="font-display text-xl lg:text-2xl text-ink-700 leading-relaxed max-w-prose mb-12 animate-fade-up [animation-delay:200ms] opacity-0">
          A free diagnostic for B2B SaaS operations leaders. Six pillars,
          benchmarked against latest industry data, with a prioritised report on
          what to fix first.
        </p>

        <div className="flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:300ms] opacity-0">
          <Link href="/scorecard" className="btn-primary">
            Start the scorecard
            <span aria-hidden>→</span>
          </Link>
          <span className="text-caption">
            No signup to start · Email required only for the report
          </span>
        </div>
      </div>
    </section>
  );
}

function WhyItMatters() {
  return (
    <section className="px-6 lg:px-12 py-20 max-w-canvas mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-eyebrow mb-4">Why this matters</p>
          <h2 className="font-display text-display-md text-ink-900">
            Most ops teams diagnose problems too late.
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-ink-700 leading-relaxed">
          <p className="text-lg">
            The {new Date().getFullYear()} benchmarks tell a hard story. Median gross revenue
            retention for B2B SaaS sits at 90 to 92 percent. The top quartile
            achieves 95 percent or higher. The difference is rarely effort.
            {"It's"} visibility — whether ops sees the problems coming, or only
            finds out at renewal time.
          </p>
          <p>
            This scorecard measures the systems behind that visibility. Churn
            signal tracking, SLA discipline, process documentation, automation
            maturity, data trust, and renewal motion. Six pillars that
            collectively determine whether your ops compounds revenue or leaks
            it.
          </p>
          <p>
            {"You'll"} get a tier, a pillar-by-pillar breakdown, and the three
            highest-leverage fixes for your specific weaknesses — each with a
            first step you can take this week.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    {
      title: "A weighted total score",
      body: "Across the six pillars, weighted by their actual impact on revenue. Mapped to one of four tiers from Critical to Mature, with framing for what your tier means at your stage.",
    },
    {
      title: "A pillar-level breakdown",
      body: "See exactly where you're strong, where you're weak, and how you compare to similar B2B SaaS companies. The breakdown surfaces problems most leaders sense but can't articulate.",
    },
    {
      title: "Three prioritised fixes",
      body: "The three lowest-scoring pillars get tier-appropriate recommendations — not generic advice, but specific first steps with estimated revenue impact and time to implement.",
    },
    {
      title: "A detailed email report",
      body: "Delivered to your inbox immediately after. Includes your score, an AI-generated consultant's read on your specific situation, and your top three priorities. Shareable via a permanent link.",
    },
  ];

  return (
    <section className="px-6 lg:px-12 py-20 max-w-canvas mx-auto">
      <div className="mb-12">
        <p className="text-eyebrow mb-4">What you get</p>
        <h2 className="font-display text-display-md text-ink-900 max-w-2xl">
          A serious diagnostic, not a marketing quiz.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-ink-900/[0.08]">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-parchment-100 p-8 lg:p-10 hover:bg-parchment-50 transition-colors"
          >
            <p className="text-ember-600 font-display text-2xl mb-4">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-xl text-ink-900 mb-3">
              {item.title}
            </h3>
            <p className="text-ink-600 leading-relaxed text-[15px]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionRule() {
  return (
    <div className="max-w-canvas mx-auto px-6 lg:px-12">
      <div className="editorial-rule" />
    </div>
  );
}

function CallToAction() {
  return (
    <section className="px-6 lg:px-12 py-24 max-w-canvas mx-auto">
      <div className="max-w-3xl">
        <h2 className="font-display text-display-lg text-ink-900 mb-6">
          Take the {scorecard.meta.estimatedMinutes}-minute scorecard.
        </h2>
        <p className="text-lg text-ink-600 leading-relaxed mb-10 max-w-prose">
          18 questions across 6 pillars. Most leaders finish in under 5
          minutes. {" "}Free forever. No paid tier. No sales call. Built as a
          portfolio project by an ops professional with 4 years in B2B
          enterprise operations.
        </p>
        <Link href="/scorecard" className="btn-primary">
          Start now
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-900/10 mt-20">
      <div className="max-w-canvas mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="font-display text-ink-900">RevOps Scorecard</p>
          <p className="text-caption max-w-md">
            Built by Abhishek Rai. A free tool for B2B SaaS ops leaders.
          </p>
        </div>
        <div className="flex items-center gap-6 text-caption">
          <a
            href="https://abhishekrai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ember-600 transition-colors"
          >
            Portfolio
          </a>
          <a
            href="mailto:abhishek.k0420@gmail.com"
            className="hover:text-ember-600 transition-colors"
          >
            Contact
          </a>
          <Link href="/privacy" className="hover:text-ember-600 transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

