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
    name: any;
    property: any;
    to: any;
    from: any;
    result: any;
    startAt: any;
    endAt: any;
    controls: any;
    easing: any;
    constructor(config: KeyframeConfig);
    static fromSimpleConfig(config: SimpleKeyframeConfig): Keyframe;
}
