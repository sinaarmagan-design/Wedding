import { ImageResponse } from "next/og";

export const alt = "Armağan & Eylül";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6f1",
        }}
      >
        <div style={{ position: "relative", width: 180, height: 180, display: "flex", marginBottom: 44 }}>
          <div style={{ position: "absolute", left: 16, top: 68, width: 148, height: 100, background: "#FFC93C", borderRadius: 14, display: "flex" }} />
          <div style={{ position: "absolute", left: 0, top: 40, width: 180, height: 38, background: "#FFDA6B", borderRadius: 10, display: "flex" }} />
          <div style={{ position: "absolute", left: 78, top: 40, width: 24, height: 128, background: "#FF5A5F", display: "flex" }} />
          <div style={{ position: "absolute", left: 0, top: 70, width: 180, height: 24, background: "#FF5A5F", display: "flex" }} />
          <div style={{ position: "absolute", left: 22, top: 0, width: 54, height: 38, background: "#FF5A5F", borderRadius: 22, transform: "rotate(-28deg)", display: "flex" }} />
          <div style={{ position: "absolute", left: 104, top: 0, width: 54, height: 38, background: "#FF5A5F", borderRadius: 22, transform: "rotate(28deg)", display: "flex" }} />
          <div style={{ position: "absolute", left: 62, top: 22, width: 56, height: 56, borderRadius: 999, background: "#E14545", display: "flex" }} />
        </div>
        <div style={{ fontSize: 68, color: "#2b2420", display: "flex" }}>
          Armagan &amp; Eylul
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a9705f",
            marginTop: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Wedding Gift List
        </div>
      </div>
    ),
    { ...size }
  );
}
