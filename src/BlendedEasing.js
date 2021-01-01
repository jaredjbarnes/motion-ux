import BezierCurve from "./BezierCurve.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.easingA = options.easingA;
    this.easingB = options.easingB;

    const offsetValue = this.easingA.valueAt(options.offset);
    const pointsA = this.easingA.points
      .map((p) => this.easingA.valueAt(p) - offsetValue)
      .filter((p) => p >= 0);

    const points = this.easingB.points.slice();
    const firstPoint = pointsA[0];
    for (let x = 0; x < points.length; x++) {
      if (points[x] <= firstPoint) {
        points[x] = firstPoint;
      }
    }

    const index = points.lastIndexOf(0);

    pointsA.unshift(0);
    points.splice(index + 1, 0, ...pointsA);

    this.bezierCurve = new BezierCurve(points);
    this.validateOptions();
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
