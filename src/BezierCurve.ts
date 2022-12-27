import { bernsteinPolynomial } from "./math";

const defaultPoints: number[] = [];

function valueAt(x: number, points: number[]) {
  const pointCoefficients = points;
  const n = pointCoefficients.length - 1;
  let result = 0;

  for (let v = 0; v <= n; v++) {
    const pointCoefficient = pointCoefficients[v];
    result += bernsteinPolynomial(v, n, x) * pointCoefficient;
  }
  return result;
}

function deltaAt(x: number, points: number[]) {
  const pointCoefficients = points;
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
export default class BezierCurve {
  private points: number[] = defaultPoints;
  private normalizedPoints: number[] = defaultPoints;

  constructor(points: number[]) {
    this.setPoints(points);
  }

  setPoints(coefficients: number[]) {
    this.points = coefficients;
    const root = this.points[0];
    this.normalizedPoints = this.points.map((point) => {
      return point - root;
    });
  }

  valueAt(x: number) {
    return valueAt(x, this.points);
  }

  normalizedValueAt(x: number) {
    return valueAt(x, this.normalizedPoints);
  }

  deltaAt(x: number) {
    return deltaAt(x, this.points);
  }

  normalizedDeltaAt(x: number) {
    return deltaAt(x, this.normalizedPoints);
  }

  sumAt(x: number) {
    const pointCoefficients = this.normalizedPoints;
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
