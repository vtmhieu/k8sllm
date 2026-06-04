import { colors, fontFamily } from "../theme";
import { ArchitectureBox } from "./ArchitectureBox";
import { FlowArrow } from "./FlowArrow";
import { MetricCard } from "./MetricCard";

const steps = [
  "Developer PR",
  "CI build + scan",
  "Config repo",
  "Argo CD",
  "Admission policy",
  "Kubernetes rollout",
  "SLO checks",
  "Rollback path"
];

type GitOpsFlowProps = {
  x: number;
  y: number;
};

export const GitOpsFlow = ({ x, y }: GitOpsFlowProps) => {
  const boxW = 178;
  const gap = 24;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 1640,
        height: 560,
        fontFamily
      }}
    >
      {steps.map((step, index) => (
        <ArchitectureBox
          key={step}
          title={step}
          x={index * (boxW + gap)}
          y={52 + (index % 2) * 92}
          width={boxW}
          height={118}
          delay={8 + index * 6}
          accent={index < 3 ? colors.teal : index < 6 ? colors.purple : colors.green}
          icon={index < 3 ? "git" : index < 6 ? "k8s" : "slo"}
        />
      ))}
      {steps.slice(0, -1).map((step, index) => (
        <FlowArrow
          key={step}
          from={[index * (boxW + gap) + boxW, 112 + (index % 2) * 92]}
          to={[
            (index + 1) * (boxW + gap),
            112 + ((index + 1) % 2) * 92
          ]}
          delay={36 + index * 6}
          color={colors.teal}
        />
      ))}
      <MetricCard label="metrics" value="SLO" x={220} y={360} delay={92} color={colors.cyan} />
      <MetricCard label="logs" value="events" x={455} y={360} delay={100} color={colors.blue} />
      <MetricCard label="traces" value="paths" x={690} y={360} delay={108} color={colors.purple} />
      <MetricCard label="TTFT" value="p95" x={925} y={360} delay={116} color={colors.amber} />
      <MetricCard label="GPU" value="pressure" x={1160} y={360} delay={124} color={colors.green} />
      <MetricCard label="queue" value="wait" x={1395} y={360} delay={132} color={colors.red} />
    </div>
  );
};
