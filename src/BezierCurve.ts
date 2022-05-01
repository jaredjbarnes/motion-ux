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
    if (coefficients.length < 0) {
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

  newValueAt(t: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let i = 0; i <= n; i++) {
      const pointCoefficient = coefficients[i];
      result += this.bernsteinPolynomial(n, i, t) * pointCoefficient;
    }

    return result;
  }

  bernsteinPolynomial(n: number, k: number, t: number) {
    if (k > n || n < 0) {
      return 0;
    }
    const binomialCoefficient = nChooseK(n, k);
    const tValue = Math.pow(t, k);
    const remainingT = Math.pow(1 - t, n - k);

    return binomialCoefficient * tValue * remainingT;
  }

  deltaAt(t: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length - 1;
    let result = 0;

    for (let i = 0; i <= n; i++) {
      const pointCoefficient = coefficients[i];
      result +=
        n *
        (this.bernsteinPolynomial(n - 1, i - 1, t) -
          this.bernsteinPolynomial(n, i - 1, t)) *
        pointCoefficient;
    }

    return result;
  }

  integralAt(t: number) {
    const coefficients = this.coefficients;
    const n = coefficients.length;
    let result = 0;

    for (let i = 1; i <= n; i++) {
      const pointCoefficient = coefficients[i] || 1;
      result += this.bernsteinPolynomial(n, i, t) * pointCoefficient;
    }

    return (1 / n) * result;
  }

  clone() {
    return new BezierCurve(this.coefficients.slice());
  }
}
