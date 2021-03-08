"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
};

exports.default = _default;
//# sourceMappingURL=EaseInExpo.js.map