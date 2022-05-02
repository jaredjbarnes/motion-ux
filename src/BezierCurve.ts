import { bernsteinPolynomial } from "./math";

const defaultPoints: number[] = [];

export default class BezierCurve {
  private points: number[] = defaultPoints;

  constructor(points: number[]) {
    if (points.length < 2) {
      throw new Error("Cannot have a curve with less than two coefficients.");
    }
    this.setCoefficients(points);
  }

  setCoefficients(coefficients: number[]) {
    this.points = coefficients;
    Object.freeze(this.points);
  }

  valueAt(x: number) {
    const pointCoefficients = this.points;
    const n = pointCoefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = pointCoefficients[v];
      result += bernsteinPolynomial(v, n, x) * pointCoefficient;
    }

    return result;
  }

  deltaAt(x: number) {
    const pointCoefficients = this.points;
    const n = pointCoefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = pointCoefficients[v];
      result +=
        n *
        (bernsteinPolynomial(v - 1, n - 1, x) -
          bernsteinPolynomial(v, n - 1, x)) *
        pointCoefficient;
    }

    return result;
  }

  sumAt(x: number) {
    const pointCoefficients = this.points;
    const n = pointCoefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = pointCoefficients[v];
      let innerSum = 0;

      for (let j = v + 1; j <= n + 1; j++) {
        innerSum += bernsteinPolynomial(j, n + 1, x);
      }

      result += (1 / (n + 1)) * innerSum * pointCoefficient;
    }

    return result;
  }

  area(lowerBound: number, upperBound: number) {
    return this.sumAt(upperBound) - this.sumAt(lowerBound);
  }

  clone() {
    return new BezierCurve(this.points.slice());
  }
}
