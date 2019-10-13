import ColorAnimator from "./ColorAnimator.js";
import FunctionAnimator from "./FunctionAnimator.js";
import NumberAnimator from "./NumberAnimator.js";
import UnitAnimator from "./UnitAnimator.js";
import UnitArrayAnimator from "./UnitArrayAnimator.js";

const animators = [
  ColorAnimator,
  FunctionAnimator,
  NumberAnimator,
  UnitAnimator,
  UnitArrayAnimator
];

export default options => {
  return animators.find(Animator => {
    return Animator.isMatch(options);
  });
};
