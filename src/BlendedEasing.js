import BezierCurve from "./BezierCurve.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.easingA = options.easingA;
    this.offset = options.offset;
    this.to = options.easingB;

    this.validateOptions();

    const slope = this.getSlope();
    this.from = new BezierCurve([0, slope]);
    this.easing = new BezierCurve([0, 1, 1, 1, 1, 1, 1, 1]);
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

  valueAt(percentage) {
    const adjustedPercentage = this.easing.valueAt(percentage);

    const toValue = this.to.valueAt(percentage);
    const fromValue = this.from.valueAt(percentage);

    return fromValue + (toValue - fromValue) * adjustedPercentage;
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
