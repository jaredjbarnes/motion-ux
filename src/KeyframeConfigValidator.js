import ParsedValue from "./ParsedValue";

export default class KeyframeConfigValidator {
  constructor() {
    this.config = null;
  }

  setConfig(config) {
    this.config = config;
  }

  isSimpleConfig() {
    return this.hasValidToAsString();
  }

  validateConfig() {
    if (this.config == null) {
      throw new Error(
        `Invalid Arguments: The "config" cannot be null or undefined.`
      );
    }
  }

  validate(config) {
    this.setConfig(config);
    this.validateName();
    this.validateProperty();
    this.validateToAsParsedValue();
    this.validateControlsAsParsedValues();
    this.validateFromAsParsedValue();
    this.validateStartAt();
    this.validateEndAt();
    this.validateEasingFunction();
    this.validateNodes();
  }

  validateName() {
    this.validateConfig();

    if (!this.hasValidName()) {
      throw new Error(
        `Invalid Arguments: The "name" property needs to be an string.`
      );
    }
  }

  hasValidName() {
    return typeof this.config.name === "string";
  }

  validateProperty() {
    this.validateConfig();

    if (!this.hasValidProperty()) {
      throw new Error(`The "property" property needs to be a string.`);
    }
  }

  hasValidProperty() {
    return typeof this.config.property === "string";
  }

  validateToAsString() {
    this.validateConfig();

    if (!this.hasValidToAsString()) {
      throw new Error(
        `The "to" property needs to be a string, but found ${this.config.to}.`
      );
    }
  }

  hasValidToAsString() {
    return typeof this.config.to === "string";
  }

  validateToAsParsedValue() {
    this.validateConfig();

    if (!this.hasValidToAsParsedValue()) {
      throw new Error(
        `The "to" property needs to be a ParsedValue, but found ${this.config.to}.`
      );
    }
  }

  hasValidToAsParsedValue() {
    return this.config.to instanceof ParsedValue;
  }

  validateFromAsString() {
    this.validateConfig();

    if (typeof this.config.from !== "string") {
      throw new Error(
        `The "from" property needs to be a string, but found ${this.config.from}.`
      );
    }
  }

  hasValidFromAsString() {
    return typeof this.config.from === "string";
  }

  validateFromAsParsedValue() {
    this.validateConfig();

    if (!this.hasValidFromAsParsedValue()) {
      throw new Error(
        `The "from" property needs to be a ParsedValue, but found ${this.config.from}.`
      );
    }
  }

  hasValidFromAsParsedValue() {
    return this.config.from instanceof ParsedValue;
  }

  validateControlsAsStrings() {
    this.validateConfig();

    if (!this.hasValidControlsAsStrings()) {
      throw new Error(
        `The "controls" property needs to be made of strings, but found ${this.config.controls}.`
      );
    }
  }

  hasValidControlsAsStrings() {
    return (
      Array.isArray(this.config.controls) &&
      this.config.controls.every((control) => typeof control === "string")
    );
  }

  validateControlsAsParsedValues() {
    this.validateConfig();

    if (!this.hasValidControlsAsParsedValues()) {
      throw new Error(
        `The "controls" property needs to be made of ParsedValues, but found ${this.config.controls}.`
      );
    }
  }

  hasValidControlsAsParsedValues() {
    return this.config.controls.every(
      (control) => control instanceof ParsedValue
    );
  }

  validateStartAt() {
    this.validateConfig();

    if (!this.hasValidStartAt) {
      throw new Error(
        `The "startAt" property must be a number between 0 and 1.`
      );
    }
  }

  hasValidStartAt() {
    return (
      typeof this.config.startAt === "number" &&
      this.config.startAt >= 0 &&
      this.config.startAt <= 1
    );
  }

  validateEndAt() {
    this.validateConfig();

    if (!this.hasValidEndAt()) {
      throw new Error(`The "endAt" property must be a number between 0 and 1.`);
    }
  }

  hasValidEndAt() {
    return (
      typeof this.config.endAt === "number" &&
      this.config.endAt >= 0 &&
      this.config.endAt <= 1
    );
  }

  validateEasingString() {
    this.validateConfig();

    if (!this.hasValidEasingString()) {
      throw new Error(`The "easing" property must be a string.`);
    }
  }

  hasValidEasingString() {
    return typeof this.config.easing === "string";
  }

  validateEasingFunction() {
    this.validateConfig();

    if (!this.hasValidEasingFunction()) {
      throw new Error(`The "easing" property must be a function.`);
    }
  }

  hasValidEasingFunction() {
    return typeof this.config.easing === "function";
  }

  validateNodes() {
    this.validateConfig();
    const config = this.config;

    if (!this.areGraphStructuresEqual()) {
      throw new Error(
        `Invalid Keyframe: The value types that are being animated do not match. From: ${JSON.stringify(
          config.from.value
        )}, To:${JSON.stringify(config.to.value)}, Controls: ${JSON.stringify(
          config.controls.map((v) => v.value)
        )}`
      );
    }
  }

  areGraphStructuresEqual() {
    let allStructuresAreEqual = true;
    const config = this.config;

    if (config.to.graphHash !== config.from.graphHash) {
      allStructuresAreEqual = false;
    }

    for (let x = 0; x < config.controls.length; x++) {
      const value = config.controls[x];

      if (value.graphHash !== config.from.graphHash) {
        allStructuresAreEqual = false;
        break;
      }
    }

    return allStructuresAreEqual;
  }
}
