"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// This could be done with a reducer and recursion to be more readable, however,
// it is memory expensive, because it creates a function every invocation as well
// as new arrays on every recursive invocation. This should be fast and have no memory chern.
var PointReducer =
/*#__PURE__*/
function () {
  function PointReducer(points) {
    _classCallCheck(this, PointReducer);

    this.points = points;
    this.reducedPoints = new Array(points.length);
  }

  _createClass(PointReducer, [{
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
  }]);

  return PointReducer;
}();

exports.default = PointReducer;
//# sourceMappingURL=PointReducer.js.map