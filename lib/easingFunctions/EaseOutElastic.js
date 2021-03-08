"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  var p = 0.3 / 1;
  var s = p / 4;
  var a = 1;
  if (percentage <= 0) return 0;
  if (percentage >= 1) return 1;
  return a * Math.pow(2, -10 * percentage) * Math.sin((percentage - s) * (2 * Math.PI) / p) + 1;
};

exports.default = _default;
//# sourceMappingURL=EaseOutElastic.js.map