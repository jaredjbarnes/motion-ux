import BezierCurve from "./BezierCurve.js";

export default class BlendedEasing {
  constructor(options) {
    options = options || {};
    this.easingA = options.easingA;
    this.offset = options.offset;
    
    const slope = this.getSlope();
    
    this.to = options.easingB;
    this.from = new BezierCurve([0, slope]);
    this.easing = new BezierCurve([0, 0, 0, 1, 1, 1, 1, 1, 1]);

    this.validateOptions();
  }

  getSlope() {
    const deltaX = 0.0001;
    const rise =
      this.easingA.valueAt(deltaX + this.offset) -
      this.easingA.valueAt(this.offset);
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
        "Both bezierCurveA and BezierCurveB need to have valueAt functions."
      );
    }
  }
}
