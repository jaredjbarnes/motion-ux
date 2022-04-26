import BezierCurve from "../BezierCurve";

describe("BezierCurve", () => {
  test("linear", () => {
    const bezierCurve = new BezierCurve([0, 1]);
    const value = bezierCurve.valueAt(0.5);
    const integrationValue = bezierCurve.integrationValueAt(0.5);
    const differentiationValueAt = bezierCurve.differentiationValueAt(0.5);

    expect(value).toBe(0.5);
    expect(integrationValue).toBe((0.5 * 0.5) / 2);
    expect(differentiationValueAt).toBe(1);
  });

  test("exponential", () => {
    const x = 0.5;
    const bezierCurve = new BezierCurve([0, 0, 1]);
    const value = bezierCurve.valueAt(x);
    const integrationValue = bezierCurve.integrationValueAt(x);
    const differentiationValueAt = bezierCurve.differentiationValueAt(x);

    expect(value).toBe(Math.pow(x, 2));
    expect(integrationValue).toBe(Math.pow(x, 3) / 3);
    expect(differentiationValueAt).toBe(2 * x);
  });
});
