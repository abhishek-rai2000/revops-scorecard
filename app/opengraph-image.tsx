import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RevOps Health Scorecard — How healthy is your revenue operations really?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#F7F4ED",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#C2410C",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              color: "#3A372E",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.01em",
            }}
          >
            RevOps Scorecard
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C2410C",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            A diagnostic · 18 questions · 5 minutes
          </div>

          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.05,
              color: "#15140F",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              maxWidth: "900px",
            }}
          >
            How healthy is your{" "}
            <span style={{ color: "#C2410C", fontStyle: "italic", fontWeight: 300 }}>
              revenue operations
            </span>{" "}
            really?
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#5C5749",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
              maxWidth: "760px",
              lineHeight: 1.5,
            }}
          >
            Free diagnostic for B2B SaaS ops leaders. Six weighted pillars,
            latest benchmarks, AI-generated analysis.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Churn signals", "SLA discipline", "Automation", "Data health", "Renewals"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#7E7867",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#C2410C",
                    opacity: 0.5,
                  }}
                />
                {label}
              </div>
            )
          )}
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: "14px",
              color: "#A39C88",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            getrevscore.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

