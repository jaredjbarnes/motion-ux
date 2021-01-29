import FunctionEasing from "../FunctionEasing.js";

export default class EaseInQuint extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return (
        1 *
        (percentage /= 1) *
        percentage *
        percentage *
        percentage *
        percentage
      );
    };
    super(func);
  }
}
