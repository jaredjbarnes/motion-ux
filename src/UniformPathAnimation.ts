import { PathAnimation } from "./PathAnimation";
import { IAnimation } from "./Animation";
import easings, { EasingFunction } from "./easings";
import { newtonsMethod, simpsonsRule } from "./math";
import { BezierCurve } from ".";
import { Path } from "./SvgPath";

interface CurveData {
  x: BezierCurve;
  y: BezierCurve;
  distance: number;
  offsetDistance: number;
  startAt: number;
  endAt: number;
}

export class UniformPathAnimation
  implements IAnimation<{ x: number; y: number }>
{
  protected _path: Path;
  protected _distance: number;
  protected _curveData: CurveData[];

  name = "";
  easing: EasingFunction;

  readonly currentValues = {
    x: 0,
    y: 0,
  };

  readonly deltaValues = {
    x: 0,
    y: 0,
  };

  get distance() {
    return this._distance;
  }

  constructor(path: Path, easing: EasingFunction = easings.linear) {
    this.easing = easing;
    this._path = path;
    this._curveData = this._path.xCurves.map((xCurve, index) => {
      const yCurve = this._path.yCurves[index];

      const distance = simpsonsRule(
        0,
        1,
        (t: number) => {
          const x = xCurve.deltaAt(t);
          const y = yCurve.deltaAt(t);

          return Math.sqrt(x * x + y * y);
        },
        4
      );

      return {
        x: xCurve,
        y: yCurve,
        distance,
        offsetDistance: 0,
        startAt: 0,
        endAt: 0,
      };
    });

    this._distance = this._curveData
      .map((curve) => curve.distance)
      .reduce((acc, next) => (acc += next), 0);

    let lastTo = 0;
    let distance = 0;
    this._curveData.forEach((curve) => {
      const percentage = curve.distance / this._distance;
      curve.startAt = lastTo;
      lastTo = curve.endAt = lastTo + percentage;
      curve.offsetDistance = distance;
      distance += curve.distance;
    });
  }

  update(time: number) {
    const easingTime = this.easing(time);
    const curve = this._curveData.find((curve, index) => {
      const isLowerBounds = easingTime < 0 && index === 1;
      const isOverBounds =
        easingTime > 1 && index === this._curveData.length - 1;
      return (
        isLowerBounds ||
        isOverBounds ||
        (easingTime >= curve.startAt && easingTime < curve.endAt)
      );
    });

    if (curve == null) {
      return this;
    }

    const distance = easingTime * this._distance;
    const adjustedDistance = distance - curve.offsetDistance;
    const remainder = easingTime - curve.startAt;
    const adjustedTime = remainder / (curve.endAt - curve.startAt);

    const integrand = (t: number) => {
      const x = curve.x.normalizedDeltaAt(t);
      const y = curve.y.normalizedDeltaAt(t);

      return Math.sqrt(x * x + y * y);
    };

    const uniformTime = newtonsMethod(
      (t) => {
        return simpsonsRule(0, t, integrand, 4) - adjustedDistance;
      },
      integrand,
      adjustedTime,
      10
    );

    this.currentValues.x = curve.x.valueAt(uniformTime);
    this.currentValues.y = curve.y.valueAt(uniformTime);
    this.deltaValues.x = curve.x.deltaAt(uniformTime);
    this.deltaValues.y = curve.y.deltaAt(uniformTime);

    return this;
  }

  clone() {
    return new UniformPathAnimation(this._path, this.easing);
  }
}
