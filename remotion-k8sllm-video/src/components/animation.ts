import { Easing, interpolate } from "remotion";

export const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const clampInterpolate = (
  frame: number,
  input: [number, number],
  output: [number, number]
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease
  });

export const appear = (frame: number, delay = 0, duration = 24) =>
  clampInterpolate(frame, [delay, delay + duration], [0, 1]);

export const pulse = (frame: number, period: number, min = 0.35, max = 1) => {
  const wave = (Math.sin((frame / period) * Math.PI * 2) + 1) / 2;
  return min + wave * (max - min);
};
