import FunctionEasing from "../FunctionEasing.js";

export default class EaseInCubic extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return 1 * (percentage /= 1) * percentage * percentage;
    };
    super(func);
  }
}
