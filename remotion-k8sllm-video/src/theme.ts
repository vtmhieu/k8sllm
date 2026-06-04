import type { CSSProperties } from "react";

export const colors = {
  bg: "#071014",
  panel: "#0d1b22",
  panel2: "#122733",
  border: "rgba(148, 163, 184, 0.22)",
  text: "#f8fafc",
  muted: "#9fb1be",
  cyan: "#22d3ee",
  teal: "#2dd4bf",
  blue: "#60a5fa",
  green: "#4ade80",
  amber: "#fbbf24",
  red: "#fb7185",
  purple: "#a78bfa",
  slate: "#1e293b"
};

export const fontFamily =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

export const monoFamily =
  "JetBrains Mono, SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace";

export const glass: CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(15, 23, 42, 0.84), rgba(15, 38, 52, 0.74))",
  border: `1px solid ${colors.border}`,
  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
  backdropFilter: "blur(12px)"
};
