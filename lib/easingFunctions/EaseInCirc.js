"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
};

exports.default = _default;
//# sourceMappingURL=easeInCirc.js.map