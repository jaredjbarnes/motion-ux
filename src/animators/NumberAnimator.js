export default class NumberAnimator {
  constructor(options) {
    this.options = options;
    this.from = options.from;
    this.to = options.to;
    this.change = this.to - this.from;
  }

  render(progress) {
    if (progress <= this.options.startAt) {
      return this.from;
    }

    if (progress >= this.options.endAt) {
      return this.to;
    }

    const relativeProgress = progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;
    const progressWithEasing = this.options.easing(relativeProgress, 0, 1, duration);

    return this.from + this.change * progressWithEasing;
  }
}
