import FunctionEasing from "../FunctionEasing.js";

export default class EaseInExpo extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
    };
    super(func);
  }
}
