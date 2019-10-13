"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

var _unitRegEx = _interopRequireDefault(require("./unitRegEx.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnitAnimator {
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
      _unitRegEx.default.lastIndex = 0;
      this.fromValue = new Number(_unitRegEx.default.exec(this.options.from)[1]).valueOf();
    }
  }

  parseToValue() {
    if (this.toValue == null) {
      _unitRegEx.default.lastIndex = 0;
      this.toValue = new Number(_unitRegEx.default.exec(this.options.to)[1]).valueOf();
    }
  }

  parseUnit() {
    if (this.unit == null) {
      _unitRegEx.default.lastIndex = 0;

      const toUnit = _unitRegEx.default.exec(this.options.to)[2];

      _unitRegEx.default.lastIndex = 0;

      const fromUnit = _unitRegEx.default.exec(this.options.from)[2];

      if (toUnit !== fromUnit) {
        throw new Error("The \"from\" and \"to\" values of \"".concat(this.options.name, "\" are not the same unit type."));
      }

      this.unit = toUnit;
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
    return "".concat(this.value).concat(this.unit);
  }

  static isMatch(options) {
    _unitRegEx.default.lastIndex = 0;
    return _unitRegEx.default.test(options.to) && _unitRegEx.default.test(options.from);
  }

}

exports.default = UnitAnimator;