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
});
