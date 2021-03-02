import easings from "./easings.js";
import AnimationConfigValidator from "./AnimationConfigValidator.js";
import ParsedValue from "./ParsedValue.js";

const validator = new AnimationConfigValidator();

export default class AnimationUtility {
  constructor() {
    this.config = null;
  }

  _setConfig(config) {
    this.config = config;
    this.result = {};
    validator.setConfig(config);
  }

  normalizeConfig(config) {
    this._setConfig(config);
    this._normalizeName();
    this._normalizeProperty();
    this._normalizeFrom();
    this._normalizeControls();
    this._normalizeTo();
    this._normalizeStartAt();
    this._normalizeEndAt();
    this._normalizeEasing();

    return this.result;
  }

  _normalizeName() {
    this.result.name = this.config.name;
  }

  _normalizeProperty() {
    this.result.property = this.config.property;
  }

  _normalizeFrom() {
    if (validator.hasValidFromAsString()) {
      this.result.from = new ParsedValue(this.config.from);
    } else {
      validator.validateFromAsString();
    }
  }

  _normalizeControls() {
    if (!Array.isArray(this.config.controls)) {
      this.config.controls = [];
    }

    if (validator.hasValidControlsAsStrings()) {
      this.result.controls = this.config.controls.map(
        (control) => new ParsedValue(control)
      );
    } else {
      validator.validateControlsAsStrings();
    }
  }

  _normalizeTo() {
    if (validator.hasValidToAsString()) {
      this.result.to = new ParsedValue(this.config.to);
    } else {
      validator.validateToAsString();
    }
  }

  _normalizeStartAt() {
    if (validator.hasValidStartAt()) {
      this.result.startAt = this.config.startAt;
    } else {
      this.result.startAt = 0;
    }
  }

  _normalizeEndAt() {
    if (validator.hasValidEndAt()) {
      this.result.endAt = this.config.endAt;
    } else {
      this.result.endAt = 1;
    }
  }

  _normalizeEasing() {
    if (
      !validator.hasValidEasingString() &&
      !validator.hasValidEasingFunction()
    ) {
      this.result.easing = easings.linear;
    } else if (validator.hasValidEasingString()) {
      this.result.easing = easings[this.config.easing] || easings.linear;
    } else if (validator.hasValidEasingFunction()) {
      this.result.easing = this.config.easing;
    }
  }
}
