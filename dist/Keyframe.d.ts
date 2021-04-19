import { EasingFunction } from "./easings";
import { SimpleKeyframeConfig } from "./KeyframeUtility";
import ParsedValue from "./ParsedValue";
export interface KeyframeConfig {
    name: string;
    property: string;
    to: ParsedValue;
    from: ParsedValue;
    endAt: number;
    startAt: number;
    controls?: ParsedValue[];
    easing?: EasingFunction;
}
export default class Keyframe {
    name: string;
    property: string;
    to: ParsedValue;
    from: ParsedValue;
    result: ParsedValue;
    startAt: number;
    endAt: number;
    controls: ParsedValue[];
    easing: EasingFunction;
    constructor(config: KeyframeConfig);
    static fromSimpleConfig(config: SimpleKeyframeConfig): Keyframe;
}
