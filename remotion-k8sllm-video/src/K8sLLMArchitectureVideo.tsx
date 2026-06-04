import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import { Caption } from "./components/Caption";
import { ArchitectureBox } from "./components/ArchitectureBox";
import { FlowArrow } from "./components/FlowArrow";
import { GitOpsFlow } from "./components/GitOpsFlow";
import { KubernetesCluster } from "./components/KubernetesCluster";
import { MetricCard } from "./components/MetricCard";
import { GpuPool, NodePool } from "./components/NodePool";
import { RagPipeline } from "./components/RagPipeline";
import { SceneTitle } from "./components/SceneTitle";
import { ServiceLayer } from "./components/ServiceLayer";
import { appear, ease, pulse } from "./components/animation";
import { captions } from "./data/captions";
import { colors, fontFamily, glass, monoFamily } from "./theme";

const seconds = (value: number) => Math.round(value * 30);

const sceneFrames = {
  hook: seconds(8),
  problem: seconds(10),
  cluster: seconds(14),
  inference: seconds(16),
  decision: seconds(12),
  rag: seconds(18),
  ops: seconds(12),
  cta: seconds(10)
};

const sceneStarts = {
  hook: 0,
  problem: sceneFrames.hook,
  cluster: sceneFrames.hook + sceneFrames.problem,
  inference: sceneFrames.hook + sceneFrames.problem + sceneFrames.cluster,
  decision:
    sceneFrames.hook +
    sceneFrames.problem +
    sceneFrames.cluster +
    sceneFrames.inference,
  rag:
    sceneFrames.hook +
    sceneFrames.problem +
    sceneFrames.cluster +
    sceneFrames.inference +
    sceneFrames.decision,
  ops:
    sceneFrames.hook +
    sceneFrames.problem +
    sceneFrames.cluster +
    sceneFrames.inference +
    sceneFrames.decision +
    sceneFrames.rag,
  cta:
    sceneFrames.hook +
    sceneFrames.problem +
    sceneFrames.cluster +
    sceneFrames.inference +
    sceneFrames.decision +
    sceneFrames.rag +
    sceneFrames.ops
};

type SceneShellProps = {
  children: ReactNode;
  caption: string;
  duration: number;
  sceneNumber: string;
};

const Background = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 3000], [0, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 78% 18%, rgba(34, 211, 238, 0.14), transparent 32%), radial-gradient(circle at 12% 76%, rgba(45, 212, 191, 0.12), transparent 30%), linear-gradient(135deg, #071014 0%, #081923 48%, #05070d 100%)",
        fontFamily,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.13) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          transform: `translate(${drift}px, ${drift * 0.45}px)`
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -260,
          bottom: -420,
          width: 920,
          height: 920,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45, 212, 191, 0.16), transparent 62%)"
        }}
      />
    </AbsoluteFill>
  );
};

const SceneShell = ({
  children,
  caption,
  duration,
  sceneNumber
}: SceneShellProps) => {
  const frame = useCurrentFrame();
  const opacityIn = appear(frame, 0, 18);
  const opacityOut = interpolate(frame, [duration - 18, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.84, 0)
  });
  const zoom = interpolate(frame, [0, duration], [1.015, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease
  });

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(opacityIn, opacityOut),
        transform: `scale(${zoom})`
      }}
    >
      <Background />
      <div
        style={{
          position: "absolute",
          right: 76,
          top: 66,
          fontFamily: monoFamily,
          color: colors.muted,
          fontSize: 20,
          letterSpacing: 2
        }}
      >
        K8sLLM / {sceneNumber}
      </div>
      {children}
      <Caption text={caption} />
    </AbsoluteFill>
  );
};

const NoteStack = ({
  notes,
  x,
  y,
  color = colors.teal,
  delay = 0
}: {
  notes: string[];
  x: number;
  y: number;
  color?: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 560 }}>
      {notes.map((note, index) => {
        const opacity = appear(frame, delay + index * 8, 18);
        return (
          <div
            key={note}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              marginBottom: 18,
              opacity,
              fontFamily,
              color: colors.text,
              fontSize: 24,
              lineHeight: 1.28
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                marginTop: 4,
                borderRadius: 8,
                background: `${color}25`,
                border: `1px solid ${color}aa`,
                flexShrink: 0
              }}
            />
            <span>{note}</span>
          </div>
        );
      })}
    </div>
  );
};

const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const userPulse = pulse(frame, 46, 0.45, 1);
  return (
    <SceneShell caption={captions[0].text} duration={sceneFrames.hook} sceneNumber="01">
      <SceneTitle
        eyebrow="Architecture explainer"
        title="Production LLM Infrastructure on Kubernetes"
        subtitle="From cluster primitives to a real AI inference platform"
      />
      <ArchitectureBox
        title="Users / Apps"
        subtitle="streaming traffic"
        icon="usr"
        x={150}
        y={462}
        width={260}
        height={132}
        delay={12}
        accent={colors.cyan}
        style={{ boxShadow: `0 0 55px rgba(34, 211, 238, ${userPulse * 0.18})` }}
      />
      <KubernetesCluster x={560} y={292} width={760} height={540} />
      <ArchitectureBox
        title="LLM model"
        subtitle="batched generation on GPU"
        icon="LLM"
        x={1364}
        y={468}
        width={320}
        height={140}
        delay={54}
        accent={colors.purple}
      />
      <FlowArrow from={[410, 528]} to={[600, 444]} delay={34} label="request" />
      <FlowArrow
        from={[1205, 596]}
        to={[1364, 536]}
        delay={68}
        color={colors.green}
        label="tokens"
      />
      <MetricCard label="TTFT" value="1.8s" x={1432} y={650} delay={86} color={colors.amber} />
      <MetricCard
        label="tokens/sec"
        value="148"
        x={1432}
        y={786}
        delay={96}
        color={colors.green}
      />
    </SceneShell>
  );
};

const Scene2Problem = () => {
  const warnings = [
    "GPU capacity",
    "Token latency",
    "Queue wait",
    "Model rollout",
    "Tenant isolation"
  ];

  return (
    <SceneShell caption={captions[1].text} duration={sceneFrames.problem} sceneNumber="02">
      <SceneTitle
        eyebrow="The problem"
        title="LLM workloads break normal Kubernetes assumptions"
      />
      <KubernetesCluster x={114} y={302} width={720} height={520} overloaded showFlow={false} />
      <ArchitectureBox
        title="General workers overloaded"
        subtitle="model pods compete with normal workloads"
        icon="!"
        x={900}
        y={308}
        width={360}
        height={140}
        delay={20}
        accent={colors.red}
        tone="warning"
      />
      <ArchitectureBox
        title="Cold model starts"
        subtitle="image pull, driver readiness, model loading"
        icon="⧖"
        x={900}
        y={484}
        width={360}
        height={140}
        delay={32}
        accent={colors.amber}
        tone="warning"
      />
      <ArchitectureBox
        title="Autoscaling is unstable"
        subtitle="CPU metrics do not represent token pressure"
        icon="↯"
        x={900}
        y={660}
        width={360}
        height={140}
        delay={44}
        accent={colors.red}
        tone="warning"
      />
      {warnings.map((warning, index) => (
        <ArchitectureBox
          key={warning}
          title={warning}
          icon="!"
          x={1340}
          y={258 + index * 110}
          width={360}
          height={86}
          delay={64 + index * 7}
          accent={colors.red}
          tone="warning"
        />
      ))}
    </SceneShell>
  );
};

const Scene3ClusterArchitecture = () => {
  return (
    <SceneShell caption={captions[2].text} duration={sceneFrames.cluster} sceneNumber="03">
      <SceneTitle
        eyebrow="Reference architecture"
        title="Production Cluster"
        subtitle="Separate blast radius before scaling inference capacity"
      />
      <ArchitectureBox
        title="Control Plane"
        subtitle="API server, scheduler, controllers"
        icon="cp"
        x={110}
        y={238}
        width={380}
        height={138}
        delay={12}
        accent={colors.cyan}
      />
      <NodePool
        title="System node pool"
        subtitle="platform agents and cluster-critical services"
        x={540}
        y={236}
        width={390}
        height={224}
        nodes={3}
        delay={28}
        color={colors.teal}
      />
      <NodePool
        title="App worker pool"
        subtitle="normal product workloads"
        x={980}
        y={236}
        width={390}
        height={224}
        nodes={4}
        delay={42}
        color={colors.blue}
      />
      <GpuPool
        title="GPU node pool"
        profile="A100 / L4 / H100"
        x={1420}
        y={236}
        width={390}
        height={224}
        nodes={3}
        delay={56}
      />
      <ServiceLayer
        title="Shared platform services"
        services={["GitOps", "Policy-as-Code", "Observability", "Backup + DR"]}
        x={110}
        y={580}
        width={1160}
        delay={82}
        color={colors.purple}
      />
      <ArchitectureBox
        title="GPU workloads stay isolated"
        subtitle="taints, labels, quotas, and compatible node profiles"
        icon="gpu"
        x={1320}
        y={570}
        width={490}
        height={160}
        delay={110}
        accent={colors.green}
        tone="success"
      />
      <FlowArrow from={[1370, 348]} to={[1420, 348]} delay={72} color={colors.green} label="isolate" />
      <NoteStack
        x={118}
        y={790}
        delay={126}
        color={colors.teal}
        notes={[
          "Dedicated system pool for platform agents.",
          "Separate app pool for normal workloads.",
          "GitOps and policy-as-code manage desired state.",
          "Observability and backup run as shared services."
        ]}
      />
    </SceneShell>
  );
};

const Scene4InferenceStack = () => {
  const flow = [
    { title: "User / App", icon: "usr", color: colors.cyan },
    { title: "API Gateway", icon: "gw", color: colors.teal },
    { title: "Auth + quota", icon: "id", color: colors.blue },
    { title: "Inference service", icon: "svc", color: colors.purple },
    { title: "vLLM / KServe / Ray", icon: "run", color: colors.purple },
    { title: "GPU node pool", icon: "gpu", color: colors.green },
    { title: "Telemetry", icon: "obs", color: colors.amber }
  ];
  const startX = 118;
  const boxW = 226;
  const gap = 24;

  return (
    <SceneShell caption={captions[3].text} duration={sceneFrames.inference} sceneNumber="04">
      <SceneTitle
        eyebrow="Reference architecture"
        title="LLM Inference Stack"
        subtitle="Gateway policy, runtime behavior, GPU capacity, and telemetry"
      />
      {flow.map((item, index) => (
        <ArchitectureBox
          key={item.title}
          title={item.title}
          icon={item.icon}
          x={startX + index * (boxW + gap)}
          y={344 + (index % 2) * 58}
          width={boxW}
          height={132}
          delay={16 + index * 7}
          accent={item.color}
        />
      ))}
      {flow.slice(0, -1).map((item, index) => (
        <FlowArrow
          key={item.title}
          from={[
            startX + index * (boxW + gap) + boxW,
            410 + (index % 2) * 58
          ]}
          to={[
            startX + (index + 1) * (boxW + gap),
            410 + ((index + 1) % 2) * 58
          ]}
          delay={58 + index * 6}
          color={colors.teal}
        />
      ))}
      <MetricCard label="TTFT" value="p95" x={180} y={650} delay={104} color={colors.amber} />
      <MetricCard label="tokens/sec" value="rate" x={420} y={650} delay={112} color={colors.green} />
      <MetricCard label="queue wait" value="ms" x={660} y={650} delay={120} color={colors.red} />
      <MetricCard label="GPU util" value="%" x={900} y={650} delay={128} color={colors.cyan} />
      <MetricCard label="cost/request" value="$" x={1140} y={650} delay={136} color={colors.purple} />
      <MetricCard label="p95 latency" value="SLO" x={1380} y={650} delay={144} color={colors.blue} />
      <NoteStack
        notes={[
          "Gateway handles auth, quota, and routing policy.",
          "Runtime handles batching, KV cache, streaming, and model-specific serving.",
          "Autoscaling should use inference-specific signals.",
          "Telemetry must report user latency and GPU economics."
        ]}
        x={118}
        y={812}
        delay={156}
        color={colors.green}
      />
    </SceneShell>
  );
};

const CompareList = ({
  title,
  accent,
  items,
  x,
  delay
}: {
  title: string;
  accent: string;
  items: string[];
  x: number;
  delay: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: 286,
      width: 760,
      height: 520,
      borderRadius: 32,
      ...glass,
      border: `1px solid ${accent}77`,
      padding: 42,
      fontFamily
    }}
  >
    <ArchitectureBox
      title={title}
      icon={title.includes("KServe") ? "crd" : "py"}
      x={42}
      y={34}
      width={330}
      height={132}
      delay={delay}
      accent={accent}
    />
    <NoteStack notes={items} x={56} y={218} color={accent} delay={delay + 18} />
  </div>
);

const Scene5ServingChoice = () => {
  return (
    <SceneShell caption={captions[4].text} duration={sceneFrames.decision} sceneNumber="05">
      <SceneTitle eyebrow="Serving choice" title="KServe or Ray Serve?" />
      <CompareList
        title="KServe"
        accent={colors.teal}
        x={130}
        delay={14}
        items={[
          "Kubernetes CRDs",
          "Platform-owned inference contract",
          "Standard endpoint lifecycle",
          "Revisions, traffic, autoscaling, runtime selection"
        ]}
      />
      <CompareList
        title="Ray Serve"
        accent={colors.purple}
        x={1030}
        delay={26}
        items={[
          "Python-native serving graph",
          "Retrieval, reranking, routing, generation",
          "Multi-step pipelines",
          "Ray cluster capabilities"
        ]}
      />
      <ArchitectureBox
        title="Decision model"
        subtitle="Choose by ownership model, serving graph complexity, rollout behavior, and team fit."
        icon="?"
        x={642}
        y={808}
        width={636}
        height={120}
        delay={92}
        accent={colors.amber}
      />
    </SceneShell>
  );
};

const Scene6Rag = () => {
  const frame = useCurrentFrame();
  const notes = [
    "Versioned indexes with metadata",
    "Tenant filters before generation",
    "Prompt assembly owns context budget",
    "Recall and groundedness evaluation"
  ];

  return (
    <SceneShell caption={captions[5].text} duration={sceneFrames.rag} sceneNumber="06">
      <SceneTitle
        eyebrow="Reference architecture"
        title="RAG Platform"
        subtitle="Two lifecycles: ingestion quality and online serving latency"
      />
      <RagPipeline x={120} y={258} />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 792,
          width: 1600,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
          fontFamily
        }}
      >
        {notes.map((note, index) => (
          <div
            key={note}
            style={{
              minHeight: 86,
              borderRadius: 20,
              padding: "18px 20px",
              color: colors.text,
              background: "rgba(3, 7, 18, 0.58)",
              border: `1px solid ${colors.teal}55`,
              opacity: appear(frame, 138 + index * 8, 18),
              fontSize: 21,
              lineHeight: 1.24
            }}
          >
            <span style={{ color: colors.teal, fontFamily: monoFamily }}>
              0{index + 1}
            </span>{" "}
            {note}
          </div>
        ))}
      </div>
    </SceneShell>
  );
};

const Scene7Ops = () => {
  return (
    <SceneShell caption={captions[6].text} duration={sceneFrames.ops} sceneNumber="07">
      <SceneTitle
        eyebrow="Operate it like a platform"
        title="GitOps + Observability"
        subtitle="Change review, policy gates, SLO checks, and rollback"
      />
      <GitOpsFlow x={138} y={286} />
    </SceneShell>
  );
};

const Scene8Cta = () => {
  const pillars = [
    "Production cluster",
    "GPU node pools",
    "Model serving",
    "RAG",
    "Observability",
    "GitOps",
    "Cost and reliability"
  ];
  const frame = useCurrentFrame();
  const mapScale = interpolate(frame, [0, 150], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease
  });

  return (
    <SceneShell caption={captions[7].text} duration={sceneFrames.cta} sceneNumber="08">
      <div
        style={{
          position: "absolute",
          left: 118,
          top: 142,
          fontFamily,
          transform: `scale(${mapScale})`,
          transformOrigin: "left top"
        }}
      >
        <div
          style={{
            fontFamily: monoFamily,
            color: colors.teal,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            opacity: appear(frame, 4, 24)
          }}
        >
          k8sllm.online
        </div>
        <div
          style={{
            color: colors.text,
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 0.94,
            marginTop: 24,
            letterSpacing: -3,
            opacity: appear(frame, 12, 28)
          }}
        >
          K8sLLM
        </div>
        <div
          style={{
            color: colors.muted,
            fontSize: 36,
            lineHeight: 1.3,
            maxWidth: 760,
            marginTop: 24,
            opacity: appear(frame, 28, 28)
          }}
        >
          A practical guide to Kubernetes + LLM infrastructure.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 116,
          top: 190,
          width: 780,
          height: 560,
          borderRadius: 36,
          ...glass,
          overflow: "hidden"
        }}
      >
        {pillars.map((pillar, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          return (
            <ArchitectureBox
              key={pillar}
              title={pillar}
              icon={String(index + 1).padStart(2, "0")}
              x={42 + col * 348}
              y={44 + row * 116}
              width={300}
              height={86}
              delay={44 + index * 8}
              accent={
                [
                  colors.teal,
                  colors.green,
                  colors.purple,
                  colors.blue,
                  colors.amber,
                  colors.cyan,
                  colors.red
                ][index]
              }
            />
          );
        })}
      </div>
      <FlowArrow from={[780, 496]} to={[1112, 470]} delay={116} color={colors.teal} label="platform map" />
      <ArchitectureBox
        title="Design the platform before scaling the model."
        subtitle="Use the guide, labs, and architectures to review production AI infrastructure."
        icon="✓"
        x={118}
        y={650}
        width={760}
        height={142}
        delay={138}
        accent={colors.green}
        tone="success"
      />
    </SceneShell>
  );
};

export const K8sLLMArchitectureVideo = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ width, height, backgroundColor: colors.bg }}>
      <Sequence from={sceneStarts.hook} durationInFrames={sceneFrames.hook} premountFor={30}>
        <Scene1Hook />
      </Sequence>
      <Sequence
        from={sceneStarts.problem}
        durationInFrames={sceneFrames.problem}
        premountFor={30}
      >
        <Scene2Problem />
      </Sequence>
      <Sequence from={sceneStarts.cluster} durationInFrames={sceneFrames.cluster} premountFor={30}>
        <Scene3ClusterArchitecture />
      </Sequence>
      <Sequence
        from={sceneStarts.inference}
        durationInFrames={sceneFrames.inference}
        premountFor={30}
      >
        <Scene4InferenceStack />
      </Sequence>
      <Sequence
        from={sceneStarts.decision}
        durationInFrames={sceneFrames.decision}
        premountFor={30}
      >
        <Scene5ServingChoice />
      </Sequence>
      <Sequence from={sceneStarts.rag} durationInFrames={sceneFrames.rag} premountFor={30}>
        <Scene6Rag />
      </Sequence>
      <Sequence from={sceneStarts.ops} durationInFrames={sceneFrames.ops} premountFor={30}>
        <Scene7Ops />
      </Sequence>
      <Sequence from={sceneStarts.cta} durationInFrames={sceneFrames.cta} premountFor={30}>
        <Scene8Cta />
      </Sequence>
    </AbsoluteFill>
  );
};
