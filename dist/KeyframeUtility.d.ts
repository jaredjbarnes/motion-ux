import { EasingFunction, EasingNames as EasingAsStrings } from "./easings";
import { KeyframeConfig } from "./Keyframe";
export interface SimpleKeyframeConfig {
    name: string;
    property: string;
    to: string;
    from: string;
    endAt: number;
    startAt: number;
    controls: string[];
    easing: EasingAsStrings | EasingFunction;
    value: string;
}
export default class KeyframeUtility {
    config: SimpleKeyframeConfig;
    result: KeyframeConfig;
    private _setConfig;
    normalizeConfig(config: SimpleKeyframeConfig): KeyframeConfig;
    private _normalizeName;
    private _normalizeProperty;
    private _normalizeValue;
    private _normalizeFrom;
    private _normalizeControls;
    private _normalizeTo;
    private _normalizeStartAt;
    private _normalizeEndAt;
    private _normalizeEasing;
}
