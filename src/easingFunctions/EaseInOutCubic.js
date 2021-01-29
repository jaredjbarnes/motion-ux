import FunctionEasing from "../FunctionEasing.js";

export default class EaseInOutCubic extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * percentage * percentage * percentage;
      return (1 / 2) * ((t -= 2) * percentage * percentage + 2);
    };
    super(func);
  }
}
