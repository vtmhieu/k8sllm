import { useCurrentFrame } from "remotion";
import { colors, fontFamily, monoFamily } from "../theme";
import { appear } from "./animation";

type FlowArrowProps = {
  from: [number, number];
  to: [number, number];
  delay?: number;
  color?: string;
  label?: string;
  dashed?: boolean;
};

export const FlowArrow = ({
  from,
  to,
  delay = 0,
  color = colors.teal,
  label,
  dashed = false
}: FlowArrowProps) => {
  const frame = useCurrentFrame();
  const p = appear(frame, delay, 30);
  const x = from[0] + (to[0] - from[0]) * p;
  const y = from[1] + (to[1] - from[1]) * p;
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const size = 12;
  const arrowPoints = [
    [x, y],
    [
      x - size * Math.cos(angle - Math.PI / 7),
      y - size * Math.sin(angle - Math.PI / 7)
    ],
    [
      x - size * Math.cos(angle + Math.PI / 7),
      y - size * Math.sin(angle + Math.PI / 7)
    ]
  ]
    .map((point) => point.join(","))
    .join(" ");

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <line
        x1={from[0]}
        y1={from[1]}
        x2={x}
        y2={y}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={dashed ? "12 12" : undefined}
        opacity={0.86}
        filter="drop-shadow(0 0 10px rgba(45, 212, 191, 0.35))"
      />
      <polygon points={arrowPoints} fill={color} opacity={p} />
      {label ? (
        <foreignObject
          x={(from[0] + to[0]) / 2 - 130}
          y={(from[1] + to[1]) / 2 - 34}
          width={260}
          height={68}
          opacity={appear(frame, delay + 18, 20)}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 42,
              padding: "0 16px",
              borderRadius: 999,
              color: colors.text,
              background: "rgba(3, 7, 18, 0.74)",
              border: `1px solid ${color}55`,
              fontFamily,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 0.2
            }}
          >
            <span style={{ fontFamily: monoFamily, color, marginRight: 8 }}>
              →
            </span>
            {label}
          </div>
        </foreignObject>
      ) : null}
    </svg>
  );
};
