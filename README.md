# RevOps Health Scorecard

A free 5-minute diagnostic that scores B2B SaaS operations across 6 weighted pillars and returns a personalised report with prioritised fixes. Built as a lead-gen tool for AI-augmented operations consulting.

Built by Abhishek Rai · [Portfolio](https://abhishek-rai-1.netlify.app)

---

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with a custom warm/editorial design system
- Recharts for the radar chart
- Pure JS scoring engine — zero API calls during the assessment
- Supabase + Resend will be wired in Day 4 (currently stubs)

---

## Quick start

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to see the landing page. Take the assessment at /scorecard.

To deploy to Vercel:

```bash
npx vercel
```

That's it. No env vars needed for the v1 (no-API) version. When you wire Supabase + Resend in Day 4, copy `.env.local.example` to `.env.local` and fill in the values.

---

## Project structure

```
revops-scorecard/
├── app/
│   ├── layout.tsx              Root layout with metadata
│   ├── page.tsx                Landing page (editorial hero)
│   ├── globals.css             Tailwind + custom typography
│   ├── scorecard/
│   │   └── page.tsx            Assessment flow shell
│   ├── results/
│   │   └── page.tsx            Results display shell
│   └── api/
│       └── submit/
│           └── route.ts        Submission endpoint (stub for Day 4)
├── components/
│   ├── AssessmentFlow.tsx      Main multi-step flow with state
│   ├── ContextStep.tsx         Context question UI
│   ├── QuestionCard.tsx        Single + multi-select question UI
│   ├── EmailGate.tsx           Lead capture before results
│   ├── ResultsView.tsx         Score + radar + priorities
│   ├── PillarRadar.tsx         Recharts radar chart
│   ├── PriorityCard.tsx        Top-3 priority recommendation card
│   └── ProgressBar.tsx         Linear progress indicator
├── content/
│   └── scorecard.json          ALL questions, weights, recommendations
├── lib/
│   ├── types.ts                TypeScript types
│   ├── scoring.ts              Pure scoring engine
│   └── content.ts              Content loader
├── public/                     Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts          Custom tokens (parchment, ink, ember, moss)
├── next.config.js
├── postcss.config.js
├── .env.local.example
└── .gitignore
```

---

## Editing the content

All scorecard content lives in `content/scorecard.json`. Editing this file changes the scorecard everywhere — questions, weights, recommendations, benchmark text. No code changes needed.

To change a recommendation: navigate to `pillars[id].recommendations[tier]` and edit. To change the weight of a pillar: edit `pillars[id].weight` (must sum to 1.0 across all pillars). To change tier boundaries: edit the `tiers` array.

---

## Scoring math

Each question scores 0, 3, 7, or 10 points (single-select) or 0, 4, 7, or 10 points (multi-select).

Each pillar has 3 questions = max 30 raw points per pillar.

Pillar percentage score = `(rawPoints / 30) × 100` → 0-100.

Final score is a weighted average:

```
Final = (Churn% × 0.25)
      + (SLA% × 0.15)
      + (Process% × 0.15)
      + (Automation% × 0.15)
      + (Data% × 0.15)
      + (Renewal% × 0.15)
```

Tier mapping:

| Score   | Tier        |
|---------|-------------|
| 0–40    | Critical    |
| 41–60   | At risk     |
| 61–80   | Functional  |
| 81–100  | Mature      |

The "top 3 priorities" are the three lowest-scoring pillars.

---


## License

MIT.
