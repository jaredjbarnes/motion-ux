import { bernsteinPolynomial } from "./math";

const defaultPoints: number[] = [];

export function simpsonsRule(
  lowerBound: number,
  upperBound: number,
  f: (x: number) => number,
  n: number = 4
) {
  // Use Simpsons Rule to calculate the distance.
  let stripAmount = f(lowerBound);
  const stepAmount = (upperBound - lowerBound) / n;
  let currentX = lowerBound;

  for (let x = 0; x < n - 1; x++) {
    currentX += stepAmount;
    let coefficient = 4;

    if (x % 2 !== 0) {
      coefficient = 2;
    }

    stripAmount += coefficient * f(currentX);
  }

  stripAmount += f(upperBound);

  return (stepAmount / 3) * stripAmount;
}
export default class BezierCurve {
  private coefficients: number[] = defaultPoints;
  private reducedCoefficients: number[] = [];
  private integralCoefficients: number[][] = [];

  constructor(coefficients: number[]) {
    if (coefficients.length < 2) {
      throw new Error("Cannot have a curve with less than two coefficients.");
    }
    this.setCoefficients(coefficients);
  }

  setCoefficients(coefficients: number[]) {
    this.coefficients = coefficients;
    Object.freeze(this.coefficients);
  }

  valueAt(x: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = coefficients[v];
      result += bernsteinPolynomial(v, n, x) * pointCoefficient;
    }

    return result;
  }

  deltaAt(x: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = coefficients[v];
      result +=
        n *
        (bernsteinPolynomial(v - 1, n - 1, x) -
          bernsteinPolynomial(v, n - 1, x)) *
        pointCoefficient;
    }

    return result;
  }

  sumAt(x: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = coefficients[v];
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
    return new BezierCurve(this.coefficients.slice());
  }
}
