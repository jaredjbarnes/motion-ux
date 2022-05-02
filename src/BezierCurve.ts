const defaultPoints: number[] = [];

export function factorial(num: number) {
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
}

export function nChooseK(n: number, k: number) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

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
    if (v > n || v < 0) {
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

  sumAt(x: number) {
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
    return this.sumAt(upperBound) - this.sumAt(lowerBound);
  }

  distance(start = 0, end = 1, simpsonSteps = 4) {
    return simpsonsRule(
      start,
      end,
      (x) => {
        return Math.abs(this.deltaAt(x));
      },
      simpsonSteps
    );
  }

  clone() {
    return new BezierCurve(this.coefficients.slice());
  }
}
