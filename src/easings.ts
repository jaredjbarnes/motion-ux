import easeInQuad from "./easingFunctions/easeInQuad";
import easeOutQuad from "./easingFunctions/easeOutQuad";
import easeInOutQuad from "./easingFunctions/easeInOutQuad";
import easeInElastic from "./easingFunctions/easeInElastic";
import easeInOutElastic from "./easingFunctions/easeInOutElastic";
import easeOutElastic from "./easingFunctions/easeOutElastic";
import easeInOutBack from "./easingFunctions/easeInOutBack";
import easeInOutBounce from "./easingFunctions/easeInOutBounce";
import easeInBounce from "./easingFunctions/easeInBounce";
import easeOutBounce from "./easingFunctions/easeOutBounce";
import easeInCubic from "./easingFunctions/easeInCubic";
import easeOutCubic from "./easingFunctions/easeOutCubic";
import easeInOutCubic from "./easingFunctions/easeInOutCubic";
import easeInQuart from "./easingFunctions/easeInQuart";
import easeOutQuart from "./easingFunctions/easeOutQuart";
import easeInOutQuart from "./easingFunctions/easeInOutQuart";
import easeInQuint from "./easingFunctions/easeInQuint";
import easeOutQuint from "./easingFunctions/easeOutQuint";
import easeInOutQuint from "./easingFunctions/easeInOutQuint";
import easeInSine from "./easingFunctions/easeInSine";
import easeOutSine from "./easingFunctions/easeOutSine";
import easeInOutSine from "./easingFunctions/easeInOutSine";
import easeInExpo from "./easingFunctions/easeInExpo";
import easeOutExpo from "./easingFunctions/easeOutExpo";
import easeInOutExpo from "./easingFunctions/easeInOutExpo";
import easeInCirc from "./easingFunctions/easeInCirc";
import easeOutCirc from "./easingFunctions/easeOutCirc";
import easeInOutCirc from "./easingFunctions/easeInOutCirc";
import easeInBack from "./easingFunctions/easeInBack";
import easeOutBack from "./easingFunctions/easeOutBack";
import easeLinear from "./easingFunctions/easeLinear";

export type EasingFunction = (percentage: number) => number;

export type EasingNames =
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart"
  | "easeInQuint"
  | "easeOutQuint"
  | "easeInOutQuint"
  | "easeInSine"
  | "easeOutSine"
  | "easeInOutSine"
  | "easeInExpo"
  | "easeOutExpo"
  | "easeInOutExpo"
  | "easeInCirc"
  | "easeOutCirc"
  | "easeInOutCirc"
  | "easeInElastic"
  | "easeOutElastic"
  | "easeInOutElastic"
  | "easeInBack"
  | "easeOutBack"
  | "easeInOutBack"
  | "easeInBounce"
  | "easeOutBounce"
  | "easeInOutBounce"
  | "linear";

const easings = {
  easeInQuad: easeInQuad,
  easeOutQuad: easeOutQuad,
  easeInOutQuad: easeInOutQuad,
  easeInCubic: easeInCubic,
  easeOutCubic: easeOutCubic,
  easeInOutCubic: easeInOutCubic,
  easeInQuart: easeInQuart,
  easeOutQuart: easeOutQuart,
  easeInOutQuart: easeInOutQuart,
  easeInQuint: easeInQuint,
  easeOutQuint: easeOutQuint,
  easeInOutQuint: easeInOutQuint,
  easeInSine: easeInSine,
  easeOutSine: easeOutSine,
  easeInOutSine: easeInOutSine,
  easeInExpo: easeInExpo,
  easeOutExpo: easeOutExpo,
  easeInOutExpo: easeInOutExpo,
  easeInCirc: easeInCirc,
  easeOutCirc: easeOutCirc,
  easeInOutCirc: easeInOutCirc,
  easeInElastic: easeInElastic,
  easeOutElastic: easeOutElastic,
  easeInOutElastic: easeInOutElastic,
  easeInBack: easeInBack,
  easeOutBack: easeOutBack,
  easeInOutBack: easeInOutBack,
  easeInBounce: easeInBounce,
  easeOutBounce: easeOutBounce,
  easeInOutBounce: easeInOutBounce,
  linear: easeLinear,
};

export default easings;
