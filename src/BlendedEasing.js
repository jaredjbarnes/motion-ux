import BezierCurve from "./BezierCurve.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.easingA = options.easingA;
    this.easingB = options.easingB;
    this.offset = options.offset;

    const slope = this.getSlope();
    const points = this.easingB.points.slice();

    this.from = new BezierCurve([0, slope]);
    this.to = new BezierCurve(points);
    this.easing = new BezierCurve([0, 0, 0, 1, 1, 1, 1, 1, 1]);

    this.validateOptions();
  }

  getSlope() {
    const deltaX = 0.0001;
    const rise =
      this.easingA.valueAt(deltaX + this.offset) -
      this.easingA.valueAt(this.offset);
    const run = deltaX;

    return rise / run;
  }

  valueAt(percentage) {
    const adjustedPercentage = this.easing.valueAt(percentage);

    const toValue = this.to.valueAt(percentage);
    const fromValue = this.from.valueAt(percentage);

    return fromValue + (toValue - fromValue) * adjustedPercentage;
  }

  validateOptions() {
    if (
      typeof this.easingA.valueAt !== "function" ||
      typeof this.easingB.valueAt !== "function"
    ) {
      throw new Error(
        "Both bezierCurveA and BezierCurveB need to have valueAt functions."
      );
    }
  }
}
