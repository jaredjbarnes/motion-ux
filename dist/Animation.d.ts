import Animator from "./Animator";
import Keyframe from "./Keyframe";
declare type AnimationState<T> = {
    [key: string]: T;
};
export default class Animation<T> {
    protected _time: number;
    protected animators: Animator<T>[];
    name: string;
    currentValues: AnimationState<T>;
    constructor(name: string, keyframes: Keyframe<T>[]);
    protected _createCurrentValues(): void;
    private _saveCurrentValues;
    update(time: number): this;
}
export {};
