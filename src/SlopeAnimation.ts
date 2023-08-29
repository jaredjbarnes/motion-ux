import Keyframe from "./Keyframe";
import Animation from "./Animation";
import { deepClone } from "./deepClone";
import ObjectOperator from "./ObjectOperator";

const objectOperator = new ObjectOperator();

export class SlopeAnimation<T extends {}> extends Animation<T> {
  constructor(currentValues: T, delta: T, duration: number) {
    const durationObject = deepClone(currentValues);
    const totalChange = deepClone(currentValues);
    const to = deepClone(currentValues);
    const from = deepClone(currentValues);

    objectOperator.assign(durationObject, duration);
    objectOperator.multiply(delta, durationObject, totalChange);
    objectOperator.add(from, totalChange, to);

    const keys = Object.keys(currentValues) as unknown as (keyof T)[];
    const keyframes = keys.map((property) => {
      return new Keyframe<T, keyof T>({
        property,
        from: from[property],
        to: to[property],
        startAt: 0,
        endAt: 1,
      });
    });

    super("slope-animation", keyframes);
  }
}
