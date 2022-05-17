import BezierCurve from "./BezierCurve";
export interface Path {
    xCurves: readonly BezierCurve[];
    yCurves: readonly BezierCurve[];
    curveCount: number;
}
export declare class SvgPath implements Path {
    protected position: {
        x: number;
        y: number;
    };
    protected pathString: string;
    protected _xBezierCurves: BezierCurve[];
    protected _yBezierCurves: BezierCurve[];
    get xCurves(): readonly BezierCurve[];
    get yCurves(): readonly BezierCurve[];
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
