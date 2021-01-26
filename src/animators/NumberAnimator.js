import BezierCurve from "../BezierCurve";

export default class NumberAnimator {
  constructor(options) {
    this.controls = Array.isArray(options.controls) ? options.controls : [];
    this.options = options;
    this.bezierCurve = new BezierCurve(this.controls);
  }

  render(progress) {
    if (progress <= this.options.startAt) {
      return this.controls[0];
    }

    if (progress >= this.options.endAt) {
      return this.controls[this.controls.length - 1];
    }

    const relativeProgress = progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;
    const progressWithEasing =
      this.options.easing.valueAt(relativeProgress) * duration;

    const value = this.bezierCurve.valueAt(progressWithEasing);
    return value;
  }
}
