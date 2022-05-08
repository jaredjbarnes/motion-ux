import { BezierCurve } from "../../dist/index.esm";
import { bernsteinPolynomial, newtonsMethod } from "../math";

describe("math", () => {
  test("newtonsMethod", () => {
    const curve1 = new BezierCurve([0, 0, 1]);
    const curve2 = new BezierCurve([0, 0, 1, 1]);

    function fn(x: number) {
      const one = curve1.valueAt(x);
      const two = curve2.valueAt(x)
      Math.sqrt(Math.pow)
    }

    function deltaFn(x: number) {
      return 2 * x;
    }

    const result = newtonsMethod(fn, deltaFn, 4);
  });

  test("bernsteinPolynomial", () => {});
});
