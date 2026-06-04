import { colors, fontFamily, monoFamily } from "../theme";
import { ArchitectureBox } from "./ArchitectureBox";

type ServiceLayerProps = {
  title: string;
  services: string[];
  x: number;
  y: number;
  width: number;
  delay?: number;
  color?: string;
};

export const ServiceLayer = ({
  title,
  services,
  x,
  y,
  width,
  delay = 0,
  color = colors.teal
}: ServiceLayerProps) => {
  const itemWidth = (width - 24 * (services.length - 1)) / services.length;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height: 148,
        fontFamily
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -34,
          left: 0,
          color,
          fontFamily: monoFamily,
          fontSize: 17,
          letterSpacing: 2,
          textTransform: "uppercase"
        }}
      >
        {title}
      </div>
      {services.map((service, index) => (
        <ArchitectureBox
          key={service}
          title={service}
          x={index * (itemWidth + 24)}
          y={0}
          width={itemWidth}
          height={112}
          delay={delay + index * 6}
          accent={color}
          icon={String(index + 1).padStart(2, "0")}
        />
      ))}
    </div>
  );
};
