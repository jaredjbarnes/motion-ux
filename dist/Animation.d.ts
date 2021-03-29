import Animator from "./Animator";
import Keyframe from "./Keyframe";
import { SimpleKeyframeConfig } from "./KeyframeUtility";
import ParsedValue from "./ParsedValue";
import { IEasingNames } from "./createDynamicEasing";
declare type AnimationState = {
    [key: string]: {
        [key: string]: ParsedValue;
    };
};
export interface IAnimationKeyframes {
    [key: string]: {
        [key: string]: string | {
            value: string;
            controlsIn?: string[];
            controlsOut?: string[];
            easeIn?: IEasingNames;
            easeOut?: IEasingNames;
        };
    };
}
export default class Animation {
    animators: Animator[];
    _time: number;
    _currentValues: AnimationState;
    constructor(keyframes: Keyframe[] | SimpleKeyframeConfig[]);
    initialize(keyframes: Keyframe[] | SimpleKeyframeConfig[]): void;
    private _createCurrentValues;
    private _assignValue;
    private _saveCurrentValues;
    update(time: number): this;
    getCurrentValues(): AnimationState;
    merge(animation: Animation): this;
    static fromKeyframes(name: string, config: IAnimationKeyframes): Animation;
}
export {};
