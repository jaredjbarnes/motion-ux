import AnimationConfigValidator from "./AnimationConfigValidator.js";

const validator = new AnimationConfigValidator();

export default class Animation {
  constructor(config) {
    validator.setConfig(config);
    validator.validateConfig(config);

    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.result = config.from.clone();
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = config.controls;
  }

  
}
