import FunctionEasing from "../FunctionEasing.js";

export default class EaseInQuad extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return percentage * percentage;
    };
    super(func);
  }
}
