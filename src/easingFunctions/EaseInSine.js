import FunctionEasing from "../FunctionEasing.js";

export default class EaseInSine extends FunctionEasing {
  constructor() {
    const func = (percentage) => {
      return -1 * Math.cos((percentage / 1) * (Math.PI / 2)) + percentage;
    };
    super(func);
  }
}
