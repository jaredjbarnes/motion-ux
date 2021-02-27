"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  var s = 1.70158;
  return 1 * ((percentage = percentage / 1 - 1) * percentage * ((s + 1) * percentage + s) + 1);
};

exports.default = _default;
//# sourceMappingURL=easeOutBack.js.map