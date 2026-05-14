"use client";

import type { PillarScore, Pillar } from "@/lib/types";

type Props = {
  rank: number;
  pillarScore: PillarScore;
  pillar: Pillar;
};

export function PriorityCard({ rank, pillarScore, pillar }: Props) {
  const recommendation = pillar.recommendations[pillarScore.tier];
  const tierColor = getTierAccentClass(pillarScore.tier);

  return (
    <article className="surface-elevated p-8 lg:p-10">
      <header className="flex items-start justify-between gap-6 mb-6 pb-6 border-b border-ink-900/10">
        <div className="flex-1">
          <p className="text-eyebrow mb-2">
            Priority {String(rank).padStart(2, "0")} ·{" "}
            <span className="text-ink-500 font-normal normal-case tracking-normal">
              {pillar.name}
            </span>
          </p>
          <h3 className="font-display text-2xl text-ink-900 leading-tight">
            {recommendation.title}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`font-display text-3xl ${tierColor.text} tabular-nums`}>
            {pillarScore.percentageScore}
          </div>
          <p className="text-caption uppercase tracking-wider mt-1">
            / 100
          </p>
        </div>
      </header>

      <div className="space-y-5 text-ink-700 leading-relaxed text-[15px]">
        <p>{recommendation.body}</p>

        <DetailRow label="First step" value={recommendation.firstStep} />
        <DetailRow label="Estimated impact" value={recommendation.impact} />
        <DetailRow label="Time to implement" value={recommendation.timeToImplement} />
      </div>
    </article>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-ember-600/40 pl-5 py-1">
      <p className="text-eyebrow mb-1.5">{label}</p>
      <p className="text-ink-700">{value}</p>
    </div>
  );
}

function getTierAccentClass(tier: string): { text: string; bg: string } {
  switch (tier) {
    case "critical":
      return { text: "text-ember-700", bg: "bg-ember-50" };
    case "at_risk":
      return { text: "text-ember-600", bg: "bg-ember-50" };
    case "functional":
      return { text: "text-ink-700", bg: "bg-parchment-200" };
    case "mature":
      return { text: "text-moss-700", bg: "bg-moss-400/10" };
    default:
      return { text: "text-ink-700", bg: "bg-parchment-200" };
  }
}
