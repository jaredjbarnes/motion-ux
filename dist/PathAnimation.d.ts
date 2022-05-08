import BezierCurve from "./BezierCurve";
import { AnimationState, IAnimation } from "./Animation";
import { EasingFunction } from "./easings";
export declare class PathAnimation implements IAnimation<number> {
    protected easing: EasingFunction;
    protected position: {
        x: number;
        y: number;
    };
    protected pathString: string;
    protected _currentValues: {
        x: number;
        y: number;
    };
    protected _deltaValues: {
        x: number;
        y: number;
    };
    readonly xBezierCurves: BezierCurve[];
    readonly yBezierCurves: BezierCurve[];
    name: string;
    get curveCount(): number;
    get currentValues(): AnimationState<number>;
    get deltaValues(): AnimationState<number>;
    constructor(pathString: string, easing?: EasingFunction);
    private moveTo;
    private absoluteVerticalLine;
    private relativeVerticalLine;
    private absoluteHorizontalLine;
    private relativeHorizontalLine;
    private absoluteCurvedLine;
    private relativeCurvedLine;
    update(time: number): IAnimation<number>;
    clone(): IAnimation<number>;
}
