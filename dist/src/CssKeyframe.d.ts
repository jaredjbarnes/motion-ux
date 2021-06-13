import { EasingNames } from "./easings";
import Keyframe from "./Keyframe";
import { IAnimationKeyframes } from "./KeyframesGenerator";
export interface CssKeyframeConfig {
    property: string;
    to: string;
    from: string;
    endAt?: number;
    startAt?: number;
    controls?: string[];
    easing?: EasingNames;
}
export default class CssKeyframe extends Keyframe<(string | number)[]> {
    constructor({ from, to, easing, controls, ...config }: CssKeyframeConfig);
    static createKeyframes(animationKeyframes: IAnimationKeyframes): Keyframe<(string | number)[]>[];
}
