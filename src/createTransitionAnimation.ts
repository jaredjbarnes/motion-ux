import ObjectOperator from "./ObjectOperator";
import KeyframeGenerator, { IAnimatedProperties } from "./KeyframesGenerator";
import Animation, { IAnimation } from "./Animation";
import { deepClone } from "./deepClone";
import BlendedAnimation from "./BlendedAnimation";
import easings from "./easings";

const DESIRED_FPS = 1000 / 60;

const objectOperator = new ObjectOperator();
const keyframeGenerator = new KeyframeGenerator();

export function createTransitionAnimation<T extends {}>(
  fromAnimation: IAnimation<T>,
  toAnimation: IAnimation<T>,
  duration: number
) {
  const from = deepClone(fromAnimation.currentValues);
  const delta = deepClone(fromAnimation.deltaValues);
  const to = deepClone(from);
  const multiplier = deepClone(from);
  const change = deepClone(from);
  const frames = duration / DESIRED_FPS;

  objectOperator.assign(multiplier, frames);
  objectOperator.divide(delta, multiplier, delta);
  objectOperator.multiply(delta, multiplier, change);
  objectOperator.add(from, change, to);

  const keys = Object.keys(from) as (keyof T)[];

  const keyframes = keys.reduce((acc, key) => {
    acc[key] = {
      from: deepClone(from[key as keyof T]),
      to: deepClone(to[key as keyof T]),
    };
    return acc;
  }, {} as IAnimatedProperties<T>);

  const slopeAnimation = new Animation<T>(
    "slope-animation",
    keyframeGenerator.generate(keyframes)
  );

  const animation = new BlendedAnimation(
    slopeAnimation,
    toAnimation,
    easings.linear
  );

  return animation;
}
