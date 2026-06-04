import { useCurrentFrame } from "remotion";
import { colors, fontFamily } from "../theme";
import { appear } from "./animation";

type CaptionProps = {
  text: string;
};

export const Caption = ({ text }: CaptionProps) => {
  const frame = useCurrentFrame();
  const opacity = appear(frame, 12, 20);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 42,
        transform: "translateX(-50%)",
        width: 1380,
        minHeight: 78,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 42px",
        borderRadius: 24,
        background: "rgba(3, 7, 18, 0.72)",
        border: "1px solid rgba(148, 163, 184, 0.28)",
        boxShadow: "0 20px 70px rgba(0, 0, 0, 0.35)",
        color: colors.text,
        fontFamily,
        fontSize: 30,
        lineHeight: 1.28,
        textAlign: "center",
        opacity
      }}
    >
      {text}
    </div>
  );
};
