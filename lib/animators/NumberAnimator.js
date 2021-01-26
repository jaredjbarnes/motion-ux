"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BezierCurve = _interopRequireDefault(require("../BezierCurve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NumberAnimator =
/*#__PURE__*/
function () {
  function NumberAnimator(options) {
    _classCallCheck(this, NumberAnimator);

    this.controls = Array.isArray(options.controls) ? options.controls : [];
    this.options = options;
    this.bezierCurve = new _BezierCurve.default(this.controls);
  }

  _createClass(NumberAnimator, [{
    key: "render",
    value: function render(progress) {
      if (progress <= this.options.startAt) {
        return this.controls[0];
      }

      if (progress >= this.options.endAt) {
        return this.controls[this.controls.length - 1];
      }

      var relativeProgress = progress - this.options.startAt;
      var duration = this.options.endAt - this.options.startAt;
      var progressWithEasing = this.options.easing.valueAt(relativeProgress) * duration;
      var value = this.bezierCurve.valueAt(progressWithEasing);
      return value;
    }
  }]);

  return NumberAnimator;
}();

exports.default = NumberAnimator;
//# sourceMappingURL=NumberAnimator.js.map