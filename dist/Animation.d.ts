import Animator from "./Animator";
import Keyframe from "./Keyframe";
export declare type AnimationState<T> = {
    [key: string]: T;
};
export interface IAnimation<T> {
    name: string;
    currentValues: T;
    update(time: number): IAnimation<T>;
    clone(): IAnimation<T>;
}
export default class Animation<T> implements IAnimation<T> {
    protected animators: Animator<unknown>[];
    protected time: number;
    name: string;
    currentValues: T;
    deltaValues: T;
    constructor(name: string, keyframes: Keyframe<unknown>[]);
    set keyframes(keyframes: Keyframe<unknown>[]);
    get keyframes(): Keyframe<unknown>[];
    protected _createCurrentValues(): void;
    private _saveCurrentValues;
    update(time: number): this;
    clone(): Animation<T>;
}
