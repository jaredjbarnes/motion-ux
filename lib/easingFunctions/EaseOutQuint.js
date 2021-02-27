"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  return 1 * ((percentage = percentage / 1 - 1) * percentage * percentage * percentage * percentage + 1);
};

exports.default = _default;
//# sourceMappingURL=easeOutQuint.js.map