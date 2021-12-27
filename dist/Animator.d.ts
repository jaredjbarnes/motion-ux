import BezierCurve from "./BezierCurve";
import Keyframe from "./Keyframe";
export default class Animator<T> {
    keyframe: Keyframe<T>;
    bezierCurve: BezierCurve;
    time: number;
    constructor(keyframe: Keyframe<T>);
    getNumberValue(from: any, controls: any[] | undefined, to: any): number;
    getStringValue(from: any, to: any): any;
    traverse(fromObject: any, controlsObject: any, toObject: any, resultObject: any): void;
    update(time: number): T;
}
