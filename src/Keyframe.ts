import { EasingFunction } from "./easings";
import KeyframeConfigValidator from "./KeyframeConfigValidator";
import KeyframeUtility, { SimpleKeyframeConfig } from "./KeyframeUtility";
import ParsedValue from "./ParsedValue";

const validator = new KeyframeConfigValidator();
const utility = new KeyframeUtility();

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
  public name: any;
  public property: any;
  public to: any;
  public from: any;
  public result: any;
  public startAt: any;
  public endAt: any;
  public controls: any;
  public easing: any;

  constructor(config: KeyframeConfig) {
    validator.setConfig(config);
    validator.validate(config);

    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.result = config.from.clone();
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = config.controls;
    this.easing = config.easing;
  }

  static fromSimpleConfig(config: SimpleKeyframeConfig) {
    return new Keyframe(utility.normalizeConfig(config));
  }
}
