import FunctionEasing from "../FunctionEasing.js";

export default class EaseOutBack extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      const s = 1.70158;
      return (
        1 *
        ((percentage = percentage / 1 - 1) *
          percentage *
          ((s + 1) * percentage + s) +
          1)
      );
    };
    super(func);
  }
}
