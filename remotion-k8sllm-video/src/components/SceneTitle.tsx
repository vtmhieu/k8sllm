import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily, monoFamily } from "../theme";
import { appear, ease } from "./animation";

type SceneTitleProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export const SceneTitle = ({ title, subtitle, eyebrow }: SceneTitleProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = appear(frame, 4, 24);
  const subtitleIn = appear(frame, 16, 24);
  const y = interpolate(titleIn, [0, 1], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 86,
        top: 62,
        width: 980,
        transform: `translateY(${y}px)`,
        opacity: titleIn,
        fontFamily
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontFamily: monoFamily,
            color: colors.teal,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          color: colors.text,
          fontSize: title.length > 44 ? 54 : 64,
          fontWeight: 860,
          letterSpacing: -1,
          lineHeight: 1.04,
          textShadow: "0 22px 60px rgba(0, 0, 0, 0.34)"
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 18,
            color: colors.muted,
            fontSize: 28,
            lineHeight: 1.32,
            opacity: subtitleIn,
            maxWidth: 870
          }}
        >
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          width: 260,
          height: 2,
          marginTop: 26,
          background: `linear-gradient(90deg, ${colors.teal}, transparent)`,
          transform: `scaleX(${appear(frame, fps * 0.25, 30)})`,
          transformOrigin: "left"
        }}
      />
    </div>
  );
};
