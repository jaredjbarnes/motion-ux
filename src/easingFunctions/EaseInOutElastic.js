import FunctionEasing from "../FunctionEasing.js";

export default class EaseInOutElastic extends FunctionEasing {
  constructor(tension) {
    const func = (percentage) => {
      const p = 0.3 / this.tension;
      const s = p / 4;
      const a = 1;

      if (percentage <= 0) return 0;
      if (percentage / 2 >= 2) return 1;

      if (percentage < 1)
        return (
          -0.5 *
          (a *
            Math.pow(2, 10 * (percentage -= 1)) *
            Math.sin(((percentage - s) * (2 * Math.PI)) / p))
        );
      return (
        a *
          Math.pow(2, -10 * (percentage -= 1)) *
          Math.sin(((percentage - s) * (2 * Math.PI)) / p) *
          0.5 +
        1
      );
    };

    super(func);
    this.tension = tension === "number" ? tension : 1;
  }
}
