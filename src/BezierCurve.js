export default class BezierCurve {
  constructor(points) {
    this.points = points;
    this.percentage = 0;
  }

  reduceToPoint(points) {
    const reducedPoints = points.reduce((reducedPoints, point, index) => {
      if (index !== points.length - 1) {
        const nextPoint = points[index + 1];
        reducedPoints.push((nextPoint - point) * this.percentage + point);
      }

      return reducedPoints;
    }, []);

    if (reducedPoints.length > 1) {
      return this.reduceToPoint(reducedPoints);
    }

    return reducedPoints[0];
  }

  valueAt(percentage) {
    this.percentage = percentage;

    this.validatePoints();
    const value = this.reduceToPoint(this.points);
    console.log(this.points, this.percentage, value);
    return value;
  }

  validatePoints() {
    if (this.points.length < 2) {
      throw new Error("Invalid Points: The points need to be at least two.");
    }

    const controlPoints = this.points.slice(1, this.points.length - 2);

    controlPoints.forEach(point => this.assertValidPoint(point));
  }

  assertValidPoint(point) {
    if (typeof point !== "number") {
      throw new Error("Invalid point: Points need to be numbers.");
    }
  }
}
