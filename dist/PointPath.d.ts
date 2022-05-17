import BezierCurve from "./BezierCurve";
import { Path } from "./SvgPath";
export declare class PointPath implements Path {
    private _xCurves;
    private _yCurves;
    get xCurves(): readonly BezierCurve[];
    get yCurves(): readonly BezierCurve[];
    get curveCount(): number;
    constructor(points: number[]);
}
