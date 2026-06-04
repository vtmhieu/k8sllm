import { colors, fontFamily, monoFamily } from "../theme";
import { ArchitectureBox } from "./ArchitectureBox";
import { FlowArrow } from "./FlowArrow";
import { GpuPool, NodePool } from "./NodePool";

type KubernetesClusterProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  overloaded?: boolean;
  showFlow?: boolean;
};

export const KubernetesCluster = ({
  x,
  y,
  width,
  height,
  overloaded = false,
  showFlow = true
}: KubernetesClusterProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 34,
        border: `1px solid ${colors.cyan}44`,
        background:
          "linear-gradient(145deg, rgba(8, 18, 26, 0.88), rgba(9, 28, 38, 0.72))",
        boxShadow: "0 34px 110px rgba(0, 0, 0, 0.32)",
        overflow: "hidden",
        fontFamily
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 20,
          color: colors.text,
          fontSize: 24,
          fontWeight: 820
        }}
      >
        <span style={{ color: colors.cyan, fontFamily: monoFamily }}>☸</span>{" "}
        Kubernetes cluster
      </div>
      <ArchitectureBox
        title="API Gateway"
        subtitle="Auth, routing, quotas"
        icon="gw"
        x={40}
        y={88}
        width={245}
        height={128}
        delay={8}
        accent={colors.cyan}
      />
      <ArchitectureBox
        title="Inference runtime"
        subtitle="vLLM / KServe / Ray Serve"
        icon="LLM"
        x={320}
        y={88}
        width={330}
        height={128}
        delay={20}
        accent={colors.purple}
      />
      <NodePool
        title="App worker pool"
        subtitle="normal workloads"
        x={40}
        y={270}
        width={300}
        height={220}
        nodes={3}
        delay={28}
        overloaded={overloaded}
        color={colors.blue}
      />
      <GpuPool
        title="GPU node pool"
        x={380}
        y={270}
        width={330}
        height={220}
        nodes={3}
        delay={38}
        overloaded={overloaded}
      />
      {showFlow ? (
        <>
          <FlowArrow from={[285, 152]} to={[320, 152]} delay={44} />
          <FlowArrow from={[486, 216]} to={[546, 270]} delay={58} color={colors.green} />
        </>
      ) : null}
    </div>
  );
};
