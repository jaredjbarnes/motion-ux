import Keyframe from "./Keyframe";
export default class Animator<T> {
    private _keyframe;
    private _bezierCurve;
    private _time;
    get keyframe(): Keyframe<T>;
    constructor(keyframe: Keyframe<T>);
    private getNumberValue;
    private getDeltaValue;
    private getStringValue;
    private traverse;
    update(time: number): void;
}
