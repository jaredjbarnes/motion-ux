import Keyframe from "./Keyframe";
export default class Animator<T> {
    private _initialValue;
    private _initialDelta;
    private _value;
    private _delta;
    private _keyframe;
    private _bezierCurve;
    private _time;
    get keyframe(): Keyframe<T>;
    get value(): T;
    get delta(): T;
    get initialDelta(): T;
    get initialValue(): T;
    constructor(keyframe: Keyframe<T>);
    private getNumberValue;
    private getDeltaValue;
    private getStringValue;
    private traverse;
    update(time: number): void;
}
