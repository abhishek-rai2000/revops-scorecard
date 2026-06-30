import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | RevOps Health Scorecard",
  description: "How RevOps Scorecard collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-parchment-100">
      <header className="px-6 lg:px-12 py-6 max-w-canvas mx-auto">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ember-800" aria-hidden />
          <span className="font-display text-lg tracking-tight text-ink-900">
            RevOps Scorecard
          </span>
        </Link>
      </header>

      <section className="px-6 lg:px-12 max-w-narrow mx-auto pt-16 pb-24">
        <p className="text-eyebrow mb-4">Legal</p>
        <h1 className="font-display text-display-lg text-ink-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-caption mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-ink-700 leading-relaxed">

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">What this is</h2>
            <p>
              RevOps Health Scorecard is a free diagnostic tool for B2B SaaS
              operations leaders. It asks 18 diagnostic questions plus a few
              questions about your company, and returns a personalised report.
              This policy explains what data we collect when you use it and how
              we handle it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">What we collect</h2>
            <p className="mb-4">When you complete the scorecard, we collect:</p>
            <ul className="space-y-2 pl-4 list-disc list-outside text-ink-700">
              <li>Your name, work email address, and job role — entered at the email gate</li>
              <li>Your company context — stage, team size, ARR band, and GTM motion</li>
              <li>Your answers to the 18 diagnostic questions</li>
              <li>Your total score, tier, and pillar scores — calculated from your answers</li>
              <li>The AI-generated narrative produced for your specific result</li>
              <li>The date and time of your submission</li>
            </ul>
            <p className="mt-4">
              We do not collect payment information, IP addresses in our database,
              or any information beyond what you provide in the assessment.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">How we use it</h2>
            <p className="mb-4">Your data is used for three purposes:</p>
            <ul className="space-y-2 pl-4 list-disc list-outside text-ink-700">
              <li>
                To generate and deliver your personalised results report by email
              </li>
              <li>
                To create a permanent link to your results page that you can
                revisit or share
              </li>
              <li>
                To allow us to follow up if you request a walkthrough session
              </li>
            </ul>
            <p className="mt-4">
              We do not use your data for advertising, profiling, or any
              automated decision-making beyond generating your scorecard result.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">Where it is stored</h2>
            <p>
              Your submission data is stored in a secured Supabase database.
              Access is restricted — your data is never directly accessible from
              the browser.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">
              Third parties we use
            </h2>
            <ul className="space-y-3 pl-4 list-disc list-outside text-ink-700">
              <li>
                <strong className="text-ink-900">Supabase</strong> — database
                storage. Your submission data is written to Supabase and read
                back when you access your results link.
              </li>
              <li>
                <strong className="text-ink-900">Brevo</strong> — email
                delivery. Your email address and report content are passed to
                Brevo to send your results email.
              </li>
              <li>
                <strong className="text-ink-900">Groq</strong> — AI narrative
                generation. Your score, tier, stage, ARR, and GTM motion are
                passed to the Groq API to generate your personalised
                {" consultant's "} read. No personally identifiable information
                (name or email) is sent to Groq.
              </li>
              <li>
                <strong className="text-ink-900">Vercel</strong> — hosting and
                deployment. Your requests are served through {"Vercel's"}{" "}
                infrastructure.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your data to any third party. We do not share your
              data with anyone beyond the services listed above, and only for
              the purposes described.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">
              How long we keep it
            </h2>
            <p>
              We retain your submission data for as long as your results link
              remains active. If you would like your data deleted, email us and
              we will remove your record within 7 days.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">Your rights</h2>
            <p>
              You can request a copy of your data, correction of inaccurate
              data, or deletion of your data at any time by emailing{" "}
              
               <a href="mailto:abhishek.k0420@gmail.com"
                className="text-ember-600 hover:underline"
              >
                abhishek.k0420@gmail.com
              </a>
              . We will respond within 7 days.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">Contact</h2>
            <p>
              This tool is operated by Abhishek Rai. For any questions about
              this policy or your data, contact{" "}
              
               <a href="mailto:abhishek.k0420@gmail.com"
                className="text-ember-600 hover:underline"
              >
                abhishek.k0420@gmail.com
              </a>
              .
            </p>
          </div>

        </div>
      </section>

      <footer className="border-t border-ink-900/10">
        <div className="max-w-canvas mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
          <p className="text-caption">RevOps Scorecard</p>

          <a href={siteConfig.author.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ember-600 transition-colors"
                    >
                      Portfolio
                    </a>

          <Link href="/" className="text-caption hover:text-ember-600 transition-colors">
            Back to home
          </Link>
        </div>
      </footer>
    </main>
  );
}

