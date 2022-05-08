import { PathAnimation } from "./PathAnimation";
import { IAnimation } from "./Animation";
import { EasingFunction } from "./easings";
import { BezierCurve } from ".";
interface CurveData {
    x: BezierCurve;
    y: BezierCurve;
    distance: number;
    offsetDistance: number;
    startAt: number;
    endAt: number;
}
export declare class NormalizedPathAnimation implements IAnimation<number> {
    protected pathAnimation: PathAnimation;
    protected pathString: string;
    protected easing: EasingFunction;
    protected distance: number;
    protected curves: CurveData[];
    name: string;
    readonly currentValues: {
        x: number;
        y: number;
    };
    constructor(pathString: string, easing?: EasingFunction);
    update(time: number): this;
    clone(): NormalizedPathAnimation;
}
export {};
