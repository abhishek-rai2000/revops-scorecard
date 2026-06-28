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

export type Recommendation = {
  title: string;
  body: string;
  firstStep: string;
  impact: string;
  timeToImplement: string;
};

export type PillarRecommendations = Record<TierId, Recommendation>;

export type Pillar = {
  id: string;
  name: string;
  shortName: string;
  weight: number;
  description: string;
  questions: Question[];
  recommendations: PillarRecommendations;
};

export type GrrCommentaryKey = "below_80" | "80_90" | "90_95" | "95_plus";

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
  grrCommentary: Record<GrrCommentaryKey, string>;
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

