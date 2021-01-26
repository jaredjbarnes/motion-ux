"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BezierCurve =
/*#__PURE__*/
function () {
  function BezierCurve(points) {
    _classCallCheck(this, BezierCurve);

    this.points = points;
    this.reducedPoints = new Array(points.length);
    Object.freeze(this.points);
  }

  _createClass(BezierCurve, [{
    key: "clone",
    value: function clone() {
      return new BezierCurve(this.points.slice());
    }
  }, {
    key: "valueAt",
    value: function valueAt(percentage) {
      var points = this.points;
      var reducedPoints = this.reducedPoints;
      var length = points.length;

      for (var x = 0; x < length; x++) {
        reducedPoints[x] = points[x];
      }

      for (var _x = 0; _x < length; _x++) {
        var innerLength = length - _x - 1;

        for (var y = 0; y < innerLength; y++) {
          var nextPoint = reducedPoints[y + 1];
          var point = reducedPoints[y];
          reducedPoints[y] = (nextPoint - point) * percentage + point;
        }
      }

      return reducedPoints[0];
    }
  }, {
    key: "validatePoints",
    value: function validatePoints() {
      var _this = this;

      if (this.points.length < 2) {
        throw new Error("Invalid Points: The points need to be at least two.");
      }

      var controlPoints = this.points.slice(1, this.points.length - 2);
      controlPoints.forEach(function (point) {
        return _this.assertValidPoint(point);
      });
    }
  }, {
    key: "assertValidPoint",
    value: function assertValidPoint(point) {
      if (typeof point !== "number") {
        throw new Error("Invalid point: Points need to be numbers.");
      }
    }
  }]);

  return BezierCurve;
}();

exports.default = BezierCurve;
//# sourceMappingURL=BezierCurve.js.map