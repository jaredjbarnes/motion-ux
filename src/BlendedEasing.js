import BezierCurve from "./BezierCurve.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.easingA = options.easingA;
    this.easingB = options.easingB;
    this.offset = options.offset;

    const firstControlPoint = this.getTangent();
    const points = this.easingB.points.slice();
    points.splice(1, 0, firstControlPoint);

    this.bezierCurve = new BezierCurve(points);
    this.validateOptions();
  }

  getTangent() {
    const deltaX = 0.0001;
    const rise =
      this.easingA.valueAt(deltaX + this.offset) -
      this.easingA.valueAt(this.offset);
    const run = deltaX;

    return (rise / run) * this.offset;
  }

  valueAt(percentage) {
    const value = this.bezierCurve.valueAt(percentage);
    return value;
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
