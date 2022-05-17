import BezierCurve from "./BezierCurve";
export declare class Path {
    protected position: {
        x: number;
        y: number;
    };
    protected pathString: string;
    protected _xBezierCurves: BezierCurve[];
    protected _yBezierCurves: BezierCurve[];
    get xCurves(): ReadonlyArray<BezierCurve>;
    get yCurves(): ReadonlyArray<BezierCurve>;
    get curveCount(): number;
    constructor(pathString: string);
    private moveTo;
    private absoluteVerticalLine;
    private relativeVerticalLine;
    private absoluteHorizontalLine;
    private relativeHorizontalLine;
    private absoluteCurvedLine;
    private relativeCurvedLine;
}
