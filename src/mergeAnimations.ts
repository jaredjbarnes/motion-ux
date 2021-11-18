import Animation from "./Animation";

export function mergeAnimations<T>(
  name: string,
  animationA: Animation<T>,
  animationB: Animation<T>,
  durationA: number,
  durationB: number
) {
  const totalDuration = durationA + durationB;
  const scaleA = durationA / totalDuration;
  const scaleB = durationB / totalDuration;
  const startA = 0;
  const startB = scaleA;

  animationA.keyframes.forEach((keyframe) => {
    keyframe.startAt = startA + scaleA * keyframe.startAt;
    keyframe.endAt = startA + scaleA * keyframe.endAt;
  });

  animationA.keyframes.forEach((keyframe) => {
    keyframe.startAt = startB + scaleB * keyframe.startAt;
    keyframe.endAt = startB + scaleB * keyframe.endAt;
  });

  return new Animation<T>(name, [
    ...animationA.keyframes,
    ...animationB.keyframes,
  ]);
}
