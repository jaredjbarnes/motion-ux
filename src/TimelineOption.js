import easings from "./easings.js";

export default class TimelineOption {
  constructor(animation) {
    this.target = animation.target;
    this.name = animation.name;
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
    if (typeof this.name !== "string") {
      throw new Error(`The "name" property needs to be a string.`);
    }

    if (this.to == null) {
      throw new Error(`The "to" property cannot be null or undefined.`);
    }

    if (this.from == null) {
      throw new Error(`The "from" property cannot be null or undefined.`);
    }

    if (typeof this.target !== "object" || this.target == null) {
      throw new Error(
        `Invalid Arguments: The "target" property needs to be an object.`
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

    if (typeof this.easing !== "function") {
      throw new Error(`The "easing" property must be a function.`);
    }
  }
}
