import FunctionEasing from "../FunctionEasing.js";

export default class EaseOutSine extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return 1 * Math.sin((percentage / 1) * (Math.PI / 2));
    };
    super(func);
  }
}
