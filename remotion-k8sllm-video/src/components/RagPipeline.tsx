import { colors, fontFamily, monoFamily } from "../theme";
import { ArchitectureBox } from "./ArchitectureBox";
import { FlowArrow } from "./FlowArrow";
import { MetricCard } from "./MetricCard";

const ingestion = ["Sources", "Normalize", "Chunk", "Embed", "Index", "Vector DB"];
const serving = [
  "Query",
  "Auth",
  "Retrieve",
  "Rerank",
  "Prompt",
  "Generate",
  "Stream + cite"
];

type RagPipelineProps = {
  x: number;
  y: number;
};

export const RagPipeline = ({ x, y }: RagPipelineProps) => {
  const boxW = 188;
  const gap = 22;
  const servingBoxW = 148;
  const servingGap = 18;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 1600,
        height: 640,
        fontFamily
      }}
    >
      <div
        style={{
          color: colors.teal,
          fontFamily: monoFamily,
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 16
        }}
      >
        Ingestion plane
      </div>
      {ingestion.map((item, index) => (
        <ArchitectureBox
          key={item}
          title={item}
          x={index * (boxW + gap)}
          y={34}
          width={boxW}
          height={116}
          delay={8 + index * 6}
          accent={index === ingestion.length - 1 ? colors.green : colors.teal}
          icon={undefined}
        />
      ))}
      {ingestion.slice(0, -1).map((item, index) => (
        <FlowArrow
          key={item}
          from={[index * (boxW + gap) + boxW, 92]}
          to={[(index + 1) * (boxW + gap), 92]}
          delay={20 + index * 6}
          color={colors.teal}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: 236,
          left: 0,
          color: colors.blue,
          fontFamily: monoFamily,
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: 2
        }}
      >
        Online serving plane
      </div>
      {serving.map((item, index) => (
        <ArchitectureBox
          key={item}
          title={item}
          x={index * (servingBoxW + servingGap)}
          y={278}
          width={servingBoxW}
          height={126}
          delay={48 + index * 5}
          accent={index > 4 ? colors.purple : colors.blue}
          icon={undefined}
        />
      ))}
      {serving.slice(0, -1).map((item, index) => (
        <FlowArrow
          key={item}
          from={[index * (servingBoxW + 22) + servingBoxW, 340]}
          to={[(index + 1) * (servingBoxW + servingGap), 340]}
          delay={62 + index * 5}
          color={colors.blue}
        />
      ))}

      <MetricCard label="recall" value="92%" x={1338} y={70} delay={84} color={colors.green} />
      <MetricCard label="grounded" value="high" x={1338} y={214} delay={94} color={colors.teal} />
      <MetricCard label="latency" value="p95" x={1338} y={358} delay={104} color={colors.amber} />

      <FlowArrow
        from={[1476, 330]}
        to={[1378, 156]}
        delay={112}
        color={colors.amber}
        dashed
        label="evaluation loop"
      />
    </div>
  );
};
