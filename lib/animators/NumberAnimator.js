"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NumberAnimator =
/*#__PURE__*/
function () {
  function NumberAnimator(options) {
    _classCallCheck(this, NumberAnimator);

    this.options = options;
    this.from = options.from;
    this.to = options.to;
    this.change = this.to - this.from;
  }

  _createClass(NumberAnimator, [{
    key: "render",
    value: function render(progress) {
      if (progress <= this.options.startAt) {
        return this.from;
      }

      if (progress >= this.options.endAt) {
        return this.to;
      }

      var relativeProgress = progress - this.options.startAt;
      var duration = this.options.endAt - this.options.startAt;
      var progressWithEasing = this.options.easing(relativeProgress, 0, 1, duration);
      return this.from + this.change * progressWithEasing;
    }
  }]);

  return NumberAnimator;
}();

exports.default = NumberAnimator;
//# sourceMappingURL=NumberAnimator.js.map