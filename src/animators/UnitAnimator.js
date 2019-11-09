import unitRegEx from "./unitRegEx.js";

export default class UnitAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.fromValue = null;
    this.toValue = null;
    this.unit = null;
    this.change = null;

    this.parseFromValue();
    this.parseToValue();
    this.calculateChange();
    this.parseUnit();
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
    const value = this.toString();
    this.target[this.options.name] = value;
  }

  parseFromValue() {
    if (this.fromValue == null) {
      unitRegEx.lastIndex = 0;
      this.fromValue = new Number(
        unitRegEx.exec(this.options.from)[1]
      ).valueOf();
    }
  }

  parseToValue() {
    if (this.toValue == null) {
      unitRegEx.lastIndex = 0;
      this.toValue = new Number(unitRegEx.exec(this.options.to)[1]).valueOf();
    }
  }

  parseUnit() {
    if (this.unit == null) {
      unitRegEx.lastIndex = 0;
      const toUnit = unitRegEx.exec(this.options.to)[2];

      unitRegEx.lastIndex = 0;
      const fromUnit = unitRegEx.exec(this.options.from)[2];

      if (toUnit !== fromUnit) {
        throw new Error(
          `The "from" and "to" values of "${this.options.name}" are not the same unit type.`
        );
      }

      this.unit = toUnit || "";
    }
  }

  calculateChange() {
    if (this.change == null) {
      this.change = this.toValue - this.fromValue;
    }
  }

  calculateProgress() {
    const progress = this.progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;

    const easingProgress = this.options.easing(progress, 0, 1, duration);
    this.value = this.fromValue + easingProgress * this.change;
  }

  toString() {
    return `${this.value}${this.unit}`;
  }

  static isMatch(options) {
    unitRegEx.lastIndex = 0;
    return unitRegEx.test(options.to) && unitRegEx.test(options.from);
  }
}
