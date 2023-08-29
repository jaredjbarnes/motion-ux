import KeyframesGenerator, { IAnimatedProperties } from "./KeyframesGenerator";
import Animation from "./Animation";

const keyframesGenerator = new KeyframesGenerator();

export function createAnimation<T extends {}>(animatedProperties: IAnimatedProperties<T>) {
  const keyframes = keyframesGenerator.generate<T>(animatedProperties);
  const animation = new Animation<T>("", keyframes);

  return animation;
}
