"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easeOutBounce = _interopRequireDefault(require("./easeOutBounce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(percentage) {
  return 1 - (0, _easeOutBounce.default)(1 - percentage);
};

exports.default = _default;
//# sourceMappingURL=EaseInBounce.js.map