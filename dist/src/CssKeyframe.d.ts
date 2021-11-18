import { EasingNames } from "./easings";
import Keyframe from "./Keyframe";
export interface CssKeyframeConfig {
    property: string;
    to: string;
    from: string;
    endAt?: number;
    startAt?: number;
    controls?: string[];
    easing?: EasingNames | ((percentage: number) => number);
}
export default class CssKeyframe extends Keyframe<(string | number)[]> {
    constructor({ from, to, easing, controls, ...config }: CssKeyframeConfig);
}
