import { DynamicEasingNames } from "./createDynamicEasing";
import Keyframe from "./Keyframe";
export declare type IAnimatedProperties<T> = {
    [P in keyof T]: T[P] | IPercentageKeyframes<T[P]>;
};
export interface IPercentageKeyframes<TValue> {
    [key: string]: TValue | IKeyframeControls<TValue>;
    from: TValue | IKeyframeControls<TValue>;
    to: TValue | IKeyframeControls<TValue>;
}
export interface IKeyframeControls<TValue> {
    value: TValue;
    controlsIn?: TValue[];
    controlsOut?: TValue[];
    easeIn?: DynamicEasingNames;
    easeOut?: DynamicEasingNames;
}
export default class KeyframesGenerator {
    private transformValue;
    setTransformValue(transformValue: (value: any) => any): void;
    isComplexKeyframe(value: any): any;
    isPercentageKeyframe(value: any): any;
    isObject(value: any): boolean;
    sortPercentages: (keyA: string, keyB: string) => 0 | 1 | -1;
    getDecimalFromPercentage(percentage: string): number;
    getEaseIn<T>(currentValue: IKeyframeControls<T>): "linear" | "quad" | "cubic" | "quart" | "back" | "quint" | "expo" | "circ" | "elastic";
    getEaseOut<T>(nextValue: IKeyframeControls<T>): "linear" | "quad" | "cubic" | "quart" | "back" | "quint" | "expo" | "circ" | "elastic";
    getControlsIn<T>(currentValue: IKeyframeControls<T>): any[];
    getControlsOut<T>(nextValue: IKeyframeControls<T>): any[];
    getFrom<T>(currentValue: IKeyframeControls<T>): any;
    getTo<T>(nextValue: IKeyframeControls<T>): any;
    wrapValue<T>(value: T): IKeyframeControls<T>;
    normalizeValue<T>(value: T | IKeyframeControls<T>): IKeyframeControls<T>;
    normalizeKeyframeValue<T>(value: T | IKeyframeControls<T> | IPercentageKeyframes<T>): IPercentageKeyframes<T>;
    generate<T>(animatedProperties: IAnimatedProperties<T>): Keyframe<T>[];
}
