import { AnimationState, IAnimation } from "./Animation";
import { EasingFunction } from "./easings";
export declare class PathAnimation implements IAnimation<number> {
    private easing;
    private animation;
    private position;
    private pathString;
    name: string;
    get currentValues(): AnimationState<number>;
    constructor(pathString: string, easing?: EasingFunction);
    private moveTo;
    private absoluteVerticalLine;
    private relativeVerticalLine;
    private absoluteHorizontalLine;
    private relativeHorizontalLine;
    private absoluteCurvedLine;
    private relativeCurvedLine;
    update(time: number): IAnimation<number>;
    extend(): IAnimation<number>;
    clone(): IAnimation<number>;
}
