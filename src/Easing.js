import BezierCurve from "./BezierCurve.js";

export default class Easing extends BezierCurve {
  constructor(points) {
    super(points);
  }

  validatePoints() {
    if (this.points[0] !== 0) {
      throw new Error("The first point needs to be zero");
    }

    if (this.points[this.points.length - 1] !== 1) {
      throw new Error("The last point needs to be one.");
    }
  }
}
