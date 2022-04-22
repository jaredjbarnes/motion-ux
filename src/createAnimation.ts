import KeyframesGenerator, { IAnimatedProperties } from "./KeyframesGenerator";
import Animation from "./Animation";

const keyframesGenerator = new KeyframesGenerator();

export function createAnimation<T>(animatedProperties: IAnimatedProperties<T>) {
  const keyframes = keyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation("", keyframes);

  return animation;
}
