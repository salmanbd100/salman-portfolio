import { ImageResponse } from "next/og";

// No `runtime = "edge"`: the edge runtime disables static generation, so the
// card was being rendered on demand for every crawl. On Node it prerenders
// once at build.
export const alt = "Salman Rahman — Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: 24,
          }}
        >
          Senior Frontend Engineer &middot; 9+ Years
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 32,
            letterSpacing: "-0.02em",
          }}
        >
          Salman Rahman
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: 20,
          }}
        >
          React &middot; TypeScript &middot; Next.js &middot; Node.js
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.5)",
            marginBottom: 40,
          }}
        >
          Shipping production apps for Norwegian, Swiss &amp; US teams
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.35)",
            marginTop: "auto",
          }}
        >
          salmanrahman.com
        </div>
      </div>
    ),
    { ...size }
  );
}
