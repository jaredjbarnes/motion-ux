"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  var s = 1.70158;
  return 1 * (percentage /= 1) * percentage * ((s + 1) * percentage - s);
};

exports.default = _default;
//# sourceMappingURL=EaseInBack.js.map