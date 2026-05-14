"use client";

import type { Question } from "@/lib/types";

type Props = {
  question: Question;
  pillarName: string;
  pillarNumber: number;
  questionInPillar: number;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

export function QuestionCard({
  question,
  pillarName,
  pillarNumber,
  questionInPillar,
  value,
  onChange,
}: Props) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <p className="text-eyebrow">
          Pillar {pillarNumber} · {pillarName}
        </p>
        <span className="text-ink-600 text-xs font-medium tracking-wide">
          Q{questionInPillar} of 3
        </span>
      </div>

      <h2 className="font-display text-2xl lg:text-[2rem] leading-tight text-ink-900 mb-2">
        {question.text}
      </h2>

      {question.type === "multi_select" && (
        <p className="text-sm text-ink-500 mb-8 italic">
          Select all that apply.
        </p>
      )}

      {question.type === "single_select" && <div className="h-8" />}

      {question.type === "single_select" ? (
        <SingleSelect
          options={question.options}
          value={value as string | undefined}
          onChange={(v) => onChange(v)}
        />
      ) : (
        <MultiSelect
          options={question.options}
          value={(value as string[] | undefined) || []}
          onChange={(v) => onChange(v)}
        />
      )}
    </div>
  );
}

function SingleSelect({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={[
              "w-full text-left px-5 py-4 rounded-md border transition-all duration-200 group",
              "hover:border-ink-900/40 hover:bg-parchment-50",
              "active:scale-[0.995] active:bg-ember-50/50",
              isSelected
                ? "border-ember-600 bg-ember-50 ring-1 ring-ember-600/20 shadow-[0_0_0_3px_rgba(194,65,12,0.06)]"
                : "border-ink-900/15 bg-parchment-50",
            ].join(" ")}
          >
            <div className="flex items-start gap-4">
              <span
                className={[
                  "mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-150",
                  isSelected
                    ? "border-ember-600 bg-ember-600"
                    : "border-ink-400 bg-transparent group-hover:border-ink-600 group-active:scale-90",
                ].join(" ")}
              >
                {isSelected && (
                  <span className="block w-1.5 h-1.5 rounded-full bg-parchment-50 m-auto mt-[3px] animate-fade-in" />
                )}
              </span>
              <span
                className={[
                  "leading-relaxed text-[15px]",
                  isSelected ? "text-ink-900 font-medium" : "text-ink-700",
                ].join(" ")}
              >
                {option.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => toggle(option.id)}
            className={[
              "w-full text-left px-5 py-4 rounded-md border transition-all duration-200 group",
              "hover:border-ink-900/40 hover:bg-parchment-50",
              "active:scale-[0.995]",
              isSelected
                ? "border-ember-600 bg-ember-50 ring-1 ring-ember-600/20 shadow-[0_0_0_3px_rgba(194,65,12,0.06)]"
                : "border-ink-900/15 bg-parchment-50",
            ].join(" ")}
          >
            <div className="flex items-start gap-4">
              <span
                className={[
                  "mt-1 w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150",
                  isSelected
                    ? "border-ember-600 bg-ember-600"
                    : "border-ink-400 bg-transparent group-hover:border-ink-600 group-active:scale-90",
                ].join(" ")}
              >
                {isSelected && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-fade-in"
                  >
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="#FBF8F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={[
                  "leading-relaxed text-[15px]",
                  isSelected ? "text-ink-900 font-medium" : "text-ink-700",
                ].join(" ")}
              >
                {option.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}


