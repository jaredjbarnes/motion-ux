import easings from "./easings.js";
import ParsedValue from "./ParsedValue.js";

export default class Animation {
  constructor(config) {
    config.controls = Array.isArray(config.controls) ? config.controls : [];

    this.config = config;
    this.name = config.name;
    this.property = config.property;
    this.to = new ParsedValue(config.to);
    this.from = new ParsedValue(config.from);
    this.result = new ParsedValue(config.from);
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = config.controls.map((v) => new ParsedValue(v));

    this.normalizeEasing();
    this.validate();
  }

  setTo(value) {
    if (!(value instanceof ParsedValue)) {
      throw new Error("The value needs to be a ParsedValue.");
    }

    this.to = value;
    this.validateNodes();
  }

  setFrom(value) {
    if (!(value instanceof ParsedValue)) {
      throw new Error("The value needs to be a ParsedValue.");
    }

    this.from = value;
    this.validateNodes();
  }

  normalizeEasing() {
    const config = this.config;

    this.easing =
      typeof config.easing === "string"
        ? easings[config.easing]
        : config.easing;

    this.config.easing = this.easing = config.easing || easings.linear;
  }

  validate() {
    if (typeof this.property !== "string") {
      throw new Error(`The "property" property needs to be a string.`);
    }

    if (typeof this.config.to !== "string") {
      throw new Error(
        `The "to" property needs to be a string, but found ${this.to.value}.`
      );
    }

    if (typeof this.config.from !== "string") {
      throw new Error(
        `The "from" property needs to be a string, but found ${this.from.value}.`
      );
    }

    if (typeof this.config.name !== "string") {
      throw new Error(
        `Invalid Arguments: The "name" property needs to be an string.`
      );
    }

    if (
      typeof this.config.startAt !== "number" ||
      this.config.startAt < 0 ||
      this.config.startAt > 1
    ) {
      throw new Error(
        `The "startAt" property must be a number between 0 and 1.`
      );
    }

    if (
      typeof this.config.endAt !== "number" ||
      this.config.endAt < 0 ||
      this.config.endAt > 1
    ) {
      throw new Error(`The "endAt" property must be a number between 0 and 1.`);
    }

    if (typeof this.config.easing !== "function") {
      throw new Error(`The "easing" property must be a function.`);
    }

    this.validateNodes();
  }

  validateNodes() {
    let allStructuresAreEqual = true;

    if (this.to.graphHash !== this.from.graphHash) {
      allStructuresAreEqual = false;
    }

    for (let x = 0; x < this.controls.length; x++) {
      const value = this.controls[x];

      if (value.graphHash !== this.from.graphHash) {
        allStructuresAreEqual = false;
        break;
      }
    }

    if (!allStructuresAreEqual) {
      throw new Error(
        `Invalid Animation: The value types that are being animated do not match. From: ${JSON.stringify(
          this.from.value
        )}, To:${JSON.stringify(this.to.value)}, Controls: ${JSON.stringify(
          this.controls.map((v) => v.value)
        )}`
      );
    }
  }
}
