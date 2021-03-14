import KeyframeConfigValidator from "./KeyframeConfigValidator.js";
import KeyframeUtility from "./KeyframeUtility.js";

const validator = new KeyframeConfigValidator();
const utility = new KeyframeUtility();

export default class Keyframe {
  constructor(config) {
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

  static fromSimpleConfig(config) {
    return new Keyframe(utility.normalizeConfig(config));
  }
}
