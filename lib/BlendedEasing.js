"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BezierCurve = _interopRequireDefault(require("./BezierCurve.js"));

var _Easing = _interopRequireDefault(require("./Easing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BlendedEasing =
/*#__PURE__*/
function () {
  function BlendedEasing(options) {
    _classCallCheck(this, BlendedEasing);

    options = options || {};
    this.easingA = options.easingA;
    this.offset = options.offset;
    this.to = options.easingB;
    this.validateOptions();
    this.slope = this.getSlope();
    this.from = new _BezierCurve.default([0, this.slope]);
    this.easing = new _Easing.default([0, 0, 2, 2, -1, 1.5, 1.5, 0.75, 1.25, 0.85, 1, 1, 1]);
  } // Use differential calculas to get slope.


  _createClass(BlendedEasing, [{
    key: "getSlope",
    value: function getSlope() {
      var deltaX = 0.01;
      var rise;

      if (this.offset < 1) {
        rise = this.easingA.valueAt(deltaX + this.offset) - this.easingA.valueAt(this.offset);
      } else {
        rise = this.easingA.valueAt(1) - this.easingA.valueAt(1 - deltaX);
      }

      var run = deltaX;
      return rise / run;
    }
  }, {
    key: "valueAt",
    value: function valueAt(percentage) {
      var adjustedPercentage = this.easing.valueAt(percentage);
      var toValue = this.to.valueAt(percentage);
      var fromValue = this.easingA.valueAt(Math.min(1, this.offset + percentage)) - this.easingA.valueAt(this.offset);
      return fromValue + (toValue - fromValue) * adjustedPercentage;
    }
  }, {
    key: "validateOptions",
    value: function validateOptions() {
      if (typeof this.easingA.valueAt !== "function" || typeof this.to.valueAt !== "function") {
        throw new Error("Both easingA and easingB need to have a valueAt function.");
      }
    }
  }]);

  return BlendedEasing;
}();

exports.default = BlendedEasing;
//# sourceMappingURL=BlendedEasing.js.map