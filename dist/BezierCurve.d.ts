export default class BezierCurve {
    points: any;
    reducedPoints: any;
    constructor(points: number[]);
    setPoints(points: number[]): void;
    valueAt(percentage: number): any;
    clone(): BezierCurve;
}
