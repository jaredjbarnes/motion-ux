"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
};

exports.default = _default;
//# sourceMappingURL=EaseOutCirc.js.map