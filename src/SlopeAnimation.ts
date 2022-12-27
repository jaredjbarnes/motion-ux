import Keyframe from "./Keyframe";
import Animation from "./Animation";
import { deepClone } from "./deepClone";
import ObjectOperator from "./ObjectOperator";

const objectOperator = new ObjectOperator();

export default class SlopeAnimation<T> extends Animation<T> {
  constructor(currentValues: T, delta: T, duration: number) {
    const durationObject = deepClone(currentValues);
    const totalChange = deepClone(currentValues);
    const to = deepClone(currentValues);
    const from = deepClone(currentValues);

    objectOperator.assign(durationObject, duration);
    objectOperator.multiply(delta, durationObject, totalChange);
    objectOperator.add(from, totalChange, to);

    const keyframes = Object.keys(currentValues as any).map((property) => {
      return new Keyframe({
        property,
        from: (from as any)[property],
        to: (to as any)[property],
        startAt: 0,
        endAt: 1,
      });
    }) as any;

    super("slope-animation", keyframes);
  }
}
