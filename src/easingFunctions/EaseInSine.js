import FunctionEasing from "../FunctionEasing.js";

export default class EaseInSine extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return -Math.cos(percentage * (Math.PI / 2)) + 1;
    };
    super(func);
  }
}
