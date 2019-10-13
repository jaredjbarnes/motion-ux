export default class NumberAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
  }

  render(progress) {
    this.target[this.options.name] =  this.options.easing(
      progress - options.startAt,
      options.from,
      options.to - options.from,
      options.endAt - this.options.startAt
    );
  }

  static isMatch(options) {
    return typeof options.to === "number" && options.from === "number";
  }
}
