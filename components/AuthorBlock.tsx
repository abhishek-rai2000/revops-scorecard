import { siteConfig } from "@/lib/siteConfig";

type AuthorBlockProps = {
  variant?: "full" | "compact";
  className?: string;
};

/**
 * AuthorBlock — the visible author-credential component.
 * Reads identity from siteConfig (single source of truth).
 * Person schema is injected separately in layout.tsx (Step 1.4).
 *
 * variant="full"    -> dedicated pages (methodology, faq, guides)
 * variant="compact" -> inline use (results pages, footers)
 */
export function AuthorBlock({
  variant = "full",
  className = "",
}: AuthorBlockProps) {
  const { author } = siteConfig;

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-4 p-5 bg-parchment-200/50 border border-ink-900/10 rounded-lg ${className}`}
      >
        <div
          className="w-10 h-10 rounded-full bg-ember-600/10 border border-ember-600/30 flex items-center justify-center flex-shrink-0"
          aria-hidden
        >
          <span className="font-display text-ember-700 text-lg">
            {author.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-display text-ink-900 text-[15px] leading-tight">
            {author.name}
          </p>
          <p className="text-caption truncate">{author.shortBio}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 lg:p-8 bg-parchment-200/50 border border-ink-900/10 rounded-lg ${className}`}
    >
      <p className="text-eyebrow mb-4">About the author</p>

      <div className="flex items-start gap-5">
        <div
          className="w-14 h-14 rounded-full bg-ember-600/10 border border-ember-600/30 flex items-center justify-center flex-shrink-0"
          aria-hidden
        >
          <span className="font-display text-ember-700 text-2xl">
            {author.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="font-display text-xl text-ink-900 mb-1">
            {author.name}
          </h3>
          <p className="text-caption mb-4">{author.role}</p>

          <p className="text-ink-700 leading-relaxed text-[15px] mb-5 max-w-prose">
            {author.bio}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            
              <a href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-1.5 text-ember-700 hover:text-ember-600 transition-colors"
            >
              LinkedIn
              <span aria-hidden className="text-xs">↗</span>
            </a>
            
              <a href={author.portfolio}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-1.5 text-ember-700 hover:text-ember-600 transition-colors"
            >
              Portfolio
              <span aria-hidden className="text-xs">↗</span>
            </a>
            
              <a href={`mailto:${author.email}`}
              className="inline-flex items-center gap-1.5 text-ink-600 hover:text-ember-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

