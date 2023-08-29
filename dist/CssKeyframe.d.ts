import Keyframe, { KeyframeConfig } from "./Keyframe";
export default class CssKeyframe extends Keyframe<Record<string, (string | number)[]>> {
    constructor({ from, to, easing, controls, ...config }: KeyframeConfig<Record<string, string>>);
}
