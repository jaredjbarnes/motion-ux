export default class BezierCurve {
  constructor(points) {
    this.points = points;
    this.reducedPoints = new Array(points.length);

    Object.freeze(this.points);
  }

  clone() {
    return new BezierCurve(this.points.slice());
  }

  valueAt(percentage) {
    const points = this.points;
    const reducedPoints = this.reducedPoints;
    const length = points.length;

    for (let x = 0; x < length; x++) {
      reducedPoints[x] = points[x];
    }

    for (let x = 0; x < length; x++) {
      const innerLength = length - x - 1;

      for (let y = 0; y < innerLength; y++) {
        const nextPoint = reducedPoints[y + 1];
        const point = reducedPoints[y];

        reducedPoints[y] = (nextPoint - point) * percentage + point;
      }
    }

    return reducedPoints[0];
  }

  validatePoints() {
    if (this.points.length < 2) {
      throw new Error("Invalid Points: The points need to be at least two.");
    }

    const controlPoints = this.points.slice(1, this.points.length - 2);

    controlPoints.forEach((point) => this.assertValidPoint(point));
  }

  assertValidPoint(point) {
    if (typeof point !== "number") {
      throw new Error("Invalid point: Points need to be numbers.");
    }
  }
}
