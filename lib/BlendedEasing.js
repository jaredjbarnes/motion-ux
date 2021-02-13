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
    this.fromEasing = options.from;
    this.offset = options.offset;
    this.toEasing = options.to;
    this.transitionDuration = typeof options.transitionDuration === "number" ? options.transitionDuration : 0.25;
    this.validateOptions();
    this.slope = this.getSlope();
    this.continuedSlopeEasing = new _BezierCurve.default([0, this.slope]);
    this.easing = new _Easing.default([0, 0, 0, 1, 1, 1, 1, 1]);
  } // Use differential calculas to get slope.


  _createClass(BlendedEasing, [{
    key: "getSlope",
    value: function getSlope() {
      var deltaX = 0.01;
      var rise;

      if (this.offset < 1) {
        rise = this.fromEasing.valueAt(deltaX + this.offset) - this.fromEasing.valueAt(this.offset);
      } else {
        rise = this.fromEasing.valueAt(1) - this.fromEasing.valueAt(1 - deltaX);
      }

      var run = deltaX;
      return rise / run;
    }
  }, {
    key: "getFromValue",
    value: function getFromValue(percentage) {
      var fromPercentage = this.offset + percentage;
      var fromValue; // Get the value from the easing until it finishes then use the slope easing.

      if (fromPercentage <= 1) {
        fromValue = this.fromEasing.valueAt(fromPercentage) - this.fromEasing.valueAt(this.offset);
      } else {
        fromValue = this.continuedSlopeEasing.valueAt(fromPercentage - 1) + this.fromEasing.valueAt(1) - this.fromEasing.valueAt(this.offset);
      }

      return fromValue;
    }
  }, {
    key: "valueAt",
    value: function valueAt(percentage) {
      var adjustedPercentage = this.easing.valueAt(percentage / this.transitionDuration);
      var toValue = this.toEasing.valueAt(percentage);
      var fromValue = this.getFromValue(percentage);

      if (percentage < this.transitionDuration) {
        return fromValue + (toValue - fromValue) * adjustedPercentage;
      } else {
        return toValue;
      }
    }
  }, {
    key: "validateOptions",
    value: function validateOptions() {
      if (typeof this.fromEasing.valueAt !== "function" || typeof this.toEasing.valueAt !== "function") {
        throw new Error("Both fromEasing and toEasing need to have a valueAt function.");
      }
    }
  }]);

  return BlendedEasing;
}();

exports.default = BlendedEasing;
//# sourceMappingURL=BlendedEasing.js.map