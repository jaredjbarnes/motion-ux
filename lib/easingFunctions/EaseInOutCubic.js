"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  if ((percentage /= 1 / 2) < 1) return 1 / 2 * percentage * percentage * percentage;
  return 1 / 2 * ((percentage -= 2) * percentage * percentage + 2);
};

exports.default = _default;
//# sourceMappingURL=easeInOutCubic.js.map