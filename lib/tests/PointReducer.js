"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _PointReducer = _interopRequireDefault(require("../PointReducer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["Point Reducer: Linear"] = function () {
  var pointReducer = new _PointReducer.default([0, 100]);
  var value = pointReducer.valueAt(0.5);

  _assert.default.equal(value, 50);
};

exports["Point Reducer: EaseIn"] = function () {
  var pointReducer = new _PointReducer.default([0, 0, 100]);
  var value = pointReducer.valueAt(0.5);

  _assert.default.equal(value, 25);

  value = pointReducer.valueAt(0.75);

  _assert.default.equal(value, 56.25);

  value = pointReducer.valueAt(1);

  _assert.default.equal(value, 100);
};
//# sourceMappingURL=PointReducer.js.map