import BezierCurve from "./BezierCurve.js";
import Easing from "./Easing.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.easingA = options.easingA;
    this.offset = options.offset;
    this.to = options.easingB;

    this.validateOptions();

    this.slope = this.getSlope();
    this.from = new BezierCurve([0, this.slope]);
    this.easing = new Easing([0, 0, 0, 1, 1, 1, 1, 1]);
  }

  // Use differential calculas to get slope.
  getSlope() {
    const deltaX = 0.01;

    let rise;

    if (this.offset < 1) {
      rise =
        this.easingA.valueAt(deltaX + this.offset) -
        this.easingA.valueAt(this.offset);
    } else {
      rise = this.easingA.valueAt(1) - this.easingA.valueAt(1 - deltaX);
    }

    const run = deltaX;

    return rise / run;
  }

  getFromValue(percentage) {
    const fromPercentage = this.offset + percentage;
    let fromValue;

    // Get the value from the easing until it finishes then use the slope easing.
    if (fromPercentage <= 1) {
      fromValue =
        this.easingA.valueAt(fromPercentage) -
        this.easingA.valueAt(this.offset);
    } else {
      fromValue =
        this.from.valueAt(fromPercentage - 1) +
        this.easingA.valueAt(1) -
        this.easingA.valueAt(this.offset);
    }

    return fromValue;
  }

  valueAt(percentage) {
    const adjustedPercentage = this.easing.valueAt(percentage / 0.25);
    const toValue = this.to.valueAt(percentage);
    const fromValue = this.getFromValue(percentage);

    if (percentage < 0.25) {
      return fromValue + (toValue - fromValue) * adjustedPercentage;
    } else {
      return toValue;
    }
  }

  validateOptions() {
    if (
      typeof this.easingA.valueAt !== "function" ||
      typeof this.to.valueAt !== "function"
    ) {
      throw new Error(
        "Both easingA and easingB need to have a valueAt function."
      );
    }
  }
}
