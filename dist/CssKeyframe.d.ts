import Keyframe, { KeyframeConfig } from "./Keyframe";
export default class CssKeyframe extends Keyframe<(string | number)[]> {
    constructor({ from, to, easing, controls, ...config }: KeyframeConfig<string>);
}
