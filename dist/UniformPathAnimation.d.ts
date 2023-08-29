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
export declare class UniformPathAnimation implements IAnimation<{
    x: number;
    y: number;
}> {
    protected _path: Path;
    protected _distance: number;
    protected _curveData: CurveData[];
    name: string;
    easing: EasingFunction;
    readonly currentValues: {
        x: number;
        y: number;
    };
    readonly deltaValues: {
        x: number;
        y: number;
    };
    get distance(): number;
    constructor(path: Path, easing?: EasingFunction);
    update(time: number): this;
    clone(): UniformPathAnimation;
}
export {};
