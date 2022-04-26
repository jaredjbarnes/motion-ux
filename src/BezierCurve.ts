const defaultPoints: number[] = [];

export default class BezierCurve {
  private coefficients: number[] = defaultPoints;

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

  valueAt(percentage: number) {
    let result = this.coefficients[0];
    const length = this.coefficients.length;

    for (let x = 1; x < length; x++) {
      const lastCoefficient = this.coefficients[x - 1];
      const coefficient = this.coefficients[x];

      result +=
        coefficient * Math.pow(percentage, x) -
        lastCoefficient * Math.pow(percentage, x);
    }

    return result + this.coefficients[0];
  }

  integrationValueAt(percentage: number) {
    let result = this.coefficients[0] * percentage;
    const length = this.coefficients.length;

    for (let x = 1; x < length; x++) {
      const lastCoefficient = this.coefficients[x - 1];
      const coefficient = this.coefficients[x];

      result +=
        (coefficient * Math.pow(percentage, x + 1)) / (x + 1) -
        (lastCoefficient * Math.pow(percentage, x + 1)) / (x + 1);
    }

    return result + this.coefficients[0];
  }

  differentiationValueAt(percentage: number) {
    let result = this.coefficients[1] - this.coefficients[0];
    const length = this.coefficients.length;

    for (let x = 2; x < length; x++) {
      const lastCoefficient = this.coefficients[x - 1];
      const coefficient = this.coefficients[x];

      result +=
        x * coefficient * Math.pow(percentage, x - 1) -
        x * lastCoefficient * Math.pow(percentage, x - 1);
    }

    return result + this.coefficients[0];
  }

  clone() {
    return new BezierCurve(this.coefficients.slice());
  }
}
