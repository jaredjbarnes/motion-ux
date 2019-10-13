const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

export default class RgbaAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.values = null;
    this.duration = null;
    this.fromValue = null;
    this.toValue = null;
    this.change = null;

    this.parsefromValue();
    this.parsetoValue();
    this.calculateChange();
  }

  render(progress, duration) {
    this.progress = progress;
    this.duration = duration;

    if (progress <= this.options.startAt) {
      this.target[this.options.name] = this.options.from;
      return;
    }

    if (progress >= this.options.endAt) {
      this.target[this.options.name] = this.options.to;
      return;
    }

    this.calculateProgress();
    this.target[this.options.name] = this.toRgba();
  }

  parsefromValue() {
    if (this.fromValue == null) {
      rgbaRegex.lastIndex = 0;
      this.fromValue = rgbaRegex
        .exec(this.options.from)
        .slice(1)
        .map(value => new Number(value).valueOf());
    }
  }

  parsetoValue() {
    if (this.toValue == null) {
      rgbaRegex.lastIndex = 0;
      this.toValue = rgbaRegex
        .exec(this.options.to)
        .slice(1)
        .map(value => new Number(value).valueOf());
    }
  }

  calculateChange() {
    if (this.change == null) {
      const red = this.toValue[0] - this.fromValue[0];
      const green = this.toValue[1] - this.fromValue[1];
      const blue = this.toValue[2] - this.fromValue[2];
      const alpha = this.toValue[3] - this.fromValue[3];

      this.change = [red, green, blue, alpha];
    }
  }

  calculateProgress() {
    const progress = this.progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;
    const progressWithEasing = this.options.easing(progress, 0, 1, duration);

    let red = this.fromValue[0] + this.change[0] * progressWithEasing;
    let green = this.fromValue[1] + this.change[1] * progressWithEasing;
    let blue = this.fromValue[2] + this.change[2] * progressWithEasing;
    let alpha = this.fromValue[3] + this.change[3] * progressWithEasing;

    red = Math.max(0, red);
    red = Math.min(255, red);

    green = Math.max(0, green);
    green = Math.min(255, green);

    blue = Math.max(0, blue);
    blue = Math.min(255, blue);

    alpha = Math.max(0, alpha);
    alpha = Math.min(1, alpha);

    this.values = [red, green, blue, alpha];
  }

  toRgba() {
    const [red, green, blue, alpha] = this.values;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  static isMatch(options) {
    rgbaRegex.lastIndex = 0;
    return rgbaRegex.test(options.from) && rgbaRegex.test(options.to);
  }
}
