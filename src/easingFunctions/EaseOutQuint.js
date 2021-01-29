import FunctionEasing from "../FunctionEasing.js";

export default class EaseOutQuint extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return (
        1 *
        ((percentage = percentage / 1 - 1) *
          percentage *
          percentage *
          percentage *
          percentage +
          1)
      );
    };
    super(func);
  }
}
