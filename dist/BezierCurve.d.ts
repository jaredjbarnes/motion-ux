export default class BezierCurve {
    private coefficients;
    constructor(coefficients: number[]);
    setCoefficients(coefficients: number[]): void;
    valueAt(x: number): number;
    integralAt(x: number): number;
    deltaAt(x: number): number;
    clone(): BezierCurve;
}
