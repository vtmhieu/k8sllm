import { useCurrentFrame } from "remotion";
import { colors, fontFamily, monoFamily } from "../theme";
import { appear, pulse } from "./animation";

type MetricCardProps = {
  label: string;
  value: string;
  x: number;
  y: number;
  delay?: number;
  color?: string;
};

export const MetricCard = ({
  label,
  value,
  x,
  y,
  delay = 0,
  color = colors.cyan
}: MetricCardProps) => {
  const frame = useCurrentFrame();
  const opacity = appear(frame, delay, 24);
  const glow = pulse(frame + delay, 90, 0.08, 0.22);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 205,
        height: 116,
        padding: 18,
        borderRadius: 20,
        background: `linear-gradient(145deg, rgba(15, 23, 42, 0.88), ${color}${Math.round(
          glow * 255
        )
          .toString(16)
          .padStart(2, "0")})`,
        border: `1px solid ${color}66`,
        opacity,
        fontFamily,
        boxShadow: `0 0 34px ${color}22`
      }}
    >
      <div
        style={{
          fontFamily: monoFamily,
          color,
          fontSize: 16,
          textTransform: "uppercase",
          letterSpacing: 1.8
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: colors.text,
          fontSize: 34,
          fontWeight: 820,
          marginTop: 12
        }}
      >
        {value}
      </div>
    </div>
  );
};
