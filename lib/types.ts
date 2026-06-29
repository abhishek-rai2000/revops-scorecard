export type TierId = "critical" | "at_risk" | "functional" | "mature";

export type Tier = {
  id: TierId;
  label: string;
  min: number;
  max: number;
  framing: string;
};

export type ContextOption = {
  id: string;
  label: string;
};

export type ContextQuestion = {
  id: string;
  label: string;
  options: ContextOption[];
};

export type SingleSelectOption = {
  id: string;
  label: string;
  points: number;
};

export type MultiSelectOption = {
  id: string;
  label: string;
};

export type MultiSelectScoring = {
  minSelected: number;
  maxSelected: number;
  points: number;
};

export type SingleSelectQuestion = {
  id: string;
  type: "single_select";
  text: string;
  options: SingleSelectOption[];
};

export type MultiSelectQuestion = {
  id: string;
  type: "multi_select";
  text: string;
  options: MultiSelectOption[];
  scoring: MultiSelectScoring[];
};

export type Question = SingleSelectQuestion | MultiSelectQuestion;

// Impact is either size-neutral static text (operational pillars) or an
// ARR-scaled figure (retention pillars: churn, renewal). The scaledLine
// template uses {band} and {recovery} tokens filled at render time.
export type StaticImpact = {
  type: "static";
  text: string;
};

export type ScaledImpact = {
  type: "arrScaled";
  text: string; // generic fallback shown when ARR is missing
  scaledLine: string; // template with {band} and {recovery} tokens
};

export type RecommendationImpact = StaticImpact | ScaledImpact;

export type Recommendation = {
  title: string;
  body: string;
  firstStep: string;
  impact: RecommendationImpact;
  timeToImplement: string;
};

export type PillarRecommendations = Record<TierId, Recommendation>;

export type Pillar = {
  id: string;
  name: string;
  shortName: string;
  weight: number;
  description: string;
  whyWeAsk: string;
  questions: Question[];
  recommendations: PillarRecommendations;
};

export type GrrCommentaryKey = "below_80" | "80_90" | "90_95" | "95_plus";

// Four operational states based on which retention pillars are weak.
export type GrrSupportState =
  | "supported"
  | "churn_weak"
  | "renewal_weak"
  | "both_weak";

// The GRR commentary is composed at runtime from three parts:
//   opening (per GRR band) + clause (per support state) + closer (per band, supported vs not)
export type GrrBandCommentary = {
  opening: string;
  clauses: Record<GrrSupportState, string>;
  closerSupported: string;
  closerUnsupported: string;
};

export type Scorecard = {
  version: string;
  meta: {
    title: string;
    subtitle: string;
    estimatedMinutes: number;
    questionCount: number;
    pillarCount: number;
  };
  tiers: Tier[];
  context: ContextQuestion[];
  pillars: Pillar[];
  grrCommentary: Record<GrrCommentaryKey, GrrBandCommentary>;
};

export type ContextResponses = Record<string, string>;
export type SingleSelectResponse = string;
export type MultiSelectResponse = string[];
export type QuestionResponse = SingleSelectResponse | MultiSelectResponse;
export type QuestionResponses = Record<string, QuestionResponse>;

export type PillarScore = {
  id: string;
  name: string;
  shortName: string;
  weight: number;
  rawPoints: number;
  maxRawPoints: number;
  percentageScore: number;
  weightedContribution: number;
  tier: TierId;
};

export type ScoreResult = {
  totalScore: number;
  tier: Tier;
  pillarScores: PillarScore[];
  topPriorities: PillarScore[];
  grrCommentary: string | null;
};

