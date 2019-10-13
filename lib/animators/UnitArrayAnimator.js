"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.to-string");

var _AnimationOptions = _interopRequireDefault(require("../AnimationOptions.js"));

var _UnitAnimator = _interopRequireDefault(require("./UnitAnimator.js"));

var _unitRegEx = _interopRequireDefault(require("./unitRegEx.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnitArrayAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.fromArray = null;
    this.toArray = null;
    this.animationOptions = null;
    this.unitAnimators = null;
    this.parseFromArrays();
    this.parseToArrays();
    this.assertArraysAreEqualLength();
    this.createUnitAnimators();
  }

  render(progress, duration) {
    this.progress = progress;
    this.duration = duration;
    this.target[this.options.name] = this.toString();
  }

  parseFromArrays() {
    if (this.fromArray == null) {
      this.fromArray = this.options.from.trim().split(" ");
    }
  }

  parseToArrays() {
    if (this.toArray == null) {
      this.toArray = this.options.to.trim().split(" ");
    }
  }

  assertArraysAreEqualLength() {
    if (this.toArray.length !== this.fromArray.length) {
      throw new Error("The unit arrays with in \"".concat(this.options.name, "\" aren't equal length."));
    }
  }

  createUnitAnimators() {
    if (this.unitAnimators == null) {
      this.unitAnimators = this.fromArray.map((from, index) => {
        return new _UnitAnimator.default(new _AnimationOptions.default({
          target: {},
          name: this.options.name,
          from: from,
          to: this.toArray[index],
          startAt: this.options.startAt,
          endAt: this.options.endAt
        }));
      });
    }
  }

  toString() {
    const value = this.unitAnimators.map(animator => {
      animator.render(this.progress, this.duration);
      return animator.target[animator.options.name];
    }).join(" ");
    return value;
  }

  static isMatch(_ref) {
    let {
      from,
      to
    } = _ref;
    return typeof from === "string" && typeof to === "string" && from.trim().split(" ").every(unit => {
      _unitRegEx.default.lastIndex = 0;

      _unitRegEx.default.test(unit);
    }) && to.trim().split(" ").every(unit => {
      _unitRegEx.default.lastIndex = 0;

      _unitRegEx.default.test(unit);
    });
  }

}

exports.default = UnitArrayAnimator;