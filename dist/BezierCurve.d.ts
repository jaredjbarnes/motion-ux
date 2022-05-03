export default class BezierCurve {
    private points;
    constructor(points: number[]);
    setCoefficients(coefficients: number[]): void;
    valueAt(x: number): number;
    deltaAt(x: number): number;
    sumAt(x: number): number;
    area(lowerBound: number, upperBound: number): number;
    clone(): BezierCurve;
}
