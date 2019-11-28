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
    this.percentage = 0;
  }

  _createClass(BezierCurve, [{
    key: "reduceToPoint",
    value: function reduceToPoint(points) {
      var _this = this;

      var reducedPoints = points.reduce(function (reducedPoints, point, index) {
        if (index !== points.length - 1) {
          var nextPoint = points[index + 1];
          reducedPoints.push((nextPoint - point) * _this.percentage + point);
        }

        return reducedPoints;
      }, []);

      if (reducedPoints.length > 1) {
        return this.reduceToPoint(reducedPoints);
      }

      return reducedPoints[0];
    }
  }, {
    key: "valueAt",
    value: function valueAt(percentage) {
      this.percentage = percentage;
      this.validatePoints();
      return this.reduceToPoint(this.points);
    }
  }, {
    key: "validatePoints",
    value: function validatePoints() {
      var _this2 = this;

      if (this.points.length < 2) {
        throw new Error("Invalid Points: The points need to be at least two.");
      }

      var controlPoints = this.points.slice(1, this.points.length - 2);
      controlPoints.forEach(function (point) {
        return _this2.assertValidPoint(point);
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