"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Easing = _interopRequireDefault(require("./Easing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var easings = {
  easeInQuad: new _Easing.default([0, 0, 1]),
  easeOutQuad: new _Easing.default([0, 1, 1]),
  easeInOutQuad: new _Easing.default([0, 0, 1, 1]),
  easeInCubic: new _Easing.default([0, 0, 0, 1]),
  easeOutCubic: new _Easing.default([0, 1, 1, 1]),
  easeInOutCubic: new _Easing.default([0, 0, 0, 1, 1, 1]),
  easeInQuart: new _Easing.default([0, 0, 0, 0, 1]),
  easeOutQuart: new _Easing.default([0, 1, 1, 1, 1]),
  easeInOutQuart: new _Easing.default([0, 0, 0, 0, 1, 1, 1, 1]),
  easeInQuint: new _Easing.default([0, 0, 0, 0, 0, 1]),
  easeOutQuint: new _Easing.default([0, 1, 1, 1, 1, 1]),
  easeInOutQuint: new _Easing.default([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]),
  easeInSine: new _Easing.default([0, 0, 1]),
  easeOutSine: new _Easing.default([0, 1, 1]),
  easeInOutSine: new _Easing.default([0, 0, 1, 1]),
  easeInExpo: new _Easing.default([0, 0, 0, 0, 0, 0, 1]),
  easeOutExpo: new _Easing.default([0, 1, 1, 1, 1, 1, 1]),
  easeInOutExpo: new _Easing.default([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]),
  easeInCirc: new _Easing.default([0, 0, 0, 0, 0.05, 0.15, 0.25, 0.35, 1]),
  easeOutCirc: new _Easing.default([0, 0.65, 0.75, 0.85, 0.95, 1, 1, 1, 1]),
  easeInOutCirc: new _Easing.default([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]),
  easeInElastic: new _Easing.default([0, 0, 0, 0.15, -0.25, 0.25, -0.5, -0.5, 2, -1, -1, 1]),
  easeOutElastic: new _Easing.default([0, 2, 2, -1, 1.5, 1.5, 0.75, 1.25, 0.85, 1, 1, 1]),
  easeInOutElastic: new _Easing.default([0, 0, 0, 0, 0.5, -0.75, -2, 3, 1.75, 0.5, 1, 1, 1, 1]),
  easeInBack: new _Easing.default([0, 0, -0.5, 1]),
  easeOutBack: new _Easing.default([0, 1.5, 1, 1]),
  easeInOutBack: new _Easing.default([0, 0, -0.5, 1.5, 1, 1]),
  linear: new _Easing.default([0, 1])
};
var _default = easings;
exports.default = _default;
//# sourceMappingURL=easings.js.map