import FunctionEasing from "../FunctionEasing.js";
import EaseInBounce from "./EaseInBounce.js";
import EaseOutBounce from "./EaseOutBounce.js";

const easeInBounce = new EaseInBounce();
const easeOutBounce = new EaseOutBounce();

export default class EaseInOutBounce extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      if (percentage < 0.5) {
        return easeInBounce.valueAt(percentage * 2) * 0.5;
      } else {
        return easeOutBounce.valueAt(percentage * 2 - 1) * 0.5 + 0.5;
      }
    };

    super(func);
  }
}
