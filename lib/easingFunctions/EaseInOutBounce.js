"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easeInBounce = _interopRequireDefault(require("./easeInBounce.js"));

var _easeOutBounce = _interopRequireDefault(require("./easeOutBounce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(percentage) {
  if (percentage < 0.5) {
    return (0, _easeInBounce.default)(percentage * 2) * 0.5;
  } else {
    return (0, _easeOutBounce.default)(percentage * 2 - 1) * 0.5 + 0.5;
  }
};

exports.default = _default;
//# sourceMappingURL=EaseInOutBounce.js.map