"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RgbAnimator = _interopRequireDefault(require("./RgbAnimator.js"));

var _RgbaAnimator = _interopRequireDefault(require("./RgbaAnimator.js"));

var _HexAnimator = _interopRequireDefault(require("./HexAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColorAnimator =
/*#__PURE__*/
function () {
  function ColorAnimator(options) {
    _classCallCheck(this, ColorAnimator);

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

  _createClass(ColorAnimator, [{
    key: "render",
    value: function render(progress, duration) {
      if (this.animator == null) {
        throw new Error("Unable to detect the color animator.");
      }

      this.animator.render(progress, duration);
    }
  }], [{
    key: "isMatch",
    value: function isMatch(options) {
      return _HexAnimator.default.isMatch(options) || _RgbAnimator.default.isMatch(options) || _RgbaAnimator.default.isMatch(options);
    }
  }]);

  return ColorAnimator;
}();

exports.default = ColorAnimator;
//# sourceMappingURL=ColorAnimator.js.map