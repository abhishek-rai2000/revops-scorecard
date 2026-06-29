/**
 * impact.ts
 * ARR-scaled impact rendering for retention pillars (churn, renewal).
 *
 * The core figure is definitional, not a vendor claim: gross revenue retention
 * measures pure revenue leakage, so lifting GRR by ~5 points recovers ~5% of
 * ARR. We express this as a defensible RANGE per ARR band (5% of the band's
 * bounds), never as false precision. Validated against published benchmarks
 * (e.g. McKinsey: 7 NRR points on a $50M base ≈ $3.5M).
 */

import { scorecard } from "@/lib/content";

/**
 * Per ARR band: the approximate annual ARR recovered by lifting GRR ~5 points
 * (≈5% of ARR), expressed as a human range, plus a readable label of the band.
 */
type ArrImpactRange = {
  bandLabel: string; // e.g. "$20M–$50M ARR"
  recovery: string; // e.g. "$1M–$2.5M"
};

const ARR_IMPACT: Record<string, ArrImpactRange> = {
  under_1m: {
    bandLabel: "under $1M ARR",
    recovery: "up to ~$50K",
  },
  "1_5m": {
    bandLabel: "$1M–$5M ARR",
    recovery: "roughly $50K–$250K",
  },
  "5_20m": {
    bandLabel: "$5M–$20M ARR",
    recovery: "roughly $250K–$1M",
  },
  "20_50m": {
    bandLabel: "$20M–$50M ARR",
    recovery: "roughly $1M–$2.5M",
  },
  "50m_plus": {
    bandLabel: "$50M+ ARR",
    recovery: "$2.5M or more",
  },
};

/**
 * Returns the readable ARR band label (e.g. "$20M–$50M ARR") or null.
 * Falls back to the scorecard.json context label if the band isn't mapped.
 */
export function arrBandLabel(arrId: string | undefined): string | null {
  if (!arrId) return null;
  const mapped = ARR_IMPACT[arrId];
  if (mapped) return mapped.bandLabel;
  // Fallback: pull the raw option label from scorecard content.
  const arrQuestion = scorecard.context.find((c) => c.id === "arr");
  const option = arrQuestion?.options.find((o) => o.id === arrId);
  return option ? `${option.label} ARR` : null;
}

/**
 * Builds the ARR-scaled impact line for a retention pillar.
 *
 * @param scaledLine - the template sentence from scorecard.json, containing
 *                     the tokens {band} and {recovery} to be filled.
 * @param arrId      - the user's ARR band id (e.g. "20_50m").
 * @returns the rendered sentence, or null if ARR is missing/unmapped so the
 *          caller can fall back to the generic static text.
 */
export function renderScaledImpact(
  scaledLine: string,
  arrId: string | undefined
): string | null {
  if (!arrId) return null;
  const range = ARR_IMPACT[arrId];
  if (!range) return null;
  return scaledLine
    .replace("{band}", range.bandLabel)
    .replace("{recovery}", range.recovery);
}

