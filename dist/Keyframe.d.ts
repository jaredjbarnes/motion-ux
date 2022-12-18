import { EasingFunction } from "./easings";
import { DynamicEasingNames } from "./createDynamicEasing";
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
export declare function generateInitialDelta<T>(delta: T): T;
export default class Keyframe<T> {
    property: string;
    to: T;
    from: T;
    result: T;
    delta: T;
    fromDelta: T;
    startAt: number;
    endAt: number;
    controls: T[];
    easing: EasingFunction;
    constructor(config: KeyframeConfig<T>);
    clone(): Keyframe<T>;
}
