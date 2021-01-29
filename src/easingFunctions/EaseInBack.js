import FunctionEasing from "../FunctionEasing.js";

export default class EaseInBack extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      const s = 1.70158;
      return 1 * (percentage /= 1) * percentage * ((s + 1) * percentage - s);
    };
    super(func);
  }
}
