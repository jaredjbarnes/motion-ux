import FunctionEasing from "../FunctionEasing.js";

export default class EaseOutQuad extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return -percentage * (percentage - 2);
    };
    super(func);
  }
}
