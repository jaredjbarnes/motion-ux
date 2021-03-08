"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  if (percentage == 0) return 0;
  if (percentage == 1) return 1;
  if ((percentage /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (percentage - 1));
  return 1 / 2 * (-Math.pow(2, -10 * --percentage) + 2);
};

exports.default = _default;
//# sourceMappingURL=EaseInOutExpo.js.map