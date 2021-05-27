export default class BezierCurve {
    points: number[];
    reducedPoints: number[];
    constructor(points: number[]);
    setPoints(points: number[]): void;
    valueAt(percentage: number): number;
    clone(): BezierCurve;
}
