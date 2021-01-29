import FunctionEasing from "../FunctionEasing.js";

export default class EaseOutExpo extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return percentage == 1
        ? 1
        : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
    };
    super(func);
  }
}
