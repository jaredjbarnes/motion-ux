import { IAnimation } from "./Animation";
import { EasingFunction } from "./easings";
import { BezierCurve } from ".";
import { Path } from "./SvgPath";
interface CurveData {
    x: BezierCurve;
    y: BezierCurve;
    distance: number;
    offsetDistance: number;
    startAt: number;
    endAt: number;
}
export declare class UniformPathAnimation implements IAnimation<number> {
    protected path: Path;
    protected easing: EasingFunction;
    protected distance: number;
    protected curves: CurveData[];
    name: string;
    readonly currentValues: {
        x: number;
        y: number;
    };
    constructor(path: Path, easing?: EasingFunction);
    update(time: number): this;
    clone(): UniformPathAnimation;
}
export {};
