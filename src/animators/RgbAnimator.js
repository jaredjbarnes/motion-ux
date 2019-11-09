import rgbRegex from "./rgbRegEx.js";

export default class RgbAnimator {
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
    this.calculateProgress();
  }

  render(progress, duration) {
    this.progress = progress;
    this.duration = duration;

    if (progress <= this.options.startAt){
      this.target[this.options.name] = this.options.from;
      return;
    }

    if (progress >= this.options.endAt){
      this.target[this.options.name] = this.options.to;
      return;
    }
    
    this.calculateProgress();
    this.target[this.options.name] = this.toRgb();
  }

  parsefromValue() {
    if (this.fromValue == null) {
      rgbRegex.lastIndex = 0;
      this.fromValue = rgbRegex
        .exec(this.options.from)
        .slice(1)
        .map(value => new Number(value).valueOf());
    }
  }

  parsetoValue() {
    if (this.toValue == null) {
      rgbRegex.lastIndex = 0;
      this.toValue = rgbRegex
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

      this.change = [red, green, blue];
    }
  }

  calculateProgress() {
    const progress = this.progress - this.options.startAt;
    const duration =(this.options.endAt - this.options.startAt);
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

  toRgb() {
    const [red, green, blue] = this.values;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  static isMatch(options) {
    rgbRegex.lastIndex = 0;
    return rgbRegex.test(options.from) && rgbRegex.test(options.to);
  }
}
