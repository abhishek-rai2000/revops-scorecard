import { NextResponse } from "next/server";
import { scorecard } from "@/lib/content";
import { calculateScore } from "@/lib/scoring";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lead, context, responses } = body;

    if (!lead?.email || !lead?.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = calculateScore(scorecard, responses);

    if (process.env.NODE_ENV === "development") {
      console.log("[scorecard:submission]", {
        email: lead.email,
        name: lead.name,
        role: lead.role,
        totalScore: result.totalScore,
        tier: result.tier.id,
        context,
        submittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      ok: true,
      score: result.totalScore,
      tier: result.tier.id,
    });
  } catch (error) {
    console.error("[scorecard:submission:error]", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

