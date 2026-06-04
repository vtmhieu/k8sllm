import type { CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import { colors, fontFamily, monoFamily } from "../theme";
import { appear, pulse } from "./animation";

type NodePoolProps = {
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodes?: number;
  delay?: number;
  color?: string;
  overloaded?: boolean;
  style?: CSSProperties;
};

export const NodePool = ({
  title,
  subtitle,
  x,
  y,
  width,
  height,
  nodes = 4,
  delay = 0,
  color = colors.blue,
  overloaded = false,
  style
}: NodePoolProps) => {
  const frame = useCurrentFrame();
  const opacity = appear(frame, delay, 26);
  const pressure = overloaded ? pulse(frame, 36, 0.25, 0.9) : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 24,
        padding: 20,
        background: `linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(15, 39, 55, 0.78))`,
        border: `1px solid ${overloaded ? colors.red : color}88`,
        boxShadow: overloaded
          ? `0 0 42px rgba(251, 113, 133, ${pressure})`
          : `0 24px 60px rgba(0, 0, 0, 0.24)`,
        opacity,
        fontFamily,
        ...style
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: colors.text
        }}
      >
        <div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{title}</div>
          {subtitle ? (
            <div style={{ color: colors.muted, fontSize: 15, marginTop: 5 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            fontFamily: monoFamily,
            color,
            fontSize: 15,
            border: `1px solid ${color}55`,
            borderRadius: 999,
            padding: "7px 10px"
          }}
        >
          {nodes} nodes
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
          display: "grid",
          gridTemplateColumns: `repeat(${nodes}, 1fr)`,
          gap: 12
        }}
      >
        {Array.from({ length: nodes }).map((_, index) => (
          <div
            key={index}
            style={{
              height: 64,
              borderRadius: 16,
              background: overloaded
                ? "linear-gradient(180deg, rgba(127, 29, 29, 0.78), rgba(30, 41, 59, 0.7))"
                : "linear-gradient(180deg, rgba(30, 41, 59, 0.92), rgba(15, 23, 42, 0.74))",
              border: `1px solid ${overloaded ? colors.red : color}44`,
              display: "grid",
              placeItems: "center",
              color: overloaded ? colors.red : color,
              fontFamily: monoFamily,
              fontSize: 18
            }}
          >
            {overloaded ? "!" : "pod"}
          </div>
        ))}
      </div>
    </div>
  );
};

type GpuPoolProps = Omit<NodePoolProps, "color" | "subtitle"> & {
  profile?: string;
};

export const GpuPool = ({ profile = "A100 / L4", ...props }: GpuPoolProps) => (
  <NodePool
    {...props}
    subtitle={`GPU profile: ${profile}`}
    color={colors.green}
    nodes={props.nodes ?? 3}
  />
);
