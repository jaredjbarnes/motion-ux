const defaultPoints: number[] = [];

export function factorial(num: number) {
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
}

export function nChooseK(n: number, k: number) {
  return factorial(n) / (factorial(k) * factorial(n - k));
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
    const reducedCoefficients = this.reducedCoefficients;
    const length = coefficients.length;

    for (let x = 0; x < length; x++) {
      reducedCoefficients[x] = coefficients[x];
    }

    for (let i = 0; i < length; i++) {
      const innerLength = length - i - 1;

      for (let y = 0; y < innerLength; y++) {
        const nextPoint = reducedCoefficients[y + 1];
        const point = reducedCoefficients[y];

        reducedCoefficients[y] = (nextPoint - point) * x + point;
      }
    }
    return reducedCoefficients[0];
  }

  newValueAt(x: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = coefficients[v];
      result += this.bernsteinPolynomial(v, n, x) * pointCoefficient;
    }

    return result;
  }

  bernsteinPolynomial(v: number, n: number, x: number) {
    if (v > n || n < 0) {
      return 0;
    }
    const binomialCoefficient = nChooseK(n, v);
    const tValue = Math.pow(x, v);
    const remainingT = Math.pow(1 - x, n - v);

    return binomialCoefficient * tValue * remainingT;
  }

  deltaAt(x: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = coefficients[v];
      result +=
        n *
        (this.bernsteinPolynomial(v - 1, n - 1, x) -
          this.bernsteinPolynomial(v, n - 1, x)) *
        pointCoefficient;
    }

    return result;
  }

  integralAt(x: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let v = 0; v <= n; v++) {
      const pointCoefficient = coefficients[v];
      let innerSum = 0;

      for (let j = v + 1; j <= n + 1; j++) {
        innerSum += this.bernsteinPolynomial(j, n + 1, x);
      }

      result += (1 / (n + 1)) * innerSum * pointCoefficient;
    }

    return result;
  }

  area(lowerBound: number, upperBound: number) {
    return this.integralAt(upperBound) - this.integralAt(lowerBound);
  }

  clone() {
    return new BezierCurve(this.coefficients.slice());
  }
}
