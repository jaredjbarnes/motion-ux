import AnimationConfigValidator from "./AnimationConfigValidator.js";
import AnimationUtility from "./AnimationUtility.js";

const validator = new AnimationConfigValidator();
const utility = new AnimationUtility();

export default class Animation {
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
    return new Animation(utility.normalizeConfig(config));
  }
}
