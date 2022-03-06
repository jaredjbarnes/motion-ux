import Animator from "./Animator";
import Keyframe from "./Keyframe";
import IAnimation from "./IAnimation";
declare type AnimationState<T> = {
    [key: string]: T;
};
export default class Animation<T> implements IAnimation<T> {
    protected animators: Animator<T>[];
    name: string;
    time: number;
    duration: number;
    currentValues: AnimationState<T>;
    constructor(name: string, keyframes: Keyframe<T>[]);
    set keyframes(keyframes: Keyframe<T>[]);
    get keyframes(): Keyframe<T>[];
    protected _createCurrentValues(): void;
    private _saveCurrentValues;
    update(time: number): this;
    clone(): Animation<T>;
}
export {};
