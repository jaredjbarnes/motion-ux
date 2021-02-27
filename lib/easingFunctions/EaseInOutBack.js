"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(percentage) {
  var s = 1.70158 * 1.525;

  if ((percentage /= 1 / 2) < 1) {
    return 1 / 2 * (percentage * percentage * ((s + 1) * percentage - s));
  }

  return 1 / 2 * ((percentage -= 2) * percentage * ((s + 1) * percentage + s) + 2);
};

exports.default = _default;
//# sourceMappingURL=easeInOutBack.js.map