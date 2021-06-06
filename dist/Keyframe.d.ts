import { EasingFunction } from "./easings";
import { DynamicEasingNames } from "./createDynamicEasing";
import { IAnimationKeyframes } from "./KeyframesGenerator";
export interface IComplexKeyframeValue<T> {
    value: T;
    controlsIn?: T[];
    controlsOut?: T[];
    easeIn?: DynamicEasingNames;
    easeOut?: DynamicEasingNames;
}
export interface KeyframeConfig<T> {
    property: string;
    to: T;
    from: T;
    endAt?: number;
    startAt?: number;
    controls?: T[];
    easing?: EasingFunction;
}
export default class Keyframe<T> {
    property: string;
    to: T;
    from: T;
    result: T;
    startAt: number;
    endAt: number;
    controls: T[];
    easing: EasingFunction;
    constructor(config: KeyframeConfig<T>);
    static createKeyframes(animationKeyframes: IAnimationKeyframes): Keyframe<any>[];
    clone(): Keyframe<any>;
}
