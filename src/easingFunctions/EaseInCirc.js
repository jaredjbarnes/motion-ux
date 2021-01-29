import FunctionEasing from "../FunctionEasing.js";

export default class EaseInCirc extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
    };
    super(func);
  }
}
