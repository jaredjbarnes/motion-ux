"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BezierCurve = _interopRequireDefault(require("./BezierCurve.js"));

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
    this.easingB = options.easingB;
    this.offset = options.offset;
    var firstControlPoint = this.getTangent();
    var points = this.easingB.points.slice();
    points.splice(1, 0, firstControlPoint);
    this.bezierCurve = new _BezierCurve.default(points);
    this.validateOptions();
  }

  _createClass(BlendedEasing, [{
    key: "getTangent",
    value: function getTangent() {
      var deltaX = 0.0001;
      var rise = this.easingA.valueAt(deltaX + this.offset) - this.easingA.valueAt(this.offset);
      var run = deltaX;
      return rise / run * this.offset;
    }
  }, {
    key: "valueAt",
    value: function valueAt(percentage) {
      var value = this.bezierCurve.valueAt(percentage);
      return value;
    }
  }, {
    key: "validateOptions",
    value: function validateOptions() {
      if (typeof this.easingA.valueAt !== "function" || typeof this.easingB.valueAt !== "function") {
        throw new Error("Both bezierCurveA and BezierCurveB need to have valueAt functions.");
      }
    }
  }]);

  return BlendedEasing;
}();

exports.default = BlendedEasing;
//# sourceMappingURL=BlendedEasing.js.map