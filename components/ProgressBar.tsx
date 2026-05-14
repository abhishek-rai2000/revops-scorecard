"use client";

type Props = {
  current: number;
  total: number;
  label?: string;
};

export function ProgressBar({ current, total, label }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-eyebrow">{label || "Progress"}</p>
        <p className="text-xs text-ink-500 font-medium tabular-nums">
          {current} <span className="text-ink-400">of</span> {total}
        </p>
      </div>
      <div className="h-[2px] bg-ink-900/[0.08] relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-ember-600 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
