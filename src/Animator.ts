import BezierCurve from "./BezierCurve";
import Keyframe from "./Keyframe";

const emptyArray: any[] = [];

export default class Animator<T> {
  public keyframe: Keyframe<T>;
  public bezierCurve: BezierCurve;
  public time: number;

  constructor(keyframe: Keyframe<T>) {
    this.keyframe = keyframe;
    this.time = 0;
    this.bezierCurve = new BezierCurve([]);
  }

  getNumberValue(from: any, controls: any[] = emptyArray, to: any) {
    const elapsedTime = this.time - this.keyframe.startAt;
    const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
    const timeWithEasing = this.keyframe.easing(
      elapsedTime / animationDuration
    );
    const points = [from, ...controls, to];
    this.bezierCurve.setPoints(points);
    return this.bezierCurve.valueAt(timeWithEasing);
  }

  getDeltaValue(from: any, controls: any[] = emptyArray, to: any) {
    const elapsedTime = this.time - this.keyframe.startAt;
    const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
    const timeWithEasing = this.keyframe.easing(
      elapsedTime / animationDuration
    );
    const points = [from, ...controls, to];
    this.bezierCurve.setPoints(points);
    return this.bezierCurve.deltaAt(timeWithEasing);
  }

  getStringValue(from: any, to: any) {
    if (this.time >= this.keyframe.startAt) {
      return to;
    } else {
      return from;
    }
  }

  traverse(
    fromObject: any,
    controlsObject: any,
    toObject: any,
    resultObject: any
  ) {
    for (let key in fromObject) {
      const from = fromObject[key];
      const to = toObject[key];
      const controls = controlsObject.map((c: any) => c[key]);

      if (typeof from === "number") {
        resultObject[key] = this.getNumberValue(from, controls, to);
      } else if (typeof from === "string") {
        resultObject[key] = this.getStringValue(from, to);
      } else if (typeof from === "object" && from != null) {
        this.traverse(
          fromObject[key],
          controls || emptyArray,
          toObject[key],
          resultObject[key]
        );
      }
    }
  }

  update(time: number) {
    this.time = time;

    if (typeof this.keyframe.from === "string") {
      this.keyframe.result = this.getStringValue(
        this.keyframe.from,
        this.keyframe.to
      );
    } else if (typeof this.keyframe.from === "number") {
      this.keyframe.result = this.getNumberValue(
        this.keyframe.from,
        this.keyframe.controls,
        this.keyframe.to
      ) as any as T;
    } else if (
      typeof this.keyframe.from === "object" &&
      this.keyframe.from != null
    ) {
      this.traverse(
        this.keyframe.from,
        this.keyframe.controls,
        this.keyframe.to,
        this.keyframe.result
      );
    }

    return this.keyframe.result;
  }
}
