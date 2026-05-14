"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { scorecard } from "@/lib/content";
import { ProgressBar } from "./ProgressBar";
import { ContextStep } from "./ContextStep";
import { QuestionCard } from "./QuestionCard";
import { EmailGate, type LeadInfo } from "./EmailGate";
import type {
  ContextResponses,
  QuestionResponses,
  Question,
} from "@/lib/types";

type Step =
  | { kind: "context"; index: number }
  | { kind: "question"; pillarIndex: number; questionIndex: number }
  | { kind: "email" };

export function AssessmentFlow() {
  const router = useRouter();

  const [contextResponses, setContextResponses] = useState<ContextResponses>({});
  const [questionResponses, setQuestionResponses] = useState<QuestionResponses>({});

  const allSteps = useMemo<Step[]>(() => {
    const steps: Step[] = [];
    scorecard.context.forEach((_, i) => steps.push({ kind: "context", index: i }));
    scorecard.pillars.forEach((pillar, pi) => {
      pillar.questions.forEach((_, qi) => {
        steps.push({ kind: "question", pillarIndex: pi, questionIndex: qi });
      });
    });
    steps.push({ kind: "email" });
    return steps;
  }, []);

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = allSteps[stepIndex];

  const totalProgressSteps = allSteps.length - 1;

  const isCurrentAnswered = useMemo(() => {
    if (!currentStep) return false;
    if (currentStep.kind === "context") {
      const ctx = scorecard.context[currentStep.index];
      return Boolean(contextResponses[ctx.id]);
    }
    if (currentStep.kind === "question") {
      const q =
        scorecard.pillars[currentStep.pillarIndex].questions[currentStep.questionIndex];
      const r = questionResponses[q.id];
      if (q.type === "single_select") return typeof r === "string" && r.length > 0;
      if (q.type === "multi_select") return Array.isArray(r);
    }
    return true;
  }, [currentStep, contextResponses, questionResponses]);

  const goNext = () => {
    if (stepIndex < allSteps.length - 1) {
      setStepIndex(stepIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEmailSubmit = (lead: LeadInfo) => {
    const payload = {
      lead,
      context: contextResponses,
      responses: questionResponses,
      submittedAt: new Date().toISOString(),
    };
    sessionStorage.setItem("scorecard_submission", JSON.stringify(payload));

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silent failure — results still load from sessionStorage.
      // Server-side persistence is best-effort in v1.
    });

    router.push("/results");
  };

  return (
    <main className="min-h-screen bg-parchment-100">
      <header className="px-6 lg:px-12 py-6 max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ember-600" aria-hidden />
          <span className="font-display text-lg tracking-tight text-ink-900">
            RevOps Scorecard
          </span>
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-6 pb-20">
        <div className="mb-12">
          <ProgressBar
            current={Math.min(stepIndex + 1, totalProgressSteps)}
            total={totalProgressSteps}
            label={
              currentStep?.kind === "context"
                ? "Context"
                : currentStep?.kind === "question"
                ? "Diagnostic"
                : "Final step"
            }
          />
        </div>

        <div className="min-h-[400px]">
          {currentStep?.kind === "context" && (
            <ContextStep
              key={`context-${currentStep.index}`}
              question={scorecard.context[currentStep.index]}
              value={contextResponses[scorecard.context[currentStep.index].id]}
              onChange={(value) =>
                setContextResponses({
                  ...contextResponses,
                  [scorecard.context[currentStep.index].id]: value,
                })
              }
            />
          )}

          {currentStep?.kind === "question" && (
            <RenderQuestion
              key={`q-${currentStep.pillarIndex}-${currentStep.questionIndex}`}
              pillarIndex={currentStep.pillarIndex}
              questionIndex={currentStep.questionIndex}
              responses={questionResponses}
              onChange={(qid, value) =>
                setQuestionResponses({ ...questionResponses, [qid]: value })
              }
            />
          )}

          {currentStep?.kind === "email" && (
            <EmailGate onSubmit={handleEmailSubmit} />
          )}
        </div>

        {currentStep?.kind !== "email" && (
          <div className="mt-12 pt-8 border-t border-ink-900/10 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={stepIndex === 0}
              className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span aria-hidden>←</span> Back
            </button>

            <button
              onClick={goNext}
              disabled={!isCurrentAnswered}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-ink-900"
            >
              Continue
              <span aria-hidden>→</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function RenderQuestion({
  pillarIndex,
  questionIndex,
  responses,
  onChange,
}: {
  pillarIndex: number;
  questionIndex: number;
  responses: QuestionResponses;
  onChange: (qid: string, value: string | string[]) => void;
}) {
  const pillar = scorecard.pillars[pillarIndex];
  const question = pillar.questions[questionIndex];

  return (
    <QuestionCard
      question={question}
      pillarName={pillar.name}
      pillarNumber={pillarIndex + 1}
      questionInPillar={questionIndex + 1}
      value={responses[question.id]}
      onChange={(value) => onChange(question.id, value)}
    />
  );
}
