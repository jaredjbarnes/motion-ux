import FunctionEasing from "../FunctionEasing.js";
import EaseOutBounce from "./EaseOutBounce.js";

const easeOutBounce = new EaseOutBounce();

export default class EaseInBounce extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return 1 - easeOutBounce.valueAt(1 - percentage);
    };

    super(func);
  }
}
