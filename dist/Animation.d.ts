import Animator from "./Animator";
import Keyframe from "./Keyframe";
declare type AnimationState<T> = {
    [key: string]: T;
};
export default class Animation<T> {
    private _time;
    private _currentValues;
    name: string;
    animators: Animator<T>[];
    constructor(name: string, keyframes: Keyframe<T>[]);
    initialize(keyframes: Keyframe<T>[]): void;
    private _createCurrentValues;
    private _saveCurrentValues;
    update(time: number): this;
    getCurrentValues(): AnimationState<T>;
    merge(animation: Animation<T>): this;
}
export {};
