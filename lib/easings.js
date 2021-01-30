"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EaseInQuad = _interopRequireDefault(require("./easingFunctions/EaseInQuad.js"));

var _EaseOutQuad = _interopRequireDefault(require("./easingFunctions/EaseOutQuad.js"));

var _EaseInOutQuad = _interopRequireDefault(require("./easingFunctions/EaseInOutQuad.js"));

var _EaseInElastic = _interopRequireDefault(require("./easingFunctions/EaseInElastic.js"));

var _EaseInOutElastic = _interopRequireDefault(require("./easingFunctions/EaseInOutElastic.js"));

var _EaseOutElastic = _interopRequireDefault(require("./easingFunctions/EaseOutElastic.js"));

var _EaseInOutBack = _interopRequireDefault(require("./easingFunctions/EaseInOutBack.js"));

var _EaseInOutBounce = _interopRequireDefault(require("./easingFunctions/EaseInOutBounce.js"));

var _EaseInBounce = _interopRequireDefault(require("./easingFunctions/EaseInBounce.js"));

var _EaseOutBounce = _interopRequireDefault(require("./easingFunctions/EaseOutBounce.js"));

var _EaseInCubic = _interopRequireDefault(require("./easingFunctions/EaseInCubic.js"));

var _EaseOutCubic = _interopRequireDefault(require("./easingFunctions/EaseOutCubic.js"));

var _EaseInOutCubic = _interopRequireDefault(require("./easingFunctions/EaseInOutCubic.js"));

var _EaseInQuart = _interopRequireDefault(require("./easingFunctions/EaseInQuart.js"));

var _EaseOutQuart = _interopRequireDefault(require("./easingFunctions/EaseOutQuart.js"));

var _EaseInOutQuart = _interopRequireDefault(require("./easingFunctions/EaseInOutQuart.js"));

var _EaseInQuint = _interopRequireDefault(require("./easingFunctions/EaseInQuint.js"));

var _EaseOutQuint = _interopRequireDefault(require("./easingFunctions/EaseOutQuint.js"));

var _EaseInOutQuint = _interopRequireDefault(require("./easingFunctions/EaseInOutQuint.js"));

var _EaseInSine = _interopRequireDefault(require("./easingFunctions/EaseInSine.js"));

var _EaseOutSine = _interopRequireDefault(require("./easingFunctions/EaseOutSine.js"));

var _EaseInOutSine = _interopRequireDefault(require("./easingFunctions/EaseInOutSine.js"));

var _EaseInExpo = _interopRequireDefault(require("./easingFunctions/EaseInExpo.js"));

var _EaseOutExpo = _interopRequireDefault(require("./easingFunctions/EaseOutExpo.js"));

var _EaseInOutExpo = _interopRequireDefault(require("./easingFunctions/EaseInOutExpo.js"));

var _EaseInCirc = _interopRequireDefault(require("./easingFunctions/EaseInCirc.js"));

var _EaseOutCirc = _interopRequireDefault(require("./easingFunctions/EaseOutCirc.js"));

var _EaseInOutCirc = _interopRequireDefault(require("./easingFunctions/EaseInOutCirc.js"));

var _EaseInBack = _interopRequireDefault(require("./easingFunctions/EaseInBack.js"));

var _EaseOutBack = _interopRequireDefault(require("./easingFunctions/EaseOutBack.js"));

var _EaseLinear = _interopRequireDefault(require("./easingFunctions/EaseLinear.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var easings = {
  easeInQuad: new _EaseInQuad.default(),
  easeOutQuad: new _EaseOutQuad.default(),
  easeInOutQuad: new _EaseInOutQuad.default(),
  easeInCubic: new _EaseInCubic.default(),
  easeOutCubic: new _EaseOutCubic.default(),
  easeInOutCubic: new _EaseInOutCubic.default(),
  easeInQuart: new _EaseInQuart.default(),
  easeOutQuart: new _EaseOutQuart.default(),
  easeInOutQuart: new _EaseInOutQuart.default(),
  easeInQuint: new _EaseInQuint.default(),
  easeOutQuint: new _EaseOutQuint.default(),
  easeInOutQuint: new _EaseInOutQuint.default(),
  easeInSine: new _EaseInSine.default(),
  easeOutSine: new _EaseOutSine.default(),
  easeInOutSine: new _EaseInOutSine.default(),
  easeInExpo: new _EaseInExpo.default(),
  easeOutExpo: new _EaseOutExpo.default(),
  easeInOutExpo: new _EaseInOutExpo.default(),
  easeInCirc: new _EaseInCirc.default(),
  easeOutCirc: new _EaseOutCirc.default(),
  easeInOutCirc: new _EaseInOutCirc.default(),
  easeInElastic: new _EaseInElastic.default(),
  easeOutElastic: new _EaseOutElastic.default(),
  easeInOutElastic: new _EaseInOutElastic.default(),
  easeInBack: new _EaseInBack.default(),
  easeOutBack: new _EaseOutBack.default(),
  easeInOutBack: new _EaseInOutBack.default(),
  easeInBounce: new _EaseInBounce.default(),
  easeOutBounce: new _EaseOutBounce.default(),
  easeInOutBounce: new _EaseInOutBounce.default(),
  linear: new _EaseLinear.default()
};
var _default = easings;
exports.default = _default;
//# sourceMappingURL=easings.js.map