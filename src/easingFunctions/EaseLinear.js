import FunctionEasing from "../FunctionEasing.js";

export default class EaseLinear extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return percentage;
    };
    super(func);
  }
}
