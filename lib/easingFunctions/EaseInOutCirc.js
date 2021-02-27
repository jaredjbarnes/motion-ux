"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  if ((percentage /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - percentage * percentage) - 1);
  return 1 / 2 * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
};

exports.default = _default;
//# sourceMappingURL=easeInOutCirc.js.map