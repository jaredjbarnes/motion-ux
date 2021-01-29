import FunctionEasing from "../FunctionEasing.js";

export default class EaseInOutSine extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
    };
    super(func);
  }
}
