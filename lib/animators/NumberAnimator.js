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

    this.target = options.target;
    this.options = options;
  }

  _createClass(NumberAnimator, [{
    key: "render",
    value: function render(progress) {
      this.target[this.options.name] = this.options.easing(progress - options.startAt, options.from, options.to - options.from, options.endAt - this.options.startAt);
    }
  }], [{
    key: "isMatch",
    value: function isMatch(options) {
      return typeof options.to === "number" && options.from === "number";
    }
  }]);

  return NumberAnimator;
}();

exports.default = NumberAnimator;
//# sourceMappingURL=NumberAnimator.js.map