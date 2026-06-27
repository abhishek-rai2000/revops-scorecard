import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

type SourcesStripProps = {
  variant?: "inline" | "full";
  className?: string;
};

/**
 * SourcesStrip — compact "benchmarked against named sources" component.
 * Replaces vague "latest industry data" with credible, dated sources.
 * Reads from siteConfig (single source of truth).
 */
export function SourcesStrip({
  variant = "inline",
  className = "",
}: SourcesStripProps) {
  const publishers = siteConfig.sources.map((s) => s.publisher);
  const uniquePublishers = Array.from(new Set(publishers));

  if (variant === "inline") {
    return (
      <p className={`text-caption ${className}`}>
        Benchmarked against{" "}
        <Link href="/methodology" className="text-ember-700 hover:text-ember-600 transition-colors">
          {uniquePublishers.join(", ")}
        </Link>{" "}
        · Last reviewed {siteConfig.benchmarksLastReviewed}
      </p>
    );
  }

  return (
    <div
      className={`p-5 lg:p-6 bg-parchment-200/50 border border-ink-900/10 rounded-lg ${className}`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-eyebrow">Benchmarked against</p>
        <span className="text-caption whitespace-nowrap">
          Reviewed {siteConfig.benchmarksLastReviewed}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1.5 mb-4">
        {uniquePublishers.map((publisher, i) => (
          <span key={publisher} className="text-ink-700 text-[15px]">
            {publisher}
            {i < uniquePublishers.length - 1 && (
              <span className="text-ink-400 ml-2" aria-hidden>
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      <Link
        href="/methodology"
        className="text-sm text-ember-700 hover:text-ember-600 transition-colors inline-flex items-center gap-1.5"
      >
        See the methodology
        <span aria-hidden className="text-xs">↗</span>
      </Link>
    </div>
  );
}

