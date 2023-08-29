import { EasingFunction } from "./easings";
import { DynamicEasingNames } from "./createDynamicEasing";
export interface IComplexKeyframeValue<T> {
    value: T;
    controlsIn?: T[];
    controlsOut?: T[];
    easeIn?: DynamicEasingNames;
    easeOut?: DynamicEasingNames;
}
export interface KeyframeConfig<T, K extends keyof T = keyof T> {
    property: K;
    to: T[K];
    from: T[K];
    endAt?: number;
    startAt?: number;
    controls?: T[K][];
    easing?: EasingFunction;
}
export declare function generateInitialDelta<T>(delta: T): T;
export default class Keyframe<T, K extends keyof T = keyof T> {
    property: K;
    to: T[K];
    from: T[K];
    startAt: number;
    endAt: number;
    controls: T[K][];
    easing: EasingFunction;
    constructor(config: KeyframeConfig<T, K>);
    clone(): Keyframe<T, K>;
}
