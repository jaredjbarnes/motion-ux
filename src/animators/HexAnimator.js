const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export default class HexAnimator {
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

  parsefromValue() {
    if (this.fromValue == null) {
      this.fromValue = rgbRegex.exec(this.hexToRgb(this.from)).slice(1);
    }
  }

  parsetoValue() {
    if (this.toValue == null) {
      this.toValue = rgbRegex.exec(this.hexToRgb(this.to)).slice(1);
    }
  }

  calculateChange() {
    if (this.changes == null) {
      const red = this.toValue[0] - this.fromValue[0];
      const green = this.toValue[1] - this.fromValue[1];
      const blue = this.toValue[2] - this.fromValue[2];

      this.changes = [red, green, blue];
    }
  }

  hexToRgb(hex) {
    hexRegEx.lastIndex = 0;
    const result = hexRegEx.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : null;
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

    this.target[this.options.name] = this.toHex();
  }

  

  calculateProgress() {
    const progress = this.progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;
    const progressWithEasing = this.options.easing(progress, 0, 1, duration);

    let red = this.fromValue[0] + this.change[0] * progressWithEasing;
    let green = this.fromValue[1] + this.change[1] * progressWithEasing;
    let blue = this.fromValue[2] + this.change[2] * progressWithEasing;

    red = Math.max(0, red);
    red = Math.min(255, red);

    green = Math.max(0, green);
    green = Math.min(255, green);

    blue = Math.max(0, blue);
    blue = Math.min(255, blue);

    this.values = [red, green, blue];
  }

  toHex() {
    const values = this.values;

    return (
      "#" +
      ((1 << 24) + (values[0] << 16) + (values[1] << 8) + values[2])
        .toString(16)
        .slice(1)
    );
  }

  static isMatch(options) {
    return hexRegEx.test(options.from) && rgbRegex.test(options.to);
  }
}
