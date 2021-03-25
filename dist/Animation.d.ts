import Animator from "./Animator";
import Keyframe from "./Keyframe";
import ParsedValue from "./ParsedValue";
declare type AnimationState = {
    [key: string]: {
        [key: string]: ParsedValue;
    };
};
export default class Animation {
    animators: Animator[];
    _time: number;
    _currentValues: AnimationState;
    constructor(keyframes: Keyframe[]);
    initialize(keyframes: Keyframe[]): void;
    private _createCurrentValues;
    private _assignValue;
    private _saveCurrentValues;
    update(time: number): this;
    getCurrentValues(): AnimationState;
    merge(animation: Animation): this;
}
export {};
