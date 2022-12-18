import BezierCurve from "./BezierCurve";
import { deepClone } from "./deepClone";
import Keyframe from "./Keyframe";

const emptyArray: any[] = [];

export default class Animator<T> {
  private _initialValue: T;
  private _initialDelta: T;
  private _value: T;
  private _delta: T;
  private _keyframe: Keyframe<T>;
  private _bezierCurve: BezierCurve;
  private _time: number;

  get keyframe() {
    return this._keyframe;
  }

  get value() {
    return this._value;
  }

  get delta() {
    return this._delta;
  }

  get initialDelta() {
    return this._initialDelta;
  }

  get initialValue() {
    return this._initialValue;
  }

  constructor(keyframe: Keyframe<T>) {
    this._keyframe = keyframe;
    this._time = 0;
    this._bezierCurve = new BezierCurve([]);
    this._value = deepClone(keyframe.from);
    this._delta = deepClone(keyframe.from);

    this.update(0);

    this._initialValue = deepClone(this._value);
    this._initialDelta = deepClone(this._delta);
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
      const isNumber = typeof from === "number";
      const isString = typeof from === "string";
      const isObject = typeof from === "object" && from != null;

      if (isNumber) {
        resultObject[key] = this.getNumberValue(from, controls, to);
        deltaObject[key] = this.getDeltaValue(from, controls, to);
      } else if (isString) {
        resultObject[key] = this.getStringValue(from, to);
        deltaObject[key] = to;
      } else if (isObject) {
        this.traverse(
          fromObject[key],
          controls || emptyArray,
          toObject[key],
          resultObject[key],
          deltaObject[key]
        );
      } else {
        throw new Error("Only strings, numbers, and objects are animatable.");
      }
    }
  }

  update(time: number) {
    const isNull = this._keyframe.from == null;
    const isString = typeof this._keyframe.from === "string";
    const isNumber = typeof this._keyframe.from === "number";
    const isObject = typeof this._keyframe.from === "object" && !isNull;

    this._time = time;

    if (isString) {
      this._value = this.getStringValue(this._keyframe.from, this._keyframe.to);
      this._delta = this._keyframe.to;
    } else if (isNumber) {
      this._value = this.getNumberValue(
        this._keyframe.from as number,
        this._keyframe.controls as number[],
        this._keyframe.to as number
      ) as any as T;

      this._delta = this.getDeltaValue(
        this._keyframe.from as number,
        this._keyframe.controls as number[],
        this._keyframe.to as number
      ) as any as T;
    } else if (isObject) {
      this.traverse(
        this._keyframe.from,
        this._keyframe.controls,
        this._keyframe.to,
        this._value,
        this._delta
      );
    } else {
      throw new Error("Only strings, numbers, and objects are animatable.");
    }
  }
}
