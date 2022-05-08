import Animator from "./Animator";
import Keyframe from "./Keyframe";
export declare type AnimationState<T> = {
    [key: string]: T;
};
export interface IAnimation<T> {
    name: string;
    currentValues: AnimationState<T>;
    update(time: number): IAnimation<T>;
    clone(): IAnimation<T>;
}
export default class Animation<T> implements IAnimation<T> {
    protected animators: Animator<T>[];
    protected time: number;
    protected offset: number;
    name: string;
    currentValues: AnimationState<T>;
    constructor(name: string, keyframes: Keyframe<T>[]);
    set keyframes(keyframes: Keyframe<T>[]);
    get keyframes(): Keyframe<T>[];
    protected _createCurrentValues(): void;
    private _saveCurrentValues;
    update(time: number): this;
    clone(): Animation<T>;
}
