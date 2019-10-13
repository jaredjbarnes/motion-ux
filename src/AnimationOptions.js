import easings from "./easings.js";

export default class AnimationOptions {
  constructor({ name, target, to, from, startAt, endAt, easing }) {
    this.target = target;
    this.name = name;
    this.to = to;
    this.from = from;
    this.startAt = startAt;
    this.endAt = endAt;

    if (typeof easing === "string") {
      this.easing = easings[easing];
    }

    this.easing = easing || easings.linear;

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
