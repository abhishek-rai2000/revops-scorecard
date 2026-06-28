import type {
  Scorecard,
  Pillar,
  Question,
  QuestionResponses,
  PillarScore,
  ScoreResult,
  Tier,
  TierId,
  GrrCommentaryKey,
  GrrSupportState,
} from "./types";

const MAX_POINTS_PER_QUESTION = 10;
const QUESTIONS_PER_PILLAR = 3;
const MAX_POINTS_PER_PILLAR = MAX_POINTS_PER_QUESTION * QUESTIONS_PER_PILLAR;

export function scoreQuestion(
  question: Question,
  response: string | string[] | undefined
): number {
  if (response === undefined || response === null) return 0;

  if (question.type === "single_select") {
    if (typeof response !== "string") return 0;
    const option = question.options.find((opt) => opt.id === response);
    return option ? option.points : 0;
  }

  if (question.type === "multi_select") {
    if (!Array.isArray(response)) return 0;
    const validIds = new Set(question.options.map((opt) => opt.id));
    const validSelections = response.filter((id) => validIds.has(id));
    const count = validSelections.length;
    const matchingTier = question.scoring.find(
      (tier) => count >= tier.minSelected && count <= tier.maxSelected
    );
    return matchingTier ? matchingTier.points : 0;
  }

  return 0;
}

export function scorePillar(pillar: Pillar, responses: QuestionResponses): PillarScore {
  const rawPoints = pillar.questions.reduce((total, question) => {
    return total + scoreQuestion(question, responses[question.id]);
  }, 0);

  const percentageScore = Math.round((rawPoints / MAX_POINTS_PER_PILLAR) * 100);
  const weightedContribution = percentageScore * pillar.weight;
  const tier = getTierForScore(percentageScore);

  return {
    id: pillar.id,
    name: pillar.name,
    shortName: pillar.shortName,
    weight: pillar.weight,
    rawPoints,
    maxRawPoints: MAX_POINTS_PER_PILLAR,
    percentageScore,
    weightedContribution,
    tier,
  };
}

export function getTierForScore(score: number): TierId {
  if (score <= 40) return "critical";
  if (score <= 60) return "at_risk";
  if (score <= 80) return "functional";
  return "mature";
}

export function getTierObject(scorecard: Scorecard, tierId: TierId): Tier {
  const tier = scorecard.tiers.find((t) => t.id === tierId);
  if (!tier) throw new Error(`Unknown tier: ${tierId}`);
  return tier;
}

export function getGrrCommentaryKey(grrResponse: string | undefined): GrrCommentaryKey | null {
  if (!grrResponse) return null;
  const map: Record<string, GrrCommentaryKey> = {
    a: "below_80",
    b: "80_90",
    c: "90_95",
    d: "95_plus",
  };
  return map[grrResponse] || null;
}

/**
 * Determines whether the reported GRR is "operationally supported."
 * GRR durability depends on BOTH seeing churn coming (churn pillar) AND
 * running a renewal/expansion motion (renewal pillar). If either is weak
 * (below the functional threshold of 61), the reported retention rests on
 * fragile foundations and is flagged as unsupported.
 */
export function getGrrSupportState(pillarScores: PillarScore[]): GrrSupportState {
  const churn = pillarScores.find((p) => p.id === "churn");
  const renewal = pillarScores.find((p) => p.id === "renewal");

  const churnOk = (churn?.percentageScore ?? 0) >= 61;
  const renewalOk = (renewal?.percentageScore ?? 0) >= 61;

  return churnOk && renewalOk ? "supported" : "unsupported";
}

export function calculateScore(
  scorecard: Scorecard,
  responses: QuestionResponses
): ScoreResult {
  const pillarScores = scorecard.pillars.map((pillar) =>
    scorePillar(pillar, responses)
  );

  const totalScore = Math.round(
    pillarScores.reduce((sum, p) => sum + p.weightedContribution, 0)
  );

  const totalTierId = getTierForScore(totalScore);
  const totalTier = getTierObject(scorecard, totalTierId);

  const topPriorities = [...pillarScores]
    .sort((a, b) => a.percentageScore - b.percentageScore)
    .slice(0, 3);

  const grrKey = getGrrCommentaryKey(responses["q18"] as string | undefined);
  const grrSupport = getGrrSupportState(pillarScores);
  const grrCommentary = grrKey
    ? scorecard.grrCommentary[grrKey][grrSupport]
    : null;

  return {
    totalScore,
    tier: totalTier,
    pillarScores,
    topPriorities,
    grrCommentary,
  };
}

export function isResponseSetComplete(
  scorecard: Scorecard,
  responses: QuestionResponses
): boolean {
  for (const pillar of scorecard.pillars) {
    for (const question of pillar.questions) {
      const r = responses[question.id];
      if (question.type === "single_select" && (typeof r !== "string" || !r)) {
        return false;
      }
      if (question.type === "multi_select" && !Array.isArray(r)) {
        return false;
      }
    }
  }
  return true;
}

export function getAllQuestions(scorecard: Scorecard): Question[] {
  return scorecard.pillars.flatMap((p) => p.questions);
}

