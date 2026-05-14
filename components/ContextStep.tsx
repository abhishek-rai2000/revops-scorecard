"use client";

import type { ContextQuestion } from "@/lib/types";

type Props = {
  question: ContextQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
};

export function ContextStep({ question, value, onChange }: Props) {
  return (
    <div className="animate-fade-up">
      <p className="text-eyebrow mb-4">A bit about your company</p>
      <h2 className="font-display text-display-md text-ink-900 mb-10 leading-tight">
        {question.label}
      </h2>

      <div className="grid sm:grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={[
                "text-left px-5 py-4 rounded-md border transition-all duration-200",
                "hover:border-ink-900/40 hover:bg-parchment-50",
                isSelected
                  ? "border-ember-600 bg-ember-50 ring-1 ring-ember-600/20"
                  : "border-ink-900/15 bg-parchment-50",
              ].join(" ")}
            >
              <span className={isSelected ? "text-ink-900 font-medium" : "text-ink-700"}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
