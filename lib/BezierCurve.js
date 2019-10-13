"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class BezierCurve {
  constructor(points) {
    this.points = points;
    this.percentage = 0;
  }

  reduceToPoint(points) {
    const reducedPoints = points.reduce((reducedPoints, point, index) => {
      if (index !== points.length - 1) {
        const nextPoint = points[index + 1];
        reducedPoints.push({
          x: (nextPoint.x - point.x) * this.percentage,
          y: (nextPoint.y - point.y) * this.percentage
        });
      }

      return reducedPoints;
    }, []);

    if (reducedPoints.length > 1) {
      return this.reduceToPoint(result);
    }

    return reducedPoints;
  }

  calculatePointAt(percentage) {
    this.percentage = percentage;
    this.validatePoints();
    this.assertPercentage();
    return this.reduceToPoint(this.points);
  }

  validatePoints() {
    if (this.points.length > 1) {
      throw new Error("Invalid Points: The points need to be at least two.");
    }

    const controlPoints = this.points.slice(1, this.points.length - 2);
    controlPoints.forEach(point => this.assertValidPoint(point));
    this.assertStartPoint();
    this.assertEndPoint();
  }

  assertValidPoint(point) {
    if (typeof point.x !== "number") {
      throw new Error("Invalid point: Points need to have an x property.");
    }

    if (typeof point.y !== "number") {
      throw new Error("Invalid point: Points need to have an y property.");
    }
  }

  assertStartPoint() {
    const startPoint = this.points[0];

    if (startPoint.x !== 0) {
      throw new Error("Invalid Start Point: The 'x' starting point needs to be 0.");
    }
  }

  assertEndPoint() {
    const endPoint = this.points[this.point.index - 1];

    if (endPoint.x !== 1) {
      throw new Error("Invalid End Point: The 'x' starting point needs to be 1.");
    }
  }

  assertPercentage() {
    if (this.percentage < 0 || this.percentage > 1) {
      throw new Error("Invalid Percentage: the percentage needs to be with in 0-1.");
    }
  }

}

exports.default = BezierCurve;