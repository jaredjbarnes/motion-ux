import { DynamicEasingNames } from "./createDynamicEasing";
import CssKeyframe from "./CssKeyframe";
export declare type ICssAnimatedProperties<T extends {}> = {
    [P in keyof T]: T[P] | ICssPercentageKeyframes<T[P]>;
};
export interface ICssPercentageKeyframes<TValue> {
    [key: string]: TValue | ICssKeyframeControls<TValue>;
    from: TValue | ICssKeyframeControls<TValue>;
    to: TValue | ICssKeyframeControls<TValue>;
}
export interface ICssKeyframeControls<TValue> {
    value: TValue;
    controlsIn?: TValue[];
    controlsOut?: TValue[];
    easeIn?: DynamicEasingNames;
    easeOut?: DynamicEasingNames;
}
export default class CSSKeyframesGenerator {
    private transformValue;
    setTransformValue(transformValue: (value: any) => any): void;
    isComplexKeyframe(value: any): any;
    sortPercentages: (keyA: string, keyB: string) => 0 | 1 | -1;
    getDecimalFromPercentage(percentage: string): number;
    getEaseIn<T>(currentValue: ICssKeyframeControls<T>): "linear" | "quad" | "cubic" | "quart" | "back" | "quint" | "expo" | "circ" | "elastic";
    getEaseOut<T>(nextValue: ICssKeyframeControls<T>): "linear" | "quad" | "cubic" | "quart" | "back" | "quint" | "expo" | "circ" | "elastic";
    getControlsIn<T>(currentValue: ICssKeyframeControls<T>): any[];
    getControlsOut<T>(nextValue: ICssKeyframeControls<T>): any[];
    getFrom<T>(currentValue: ICssKeyframeControls<T>): any;
    getTo<T>(nextValue: ICssKeyframeControls<T>): any;
    normalizePrimitiveValue<T>(value: T): ICssKeyframeControls<T>;
    normalizeValue<T>(value: T | ICssKeyframeControls<T>): ICssKeyframeControls<T>;
    normalizeKeyframeValue<T>(value: T | ICssKeyframeControls<T> | ICssPercentageKeyframes<T>): ICssPercentageKeyframes<T>;
    generate<T extends {}>(animatedProperties: ICssAnimatedProperties<T>): CssKeyframe[];
}
