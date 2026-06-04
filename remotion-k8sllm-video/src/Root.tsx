import { Composition } from "remotion";
import { K8sLLMArchitectureVideo } from "./K8sLLMArchitectureVideo";

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_DURATION_SECONDS = 100;
export const VIDEO_DURATION_FRAMES = VIDEO_FPS * VIDEO_DURATION_SECONDS;

export const RemotionRoot = () => {
  return (
    <Composition
      id="K8sLLMArchitecture"
      component={K8sLLMArchitectureVideo}
      durationInFrames={VIDEO_DURATION_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
