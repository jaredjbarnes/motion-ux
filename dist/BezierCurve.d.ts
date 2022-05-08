export default class BezierCurve {
    private points;
    private normalizedPoints;
    constructor(points: number[]);
    setPoints(coefficients: number[]): void;
    valueAt(x: number): number;
    normalizedValueAt(x: number): number;
    deltaAt(x: number): number;
    normalizedDeltaAt(x: number): number;
    sumAt(x: number): number;
    area(lowerBound: number, upperBound: number): number;
    clone(): BezierCurve;
}
