import FunctionEasing from "../FunctionEasing.js";

export default class EaseInOutQuad extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1) return (1 / 2) * percentage * percentage;
      return (-1 / 2) * (--percentage * (percentage - 2) - 1);
    };
    super(func);
  }
}
