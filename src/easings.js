import EaseInQuad from "./easingFunctions/EaseInQuad.js";
import EaseOutQuad from "./easingFunctions/EaseOutQuad.js";
import EaseInOutQuad from "./easingFunctions/EaseInOutQuad.js";
import EaseInElastic from "./easingFunctions/EaseInElastic.js";
import EaseInOutElastic from "./easingFunctions/EaseInOutElastic.js";
import EaseOutElastic from "./easingFunctions/EaseOutElastic.js";
import EaseInOutBack from "./easingFunctions/EaseInOutBack.js";
import EaseInOutBounce from "./easingFunctions/EaseInOutBounce.js";
import EaseInBounce from "./easingFunctions/EaseInBounce.js";
import EaseOutBounce from "./easingFunctions/EaseOutBounce.js";
import EaseInCubic from "./easingFunctions/EaseInCubic.js";
import EaseOutCubic from "./easingFunctions/EaseOutCubic.js";
import EaseInOutCubic from "./easingFunctions/EaseInOutCubic.js";
import EaseInQuart from "./easingFunctions/EaseInQuart.js";
import EaseOutQuart from "./easingFunctions/EaseOutQuart.js";
import EaseInOutQuart from "./easingFunctions/EaseInOutQuart.js";
import EaseInQuint from "./easingFunctions/EaseInQuint.js";
import EaseOutQuint from "./easingFunctions/EaseOutQuint.js";
import EaseInOutQuint from "./easingFunctions/EaseInOutQuint.js";
import EaseInSine from "./easingFunctions/EaseInSine.js";
import EaseOutSine from "./easingFunctions/EaseOutSine.js";
import EaseInOutSine from "./easingFunctions/EaseInOutSine.js";
import EaseInExpo from "./easingFunctions/EaseInExpo.js";
import EaseOutExpo from "./easingFunctions/EaseOutExpo.js";
import EaseInOutExpo from "./easingFunctions/EaseInOutExpo.js";
import EaseInCirc from "./easingFunctions/EaseInCirc.js";
import EaseOutCirc from "./easingFunctions/EaseOutCirc.js";
import EaseInOutCirc from "./easingFunctions/EaseInOutCirc.js";
import EaseInBack from "./easingFunctions/EaseInBack.js";
import EaseOutBack from "./easingFunctions/EaseOutBack.js";
import EaseLinear from "./easingFunctions/EaseLinear.js";

const easings = {
  easeInQuad: new EaseInQuad(),
  easeOutQuad: new EaseOutQuad(),
  easeInOutQuad: new EaseInOutQuad(),
  easeInCubic: new EaseInCubic(),
  easeOutCubic: new EaseOutCubic(),
  easeInOutCubic: new EaseInOutCubic(),
  easeInQuart: new EaseInQuart(),
  easeOutQuart: new EaseOutQuart(),
  easeInOutQuart: new EaseInOutQuart(),
  easeInQuint: new EaseInQuint(),
  easeOutQuint: new EaseOutQuint(),
  easeInOutQuint: EaseInOutQuint(),
  easeInSine: new EaseInSine(),
  easeOutSine: new EaseOutSine(),
  easeInOutSine: new EaseInOutSine(),
  easeInExpo: new EaseInExpo(),
  easeOutExpo: new EaseOutExpo(),
  easeInOutExpo: new EaseInOutExpo(),
  easeInCirc: new EaseInCirc(),
  easeOutCirc: new EaseOutCirc(),
  easeInOutCirc: new EaseInOutCirc(),
  easeInElastic: new EaseInElastic(),
  easeOutElastic: new EaseOutElastic(),
  easeInOutElastic: new EaseInOutElastic(),
  easeInBack: new EaseInBack(),
  easeOutBack: new EaseOutBack(),
  easeInOutBack: new EaseInOutBack(),
  easeInBounce: new EaseInBounce(),
  easeOutBounce: new EaseOutBounce(),
  easeInOutBounce: new EaseInOutBounce(),
  linear: new EaseLinear(),
};

export default easings;
