"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { PillarScore } from "@/lib/types";

type Props = {
  pillarScores: PillarScore[];
};

export function PillarRadar({ pillarScores }: Props) {
  const data = pillarScores.map((p) => ({
    pillar: p.shortName,
    score: p.percentageScore,
    fullName: p.name,
  }));

  return (
    <div className="w-full h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
          <PolarGrid
            stroke="rgba(21, 20, 15, 0.12)"
            strokeWidth={0.5}
          />
          <PolarAngleAxis
            dataKey="pillar"
            tick={{
              fill: "#3A372E",
              fontSize: 12,
              fontFamily: "General Sans, system-ui, sans-serif",
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickCount={5}
            tick={{
              fill: "#A39C88",
              fontSize: 10,
              fontFamily: "General Sans, system-ui, sans-serif",
            }}
            stroke="rgba(21, 20, 15, 0.08)"
          />
          <Radar
            dataKey="score"
            stroke="#C2410C"
            strokeWidth={1.5}
            fill="#C2410C"
            fillOpacity={0.18}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
