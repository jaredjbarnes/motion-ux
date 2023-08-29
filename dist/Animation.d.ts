import Animator from "./Animator";
import Keyframe from "./Keyframe";
export interface IAnimation<T> {
    name: string;
    currentValues: T;
    deltaValues: T;
    update(time: number): IAnimation<T>;
    clone(): IAnimation<T>;
}
export default class Animation<T extends {}> implements IAnimation<T> {
    protected animators: Animator<T>[];
    protected time: number;
    name: string;
    currentValues: T;
    deltaValues: T;
    constructor(name: string, keyframes: Keyframe<T, keyof T>[]);
    set keyframes(keyframes: Keyframe<T, keyof T>[]);
    get keyframes(): Keyframe<T, keyof T>[];
    protected _createCurrentValues(): void;
    private _saveCurrentValues;
    update(time: number): this;
    clone(): Animation<T>;
}
