import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Groq from "groq-sdk";
import { scorecard } from "@/lib/content";
import { calculateScore } from "@/lib/scoring";
import type { ScoreResult } from "@/lib/types";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function generateSlug(name: string): string {
  const firstName = name.trim().split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toLowerCase();
  const year = now.getUTCFullYear();
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${firstName}-${day}${month}${year}-${suffix}`;
}

async function generateNarrative(
  result: ScoreResult,
  context: Record<string, string>,
  role: string
): Promise<string> {
  const pillarSummary = result.pillarScores
    .map((p) => `${p.name}: ${p.percentageScore}/100`)
    .join(", ");

  const weakest = result.topPriorities.map((p) => p.name).join(", ");
  const stage = context?.stage || "unknown stage";
  const arr = context?.arr || "unknown ARR";
  const motion = context?.motion || "unknown motion";

  const prompt = `You are a senior revenue operations consultant writing a personalised diagnostic summary.

The person who completed this scorecard:
- Role: ${role}
- Company stage: ${stage}
- ARR band: ${arr}
- GTM motion: ${motion}
- Total score: ${result.totalScore}/100 (tier: ${result.tier.label})
- Pillar scores: ${pillarSummary}
- Weakest pillars: ${weakest}

Write exactly 3 short paragraphs (2-3 sentences each). No headers. No bullet points. No markdown.

Paragraph 1: What this score tells you about the state of their revenue operations right now. Reference their specific tier and what it means at their stage. Be direct, not reassuring.

Paragraph 2: The pattern you see in their specific pillar scores. Why the weakest pillars are connected. What the root cause likely is. Reference the actual pillar names.

Paragraph 3: The single most important thing to fix first and why it unlocks everything else. Be specific and actionable. End with one sentence about what becomes possible when this is fixed.

Tone: direct, expert, no jargon, no filler phrases like "it's worth noting" or "it's important to". Write like a consultant who has seen this exact pattern before.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 350,
    temperature: 0.4,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}

function getStaticNarrative(result: ScoreResult): string {
  const weakest = result.topPriorities.map((p) => p.name).join(", ");
  return `Your score of ${result.totalScore}/100 places you in the ${result.tier.label} tier — ${result.tier.framing.toLowerCase()} The pattern in your results points to gaps in ${weakest}, which are compounding each other. Fixing the lowest-scoring pillar first will create the most leverage across your entire ops system.`;
}

async function sendEmail(
  to: string,
  toName: string,
  subject: string,
  html: string
) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_FROM_NAME || "Abhishek Rai",
        email: process.env.BREVO_FROM_EMAIL!,
      },
      to: [{ email: to, name: toName }],
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo error: ${err}`);
  }
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lead, context, responses } = body;

    if (!lead?.email || !lead?.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = calculateScore(scorecard, responses);
    const publicId = crypto.randomUUID();
    const slug = generateSlug(lead.name);

    let aiNarrative = "";
    try {
      aiNarrative = await generateNarrative(result, context, lead.role);
    } catch (groqError) {
      console.error("[groq:error]", groqError);
      aiNarrative = getStaticNarrative(result);
    }

    const { error: dbError } = await supabase
      .from("scorecard_submissions")
      .insert({
        public_id: publicId,
        slug,
        name: lead.name,
        email: lead.email,
        role: lead.role,
        stage: context?.stage || null,
        team_size: context?.team_size || null,
        arr: context?.arr || null,
        motion: context?.motion || null,
        total_score: result.totalScore,
        tier: result.tier.id,
        pillar_scores: result.pillarScores,
        responses: responses,
        ai_narrative: aiNarrative,
      });

    if (dbError) {
      console.error("[supabase:insert:error]", dbError);
    }

    const topPillarNames = result.topPriorities.map((p) => p.name).join(", ");
    const resultsUrl = `https://getrevscore.vercel.app/results/${slug}`;

    try {
      await sendEmail(
        lead.email,
        lead.name,
        `Your RevOps Health Score: ${result.totalScore}/100 — ${result.tier.label}`,
        buildEmailHtml({
          slug,
          resultsUrl,
          name: lead.name,
          score: result.totalScore,
          tier: result.tier.label,
          tierFraming: result.tier.framing,
          aiNarrative,
          topPillarNames,
          priorities: result.topPriorities.map((p) => {
            const pillar = scorecard.pillars.find((pl) => pl.id === p.id)!;
            const rec = pillar.recommendations[p.tier];
            return {
              name: p.name,
              score: p.percentageScore,
              title: rec.title,
              firstStep: rec.firstStep,
              impact: rec.impact,
            };
          }),
        })
      );
    } catch (emailError) {
      console.error("[brevo:send:error]", emailError);
    }

    return NextResponse.json({
      ok: true,
      score: result.totalScore,
      tier: result.tier.id,
      slug,
      aiNarrative,
    });
  } catch (error) {
    console.error("[submit:error]", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

function buildEmailHtml({
  resultsUrl,
  name,
  score,
  tier,
  tierFraming,
  aiNarrative,
  topPillarNames,
  priorities,
}: {
  slug: string;
  resultsUrl: string;
  name: string;
  score: number;
  tier: string;
  tierFraming: string;
  aiNarrative: string;
  topPillarNames: string;
  priorities: {
    name: string;
    score: number;
    title: string;
    firstStep: string;
    impact: string;
  }[];
}): string {
  const tierColor =
    tier === "Critical" ? "#C2410C"
    : tier === "At risk" ? "#D86727"
    : tier === "Functional" ? "#3A372E"
    : "#3B5128";

  const priorityBlocks = priorities
    .map(
      (p, i) => `
    <tr>
      <td style="padding:20px 0;border-bottom:1px solid #EFE9DD;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#C2410C;">
          Priority ${i + 1} · ${p.name} · ${p.score}/100
        </p>
        <p style="margin:0 0 10px;font-size:17px;font-weight:500;color:#15140F;font-family:Georgia,serif;">
          ${p.title}
        </p>
        <p style="margin:0 0 8px;font-size:13px;color:#5C5749;line-height:1.6;">
          <strong style="color:#15140F;">First step:</strong> ${p.firstStep}
        </p>
        <p style="margin:0;font-size:13px;color:#5C5749;">
          <strong style="color:#15140F;">Estimated impact:</strong> ${p.impact}
        </p>
      </td>
    </tr>`
    )
    .join("");

  const narrativeBlock = aiNarrative
    ? `<p style="margin:0 0 32px;font-size:14px;color:#3A372E;line-height:1.8;white-space:pre-line;">${aiNarrative}</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F7F4ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4ED;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:0 0 32px;">
          <span style="font-size:15px;font-weight:500;color:#15140F;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#C2410C;margin-right:8px;"></span>
            RevOps Scorecard
          </span>
        </td></tr>
        <tr><td style="background:#FBF8F1;border:1px solid #E3D9C4;border-radius:8px;padding:40px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;">
            Your scorecard, ${name.trim().split(" ")[0].toUpperCase()}
          </p>
          <p style="margin:0 0 4px;font-size:14px;color:#7E7867;">Total score</p>
          <p style="margin:0 0 16px;font-size:56px;font-weight:300;color:#15140F;font-family:Georgia,serif;line-height:1;">
            ${score}<span style="font-size:24px;color:#A39C88;">/100</span>
          </p>
          <p style="margin:0 0 32px;display:inline-block;padding:6px 14px;background:#FDF4EC;border:1px solid rgba(194,65,12,0.3);border-radius:20px;font-size:13px;font-weight:500;color:${tierColor};">
            ${tier}
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#3A372E;line-height:1.7;border-left:2px solid #C2410C;padding-left:16px;">
            ${tierFraming}
          </p>
          ${narrativeBlock}
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#7E7867;">Top 3 priorities</p>
          <p style="margin:0 0 24px;font-size:14px;color:#5C5749;">
            Your lowest-scoring pillars: <strong style="color:#15140F;">${topPillarNames}</strong>
          </p>
          <table width="100%" cellpadding="0" cellspacing="0">${priorityBlocks}</table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
            <tr><td style="background:#15140F;border-radius:6px;text-align:center;padding:14px 24px;">
              <a href="${resultsUrl}" style="color:#FBF8F1;font-size:14px;font-weight:500;text-decoration:none;">
                View your full results →
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#A39C88;">
            Built by Abhishek Rai ·
            <a href="https://abhishek-rai-1.netlify.app" style="color:#A39C88;">Portfolio</a> ·
            <a href="mailto:abhishek.k0420@gmail.com" style="color:#A39C88;">Mail</a>
          </p>
          <p style="margin:0;font-size:11px;color:#A39C88;">
            You're receiving this because you completed the RevOps Health Scorecard.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}


