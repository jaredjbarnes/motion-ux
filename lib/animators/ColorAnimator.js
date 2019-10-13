"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RgbAnimator = _interopRequireDefault(require("./RgbAnimator.js"));

var _RgbaAnimator = _interopRequireDefault(require("./RgbaAnimator.js"));

var _HexAnimator = _interopRequireDefault(require("./HexAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ColorAnimator {
  constructor(options) {
    this.animator = null;
    this.options = options;

    if (_HexAnimator.default.isMatch(options)) {
      this.animator = new _HexAnimator.default(options);
    } else if (_RgbAnimator.default.isMatch(options)) {
      this.animator = new _RgbAnimator.default(options);
    } else if (_RgbaAnimator.default.isMatch(options)) {
      this.animator = new _RgbaAnimator.default(options);
    }
  }

  render(progress, duration) {
    if (this.animator == null) {
      throw new Error("Unable to detect the color animator.");
    }

    this.animator.render(progress, duration);
  }

  static isMatch(options) {
    return _HexAnimator.default.isMatch(options) || _RgbAnimator.default.isMatch(options) || _RgbaAnimator.default.isMatch(options);
  }

}

exports.default = ColorAnimator;