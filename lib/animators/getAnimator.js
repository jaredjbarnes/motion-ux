"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ColorAnimator = _interopRequireDefault(require("./ColorAnimator.js"));

var _FunctionAnimator = _interopRequireDefault(require("./FunctionAnimator.js"));

var _NumberAnimator = _interopRequireDefault(require("./NumberAnimator.js"));

var _UnitAnimator = _interopRequireDefault(require("./UnitAnimator.js"));

var _UnitArrayAnimator = _interopRequireDefault(require("./UnitArrayAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const animators = [_ColorAnimator.default, _FunctionAnimator.default, _NumberAnimator.default, _UnitAnimator.default, _UnitArrayAnimator.default];

var _default = options => {
  return animators.find(Animator => {
    return Animator.isMatch(options);
  });
};

exports.default = _default;