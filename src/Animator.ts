import BezierCurve from "./BezierCurve";
import Keyframe from "./Keyframe";

const emptyArray: any[] = [];

export default class Animator<T> {
  private _keyframe: Keyframe<T>;
  private _bezierCurve: BezierCurve;
  private _time: number;

  get keyframe() {
    return this._keyframe;
  }

  constructor(keyframe: Keyframe<T>) {
    this._keyframe = keyframe;
    this._time = 0;
    this._bezierCurve = new BezierCurve([]);
    this.update(0);
  }

  private getNumberValue(
    from: number,
    controls: number[] = emptyArray,
    to: number
  ) {
    const elapsedTime = this._time - this._keyframe.startAt;
    const animationDuration = this._keyframe.endAt - this._keyframe.startAt;
    const timeWithEasing = this._keyframe.easing(
      elapsedTime / animationDuration
    );
    const points = [from, ...controls, to];
    this._bezierCurve.setPoints(points);
    return this._bezierCurve.valueAt(timeWithEasing);
  }

  private getDeltaValue(
    from: number,
    controls: number[] = emptyArray,
    to: number
  ) {
    const elapsedTime = this._time - this._keyframe.startAt;
    const animationDuration = this._keyframe.endAt - this._keyframe.startAt;
    const timeWithEasing = this._keyframe.easing(
      elapsedTime / animationDuration
    );
    const points = [from, ...controls, to];
    this._bezierCurve.setPoints(points);
    return this._bezierCurve.deltaAt(timeWithEasing);
  }

  private getStringValue(from: any, to: any) {
    if (this._time >= this._keyframe.startAt) {
      return to;
    } else {
      return from;
    }
  }

  private traverse(
    fromObject: any,
    controlsObject: any,
    toObject: any,
    resultObject: any,
    deltaObject: any
  ) {
    for (let key in fromObject) {
      const from = fromObject[key];
      const to = toObject[key];
      const controls = controlsObject.map((c: any) => c[key]);

      if (typeof from === "number") {
        resultObject[key] = this.getNumberValue(from, controls, to);
        deltaObject[key] = this.getDeltaValue(from, controls, to);
      } else if (typeof from === "string") {
        resultObject[key] = this.getStringValue(from, to);
        deltaObject[key] = to;
      } else if (typeof from === "object" && from != null) {
        this.traverse(
          fromObject[key],
          controls || emptyArray,
          toObject[key],
          resultObject[key],
          deltaObject[key]
        );
      }
    }
  }

  update(time: number) {
    this._time = time;

    if (typeof this._keyframe.from === "string") {
      this._keyframe.result = this.getStringValue(
        this._keyframe.from,
        this._keyframe.to
      );

      this._keyframe.delta = this._keyframe.to;
    } else if (typeof this._keyframe.from === "number") {
      this._keyframe.result = this.getNumberValue(
        this._keyframe.from,
        this._keyframe.controls as number[],
        this._keyframe.to as number
      ) as any as T;

      this._keyframe.delta = this.getDeltaValue(
        this._keyframe.from,
        this._keyframe.controls as number[],
        this._keyframe.to as number
      ) as any as T;
    } else if (
      typeof this._keyframe.from === "object" &&
      this._keyframe.from != null
    ) {
      this.traverse(
        this._keyframe.from,
        this._keyframe.controls,
        this._keyframe.to,
        this._keyframe.result,
        this._keyframe.delta
      );
    }
  }
}
