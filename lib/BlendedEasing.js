"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BezierCurve = _interopRequireDefault(require("./BezierCurve.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BlendedEasing =
/*#__PURE__*/
function () {
  function BlendedEasing(options) {
    var _this = this;

    _classCallCheck(this, BlendedEasing);

    options = options || {};
    this.easingA = options.easingA;
    this.easingB = options.easingB;
    var offsetValue = this.easingA.valueAt(options.offset);
    var pointsA = this.easingA.points.map(function (p) {
      return _this.easingA.valueAt(p) - offsetValue;
    }).filter(function (p) {
      return p >= 0;
    });
    var points = this.easingB.points.slice();
    var firstPoint = pointsA[0];

    for (var x = 0; x < points.length; x++) {
      if (points[x] <= firstPoint) {
        points[x] = firstPoint;
      }
    }

    var index = points.lastIndexOf(0);
    pointsA.unshift(0);
    points.splice.apply(points, [index + 1, 0].concat(_toConsumableArray(pointsA)));
    this.bezierCurve = new _BezierCurve.default(points);
    this.validateOptions();
  }

  _createClass(BlendedEasing, [{
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