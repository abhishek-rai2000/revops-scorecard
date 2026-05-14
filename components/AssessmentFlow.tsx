"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
} from "@/lib/types";

type Step =
  | { kind: "context"; index: number }
  | { kind: "question"; pillarIndex: number; questionIndex: number }
  | { kind: "email" };

const AUTO_ADVANCE_DELAY_MS = 450;

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
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, []);

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
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    if (stepIndex < allSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const goBack = () => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const scheduleAutoAdvance = () => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    autoAdvanceTimer.current = setTimeout(() => {
      goNext();
    }, AUTO_ADVANCE_DELAY_MS);
  };

  const handleEmailSubmit = (lead: LeadInfo) => {
    const payload = {
      lead,
      context: contextResponses,
      responses: questionResponses,
      submittedAt: new Date().toISOString(),
    };
    sessionStorage.setItem("scorecard_submission", JSON.stringify(payload));

    router.push("/results");

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silent: results page already loads from sessionStorage.
    });
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
            current={
              currentStep?.kind === "context"
                ? currentStep.index + 1
                : currentStep?.kind === "question"
                ? currentStep.pillarIndex * 3 + currentStep.questionIndex + 1
                : scorecard.meta.questionCount
            }
            total={
              currentStep?.kind === "context"
                ? scorecard.context.length
                : currentStep?.kind === "question"
                ? scorecard.meta.questionCount
                : scorecard.meta.questionCount
            }
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
              onChange={(value) => {
                setContextResponses({
                  ...contextResponses,
                  [scorecard.context[currentStep.index].id]: value,
                });
                scheduleAutoAdvance();
              }}
            />
          )}

          {currentStep?.kind === "question" && (
            <RenderQuestion
              key={`q-${currentStep.pillarIndex}-${currentStep.questionIndex}`}
              pillarIndex={currentStep.pillarIndex}
              questionIndex={currentStep.questionIndex}
              responses={questionResponses}
              onChange={(qid, value, autoAdvance) => {
                setQuestionResponses({ ...questionResponses, [qid]: value });
                if (autoAdvance) {
                  scheduleAutoAdvance();
                }
              }}
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
              className="btn-ghost disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <span aria-hidden>←</span> Back
            </button>

            <button
              onClick={goNext}
              disabled={!isCurrentAnswered}
              className="btn-primary disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-ink-900"
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
  onChange: (qid: string, value: string | string[], autoAdvance: boolean) => void;
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
      onChange={(value) => {
        const shouldAutoAdvance = question.type === "single_select";
        onChange(question.id, value, shouldAutoAdvance);
      }}
    />
  );
}


