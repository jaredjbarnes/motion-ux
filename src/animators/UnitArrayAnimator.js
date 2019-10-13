import AnimationOptions from "../AnimationOptions.js";
import UnitAnimator from "./UnitAnimator.js";
import unitRegEx from "./unitRegEx.js";

export default class UnitArrayAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.fromArray = null;
    this.toArray = null;
    this.animationOptions = null;
    this.unitAnimators = null;

    this.parseFromArrays();
    this.parseToArrays();
    this.assertArraysAreEqualLength();
    this.createUnitAnimators();
  }

  render(progress, duration) {
    this.progress = progress;
    this.duration = duration;

    this.target[this.options.name] = this.toString();
  }

  parseFromArrays() {
    if (this.fromArray == null) {
      this.fromArray = this.options.from.trim().split(" ");
    }
  }

  parseToArrays() {
    if (this.toArray == null) {
      this.toArray = this.options.to.trim().split(" ");
    }
  }

  assertArraysAreEqualLength() {
    if (this.toArray.length !== this.fromArray.length) {
      throw new Error(
        `The unit arrays with in "${this.options.name}" aren't equal length.`
      );
    }
  }

  createUnitAnimators() {
    if (this.unitAnimators == null) {
      this.unitAnimators = this.fromArray.map((from, index) => {
        return new UnitAnimator(
          new AnimationOptions({
            target: {},
            name: this.options.name,
            from: from,
            to: this.toArray[index],
            startAt: this.options.startAt,
            endAt: this.options.endAt
          })
        );
      });
    }
  }

  toString() {
    const value = this.unitAnimators
      .map(animator => {
        animator.render(this.progress, this.duration);
        return animator.target[animator.options.name];
      })
      .join(" ");

    return value;
  }

  static isMatch({ from, to }) {
    return (
      typeof from === "string" &&
      typeof to === "string" &&
      from
        .trim()
        .split(" ")
        .every(unit => {
          unitRegEx.lastIndex = 0;
          unitRegEx.test(unit);
        }) &&
      to
        .trim()
        .split(" ")
        .every(unit => {
          unitRegEx.lastIndex = 0;
          unitRegEx.test(unit);
        })
    );
  }
}
