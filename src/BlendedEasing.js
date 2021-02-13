import BezierCurve from "./BezierCurve.js";
import Easing from "./Easing.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.fromEasing = options.from;
    this.offset = options.offset;
    this.toEasing = options.to;
    this.transitionDuration =
      typeof options.transitionDuration === "number"
        ? options.transitionDuration
        : 0.25;

    this.validateOptions();

    this.slope = this.getSlope();
    this.continuedSlopeEasing = new BezierCurve([0, this.slope]);
    this.easing = new Easing([0, 0, 0, 1, 1, 1, 1, 1]);
  }

  // Use differential calculas to get slope.
  getSlope() {
    const deltaX = 0.01;

    let rise;

    if (this.offset < 1) {
      rise =
        this.fromEasing.valueAt(deltaX + this.offset) -
        this.fromEasing.valueAt(this.offset);
    } else {
      rise = this.fromEasing.valueAt(1) - this.fromEasing.valueAt(1 - deltaX);
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
        this.fromEasing.valueAt(fromPercentage) -
        this.fromEasing.valueAt(this.offset);
    } else {
      fromValue =
        this.continuedSlopeEasing.valueAt(fromPercentage - 1) +
        this.fromEasing.valueAt(1) -
        this.fromEasing.valueAt(this.offset);
    }

    return fromValue;
  }

  valueAt(percentage) {
    const adjustedPercentage = this.easing.valueAt(percentage / this.transitionDuration);
    const toValue = this.toEasing.valueAt(percentage);
    const fromValue = this.getFromValue(percentage);

    if (percentage < this.transitionDuration) {
      return fromValue + (toValue - fromValue) * adjustedPercentage;
    } else {
      return toValue;
    }
  }

  validateOptions() {
    if (
      typeof this.fromEasing.valueAt !== "function" ||
      typeof this.toEasing.valueAt !== "function"
    ) {
      throw new Error(
        "Both fromEasing and toEasing need to have a valueAt function."
      );
    }
  }
}
