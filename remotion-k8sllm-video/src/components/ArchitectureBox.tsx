import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fontFamily, glass, monoFamily } from "../theme";
import { appear, ease } from "./animation";

type ArchitectureBoxProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  accent?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  tone?: "default" | "warning" | "success" | "muted";
  style?: CSSProperties;
};

export const ArchitectureBox = ({
  title,
  subtitle,
  icon,
  accent = colors.teal,
  x,
  y,
  width,
  height,
  delay = 0,
  tone = "default",
  style
}: ArchitectureBoxProps) => {
  const frame = useCurrentFrame();
  const p = appear(frame, delay, 24);
  const titleFontSize =
    width < 175 ? (title.length > 12 ? 19 : 22) : width < 230 ? 24 : 28;
  const translateY = interpolate(p, [0, 1], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease
  });
  const toneBorder =
    tone === "warning"
      ? colors.red
      : tone === "success"
        ? colors.green
        : tone === "muted"
          ? "rgba(148, 163, 184, 0.18)"
          : accent;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        padding: 22,
        borderRadius: 22,
        ...glass,
        border: `1px solid ${toneBorder}`,
        opacity: p,
        transform: `translateY(${translateY}px) scale(${0.985 + p * 0.015})`,
        overflow: "hidden",
        fontFamily,
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 15% 0%, ${accent}22, transparent 45%)`,
          pointerEvents: "none"
        }}
      />
      <div style={{ position: "relative", display: "flex", gap: 14 }}>
        {icon ? (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              display: "grid",
              placeItems: "center",
              color: accent,
              background: `${accent}18`,
              border: `1px solid ${accent}44`,
              fontFamily: monoFamily,
              fontSize: 25,
              flexShrink: 0
            }}
          >
            {icon}
          </div>
        ) : null}
        <div>
          <div
            style={{
              color: colors.text,
              fontWeight: 780,
              fontSize: titleFontSize,
              lineHeight: 1.12
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                color: colors.muted,
                fontSize: 18,
                lineHeight: 1.36,
                marginTop: 10
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
