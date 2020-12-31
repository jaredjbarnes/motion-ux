import BezierCurve from "./BezierCurve.js";

export default class BlendedBezierCurve {
  constructor(options) {
    options = options || {};
    this.bezierCurveA = options.bezierCurveA;
    this.bezierCurveB = options.bezierCurveB;

    const offsetValue = this.bezierCurveA.valueAt(options.offset);
    const pointsA = this.bezierCurveA.points
      .map((p) => this.bezierCurveA.valueAt(p) - offsetValue)
      .filter((p) => p > 0);

    const points = this.bezierCurveB.points.slice();
    const firstPoint = pointsA[0];
    for (let x = 0; x < points.length; x++) {
      if (points[x] <= firstPoint) {
        points[x] = firstPoint;
      }
    }

    pointsA.unshift(0);
    points.splice(0, 0, ...pointsA);

    this.bezierCurve = new BezierCurve(points);
    this.validateOptions();
  }

  valueAt(percentage) {
    const value = this.bezierCurve.valueAt(percentage);
    return value;
  }

  validateOptions() {
    if (
      typeof this.bezierCurveA.valueAt !== "function" ||
      typeof this.bezierCurveB.valueAt !== "function"
    ) {
      throw new Error(
        "Both bezierCurveA and BezierCurveB need to have valueAt functions."
      );
    }
  }
}
