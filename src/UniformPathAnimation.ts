import { PathAnimation } from "./PathAnimation";
import { AnimationState, IAnimation } from "./Animation";
import easings, { EasingFunction } from "./easings";
import { newtonsMethod, simpsonsRule } from "./math";
import { BezierCurve } from ".";

interface CurveData {
  x: BezierCurve;
  y: BezierCurve;
  distance: number;
  offsetDistance: number;
  startAt: number;
  endAt: number;
}

export class UniformPathAnimation implements IAnimation<number> {
  protected pathAnimation: PathAnimation;
  protected pathString: string;
  protected easing: EasingFunction;
  protected distance: number;
  protected curves: CurveData[];

  name = "";

  readonly currentValues = {
    x: 0,
    y: 0,
  };

  constructor(pathString: string, easing: EasingFunction = easings.linear) {
    this.pathString = pathString;
    this.easing = easing;
    this.pathAnimation = new PathAnimation(pathString);

    this.curves = this.pathAnimation.xBezierCurves.map((xCurve, index) => {
      const yCurve = this.pathAnimation.yBezierCurves[index];

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

    this.distance = this.curves
      .map((curve) => curve.distance)
      .reduce((acc, next) => (acc += next), 0);

    let lastTo = 0;
    let distance = 0;
    this.curves.forEach((curve) => {
      const percentage = curve.distance / this.distance;
      curve.startAt = lastTo;
      lastTo = curve.endAt = lastTo + percentage;
      curve.offsetDistance = distance;
      distance += curve.distance;
    });
  }

  update(time: number) {
    const easingTime = this.easing(time);
    const curve = this.curves.find((curve, index) => {
      const isLowerBounds = easingTime < 0 && index === 1;
      const isOverBounds = easingTime > 1 && index === this.curves.length - 1;
      return (
        isLowerBounds ||
        isOverBounds ||
        (easingTime >= curve.startAt && easingTime < curve.endAt)
      );
    });

    if (curve == null) {
      return this;
    }

    const distance = easingTime * this.distance;
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

    return this;
  }

  clone() {
    return new UniformPathAnimation(this.pathString, this.easing);
  }
}
