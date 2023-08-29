import Keyframe from "./Keyframe";
export default class Animator<T, K extends keyof T = keyof T> {
    private _initialValue;
    private _initialDelta;
    private _value;
    private _delta;
    private _keyframe;
    private _bezierCurve;
    private _time;
    get keyframe(): Keyframe<T, K>;
    get value(): T[K];
    get delta(): T[K];
    get initialDelta(): T[K];
    get initialValue(): T[K];
    constructor(keyframe: Keyframe<T, K>);
    private getNumberValue;
    private getDeltaValue;
    private getStringValue;
    private traverse;
    update(time: number): void;
}
