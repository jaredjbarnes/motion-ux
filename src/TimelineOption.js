import easings from "./easings.js";
import Easing from "./Easing.js";

export default class TimelineOption {
  constructor(animation) {
    this.name = animation.name;
    this.property = animation.property;
    this.to = animation.to;
    this.from = animation.from;
    this.startAt = animation.startAt;
    this.endAt = animation.endAt;
    this.easing = animation.easing;
    this.controls = animation.controls;

    if (typeof easing === "string") {
      this.easing = easings[easing];
    }

    if (!Array.isArray(this.controls)) {
      this.controls = [];
    }

    this.easing = this.easing || easings.linear;

    this.validate();
  }

  validate() {
    if (typeof this.property !== "string") {
      throw new Error(`The "property" property needs to be a string.`);
    }

    if (typeof this.to !== "string") {
      throw new Error(
        `The "to" property needs to be a string, but found ${this.to}.`
      );
    }

    if (typeof this.from !== "string") {
      throw new Error(
        `The "from" property needs to be a string, but found ${this.from}.`
      );
    }

    if (typeof this.name !== "string") {
      throw new Error(
        `Invalid Arguments: The "name" property needs to be an string.`
      );
    }

    if (
      typeof this.startAt !== "number" ||
      this.startAt < 0 ||
      this.startAt > 1
    ) {
      throw new Error(
        `The "startAt" property must be a number between 0 and 1.`
      );
    }

    if (typeof this.endAt !== "number" || this.endAt < 0 || this.endAt > 1) {
      throw new Error(`The "endAt" property must be a number between 0 and 1.`);
    }

    if (this.easing == null || typeof this.easing.valueAt !== "function") {
      throw new Error(`The "easing" property must be an instance of Easing.`);
    }
  }
}
