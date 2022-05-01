import BezierCurve from "./BezierCurve";

export const easingOutMap = {
  linear: [1],
  quad: [1, 1],
  cubic: [1, 1, 1],
  quart: [1, 1, 1, 1],
  back: [0, 0, -0.5],
  quint: [1, 1, 1, 1, 1],
  expo: [1, 1, 1, 1, 1, 1],
  circ: [0.65, 0.75, 0.85, 0.95, 1, 1, 1, 1],
  elastic: [2, 2, -1, 1.5, 1.5, 0.75, 1.25, 0.85, 1, 1, 1],
};

export const easingInMap = {
  linear: [0],
  quad: [0, 0],
  cubic: [0, 0, 0],
  quart: [0, 0, 0, 0],
  back: [1.5, 1, 1],
  quint: [0, 0, 0, 0, 0],
  expo: [0, 0, 0, 0, 0, 0],
  circ: [0, 0, 0, 0, 0.05, 0.15, 0.25, 0.35],
  elastic: [0, 0, 0, 0.15, -0.25, 0.25, -0.5, -0.5, 2, -1, -1],
};

export type DynamicEasingNames = keyof typeof easingInMap;

export default function createDynamicEasing(
  easingIn: DynamicEasingNames,
  easingOut: DynamicEasingNames
) {
  const points = [...easingInMap[easingIn], ...easingOutMap[easingOut]];
  const bezierCurve = new BezierCurve(points);

  return (percentage: number) => {
    return bezierCurve.valueAt(percentage);
  };
}
