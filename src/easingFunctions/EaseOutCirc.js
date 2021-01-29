import FunctionEasing from "../FunctionEasing.js";

export default class EaseOutCirc extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
    };
    super(func);
  }
}
