import FunctionEasing from "../FunctionEasing.js";

export default class EaseInOutQuint extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
        return (
          (1 / 2) *
          percentage *
          percentage *
          percentage *
          percentage *
          percentage
        );
      return (
        (1 / 2) *
        ((percentage -= 2) * percentage * percentage * percentage * percentage +
          2)
      );
    };
    super(func);
  }
}
