import { DynamicEasingNames } from "./createDynamicEasing";
import Keyframe from "./Keyframe";
export interface IComplexKeyframeValue {
    value: any;
    controlsIn?: any[];
    controlsOut?: any[];
    easeIn?: DynamicEasingNames;
    easeOut?: DynamicEasingNames;
}
interface IAnimatableObject {
    [key: string]: IAnimationKeyframeValue;
}
export declare type IAnimationKeyframeValue = string | number | IComplexKeyframeValue;
export interface IAnimationKeyframes {
    [key: string]: IAnimatableObject;
    from: IAnimatableObject;
    to: IAnimatableObject;
}
export default class KeyframesGenerator {
    private transformValue;
    setTransformValue(transformValue: (value: any) => any): void;
    isComplexKeyframe(value: any): boolean;
    sortPercentages: (keyA: string, keyB: string) => 1 | 0 | -1;
    getDecimalFromPercentage(percentage: string): number;
    getEaseIn(currentValue: any): any;
    getEaseOut(nextValue: any): any;
    getControlsIn(currentValue: any): any;
    getControlsOut(nextValue: any): any;
    getFrom(currentValue: any): any;
    getTo(nextValue: any): any;
    generate<T = any>(animationKeyframes: IAnimationKeyframes): Keyframe<T>[];
}
export {};
