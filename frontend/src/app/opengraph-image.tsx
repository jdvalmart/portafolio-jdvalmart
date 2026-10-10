import { ImageResponse } from "next/og";

export const alt = "Juan David Valencia — AI Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0f172a 0%, #042f2e 100%)",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: "#2dd4bf",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        AI Software Developer
      </div>
      <div style={{ fontSize: 76, fontWeight: 800, marginTop: 18 }}>Juan David Valencia</div>
      <div style={{ fontSize: 30, color: "#a1a1aa", marginTop: 28 }}>
        RAG · LLMs · MCP · Python · FastAPI
      </div>
    </div>,
    { ...size }
  );
}
