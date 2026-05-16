import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { scorecard } from "@/lib/content";
import { calculateScore } from "@/lib/scoring";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generateSlug(name: string): string {
  const firstName = name.trim().split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toLowerCase();
  const year = now.getUTCFullYear();
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${firstName}-${day}${month}${year}-${suffix}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lead, context, responses } = body;

    if (!lead?.email || !lead?.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = calculateScore(scorecard, responses);
    const publicId = crypto.randomUUID();
    const slug = generateSlug(lead.name);

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
      });

    if (dbError) {
      console.error("[supabase:insert:error]", dbError);
    }

    const topPillarNames = result.topPriorities
      .map((p) => p.name)
      .join(", ");

    const resultsUrl = `https://getrevscore.vercel.app/results/${slug}`;

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: lead.email,
      subject: `Your RevOps Health Score: ${result.totalScore}/100 — ${result.tier.label}`,
      html: buildEmailHtml({
        slug,
        resultsUrl,
        name: lead.name,
        score: result.totalScore,
        tier: result.tier.label,
        tierFraming: result.tier.framing,
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
      }),
    });

    if (emailError) {
      console.error("[resend:send:error]", emailError);
    }

    return NextResponse.json({
      ok: true,
      score: result.totalScore,
      tier: result.tier.id,
      slug,
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
  topPillarNames,
  priorities,
}: {
  slug: string;
  resultsUrl: string;
  name: string;
  score: number;
  tier: string;
  tierFraming: string;
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
    tier === "Critical"
      ? "#C2410C"
      : tier === "At risk"
      ? "#D86727"
      : tier === "Functional"
      ? "#3A372E"
      : "#3B5128";

  const priorityBlocks = priorities
    .map(
      (p, i) => `
    <tr>
      <td style="padding: 20px 0; border-bottom: 1px solid #EFE9DD;">
        <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #C2410C;">
          Priority ${i + 1} · ${p.name} · ${p.score}/100
        </p>
        <p style="margin: 0 0 10px; font-size: 17px; font-weight: 500; color: #15140F; font-family: Georgia, serif;">
          ${p.title}
        </p>
        <p style="margin: 0 0 8px; font-size: 13px; color: #5C5749; line-height: 1.6;">
          <strong style="color: #15140F;">First step:</strong> ${p.firstStep}
        </p>
        <p style="margin: 0; font-size: 13px; color: #5C5749;">
          <strong style="color: #15140F;">Estimated impact:</strong> ${p.impact}
        </p>
      </td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #F7F4ED; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #F7F4ED; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <tr>
            <td style="padding: 0 0 32px;">
              <span style="display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; color: #15140F;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #C2410C;"></span>
                RevOps Scorecard
              </span>
            </td>
          </tr>
          <tr>
            <td style="background: #FBF8F1; border: 1px solid #E3D9C4; border-radius: 8px; padding: 40px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C2410C;">
                Your scorecard, ${name.trim().split(" ")[0].toUpperCase()}
              </p>
              <p style="margin: 0 0 4px; font-size: 14px; color: #7E7867;">Total score</p>
              <p style="margin: 0 0 16px; font-size: 56px; font-weight: 300; color: #15140F; font-family: Georgia, serif; line-height: 1;">
                ${score}<span style="font-size: 24px; color: #A39C88;">/100</span>
              </p>
              <p style="margin: 0 0 24px; display: inline-block; padding: 6px 14px; background: #FDF4EC; border: 1px solid rgba(194,65,12,0.3); border-radius: 20px; font-size: 13px; font-weight: 500; color: ${tierColor};">
                ${tier}
              </p>
              <p style="margin: 0 0 32px; font-size: 15px; color: #3A372E; line-height: 1.7; border-left: 2px solid #C2410C; padding-left: 16px;">
                ${tierFraming}
              </p>
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #7E7867;">
                Top 3 priorities
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; color: #5C5749;">
                Your lowest-scoring pillars: <strong style="color: #15140F;">${topPillarNames}</strong>
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${priorityBlocks}
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td style="background: #15140F; border-radius: 6px; text-align: center; padding: 14px 24px;">
                    <a href="${resultsUrl}" style="color: #FBF8F1; font-size: 14px; font-weight: 500; text-decoration: none;">
                      View your full results →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0 0; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 12px; color: #A39C88;">
                Built by Abhishek Rai ·
                <a href="https://abhishek-rai-1.netlify.app" style="color: #A39C88;">Portfolio</a> ·
                <a href="mailto:abhishek.k0420@gmail.com" style="color: #A39C88;">Mail</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #A39C88;">
                You're receiving this because you completed the RevOps Health Scorecard.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

