import Animator from "./Animator";
import Keyframe from "./Keyframe";
import IAnimation from "./IAnimation";
import { AnimationState } from "./IAnimation";
export default class Animation<T> implements IAnimation<T> {
    protected animators: Animator<T>[];
    protected time: number;
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
