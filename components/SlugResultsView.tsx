"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { scorecard } from "@/lib/content";
import { calculateScore } from "@/lib/scoring";
import { PillarRadar } from "./PillarRadar";
import { PriorityCard } from "./PriorityCard";
import type { QuestionResponses, ScoreResult } from "@/lib/types";

type Props = { slug: string };

type LoadedData = {
  name: string;
  result: ScoreResult;
  aiNarrative: string;
};

export function SlugResultsView({ slug }: Props) {
  const router = useRouter();
  const [data, setData] = useState<LoadedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/results?slug=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((raw) => {
        const responses: QuestionResponses = raw.responses;
        const result = calculateScore(scorecard, responses);
        setData({
          name: raw.name,
          result,
          aiNarrative: raw.ai_narrative || "",
        });
        setLoading(false);
      })
      .catch(() => {
        router.push("/scorecard");
      });
  }, [slug, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-parchment-100 flex items-center justify-center">
        <p className="text-ink-500 text-sm">Loading your results...</p>
      </main>
    );
  }

  if (!data) return null;

  const { name, result, aiNarrative } = data;
  const firstName = name.trim().split(" ")[0];

  return (
    <main className="min-h-screen bg-parchment-100">

      <div className="bg-parchment-200/70 border-b border-ink-900/10">
        <div className="max-w-canvas mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-ink-600 leading-relaxed">
            This is {firstName}{"'"}s RevOps health report.{" "}
            <span className="text-ink-900 font-medium">Want to see yours?</span>
          </p>
          <Link
            href="/scorecard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-ink-900 text-parchment-50 text-sm font-medium rounded-md hover:bg-ember-600 transition-colors whitespace-nowrap"
          >
            Take the scorecard
          </Link>
        </div>
      </div>

      <header className="px-6 lg:px-12 py-6 max-w-canvas mx-auto">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ember-600" aria-hidden />
          <span className="font-display text-lg tracking-tight text-ink-900">
            RevOps Scorecard
          </span>
        </Link>
      </header>

      <section className="px-6 lg:px-12 max-w-canvas mx-auto pt-12 lg:pt-20 pb-16">
        <p className="text-eyebrow mb-6">Your scorecard, {firstName}</p>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <h1 className="font-display text-display-xl text-ink-900 mb-6">
              <span className="block text-ink-500 text-2xl font-light mb-3">
                Total score
              </span>
              <span className="tabular-nums">{result.totalScore}</span>
              <span className="text-ink-400 text-3xl font-light">/100</span>
            </h1>
            <div className="mb-8">
              <TierBadge tier={result.tier.id} label={result.tier.label} />
            </div>
            <p className="text-lg text-ink-700 leading-relaxed max-w-prose">
              {result.tier.framing}
            </p>
            {aiNarrative && (
              <div className="mt-8 p-6 bg-parchment-200/60 border-l-2 border-ember-600/40 rounded-r-md max-w-prose">
                <p className="text-eyebrow mb-3">{"Consultant's read"}</p>
                <p className="text-ink-700 leading-relaxed text-[15px] whitespace-pre-line">
                  {aiNarrative}
                </p>
              </div>
            )}
          </div>
          <div className="lg:col-span-6">
            <PillarRadar pillarScores={result.pillarScores} />
          </div>
        </div>
      </section>

      <div className="max-w-canvas mx-auto px-6 lg:px-12">
        <div className="h-px bg-ink-900/10" />
      </div>

      <section className="px-6 lg:px-12 max-w-canvas mx-auto py-16">
        <p className="text-eyebrow mb-3">Pillar breakdown</p>
        <h2 className="font-display text-display-md text-ink-900 mb-10">
          {"Where you're strong, where you're weak."}
        </h2>
        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
          {result.pillarScores.map((p) => {
            const pillar = scorecard.pillars.find((pl) => pl.id === p.id)!;
            return (
              <div
                key={p.id}
                className="py-6 grid grid-cols-12 gap-4 items-baseline"
              >
                <div className="col-span-7 lg:col-span-6">
                  <h3 className="font-display text-xl text-ink-900 mb-1">
                    {pillar.name}
                  </h3>
                  <p className="text-caption">
                    Weight {Math.round(pillar.weight * 100)}%
                  </p>
                </div>
                <div className="col-span-3 lg:col-span-4">
                  <div className="h-1 bg-ink-900/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ember-600"
                      style={{ width: `${p.percentageScore}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-display text-2xl text-ink-900 tabular-nums">
                    {p.percentageScore}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {result.grrCommentary && (
          <div className="mt-10 p-6 lg:p-8 bg-ember-50 border-l-2 border-ember-600 rounded-r-md max-w-prose">
            <p className="text-eyebrow mb-2">On your GRR</p>
            <p className="text-ink-800 leading-relaxed">{result.grrCommentary}</p>
          </div>
        )}
      </section>

      <div className="max-w-canvas mx-auto px-6 lg:px-12">
        <div className="h-px bg-ink-900/10" />
      </div>

      <section className="px-6 lg:px-12 max-w-canvas mx-auto py-16">
        <p className="text-eyebrow mb-3">Top 3 priorities</p>
        <h2 className="font-display text-display-md text-ink-900 mb-3">
          Your highest-leverage fixes.
        </h2>
        <p className="text-ink-600 max-w-prose mb-12 leading-relaxed">
          Ranked by where the biggest gains are. Each comes with a specific
          first step you can take this week.
        </p>
        <div className="grid gap-6">
          {result.topPriorities.map((p, i) => {
            const pillar = scorecard.pillars.find((pl) => pl.id === p.id)!;
            return (
              <PriorityCard
                key={p.id}
                rank={i + 1}
                pillarScore={p}
                pillar={pillar}
              />
            );
          })}
        </div>
      </section>

      <div className="max-w-canvas mx-auto px-6 lg:px-12">
        <div className="h-px bg-ink-900/10" />
      </div>

      <section className="px-6 lg:px-12 max-w-canvas mx-auto py-16">
        <div className="max-w-2xl">
          <p className="text-eyebrow mb-3">{"What's next"}</p>
          <h2 className="font-display text-display-lg text-ink-900 mb-6">
            Want a 30-minute walkthrough?
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed mb-8">
            The teams that act on a scorecard like this within 30 days typically
            move up one tier within 6 months. Book a free session to discuss
            your specific report and find the single highest-leverage fix for
            your stage.
          </p>
          <a
            href="mailto:abhishek.k0420@gmail.com?subject=RevOps%20Scorecard%20walkthrough"
            className="btn-primary"
          >
            Book a 30-minute walkthrough
          </a>
          <p className="text-caption mt-4">
            No pitch. We will go through your report and identify what to fix
            first.
          </p>
        </div>
      </section>

      <footer className="border-t border-ink-900/10 mt-12">
        <div className="max-w-canvas mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="font-display text-ink-900">RevOps Scorecard</p>
            <p className="text-caption max-w-md">
              Built by Abhishek Rai. A free tool for B2B SaaS ops leaders.
            </p>
          </div>
          <div className="flex items-center gap-6 text-caption">
            <a
              href="https://abhishek-rai-1.netlify.app"
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
          </div>
        </div>
      </footer>
    </main>
  );
}

function TierBadge({ tier, label }: { tier: string; label: string }) {
  const styles: Record<string, string> = {
    critical: "bg-ember-50 text-ember-700 border-ember-600/30",
    at_risk: "bg-ember-50 text-ember-600 border-ember-400/40",
    functional: "bg-parchment-200 text-ink-700 border-ink-900/15",
    mature: "bg-moss-400/10 text-moss-700 border-moss-600/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
        styles[tier] || styles.functional
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}


