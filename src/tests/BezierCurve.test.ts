import BezierCurve from "../BezierCurve";

describe("BezierCurve", () => {
  test("linear", () => {
    const bezierCurve = new BezierCurve([0, 1]);
    const value = bezierCurve.valueAt(0.5);
    const integrationValue = bezierCurve.sumAt(0.5);
    const differentiationValueAt = bezierCurve.deltaAt(0.5);

    expect(value).toBe(0.5);
    expect(integrationValue).toBe((0.5 * 0.5) / 2);
    expect(differentiationValueAt).toBe(1);
  });

  test("exponential", () => {
    const x = 0.5;
    const bezierCurve = new BezierCurve([0, 0, 1]);
    const value = bezierCurve.valueAt(x);
    const integrationValue = bezierCurve.sumAt(x);
    const differentiationValueAt = bezierCurve.deltaAt(x);

    expect(value).toBe(Math.pow(x, 2));
    expect(integrationValue).toBe(Math.pow(x, 3) / 3);
    expect(differentiationValueAt).toBe(2 * x);
  });

  test("x^2", () => {
    const bezierCurve = new BezierCurve([0, 0, 1]);

    const value1 = bezierCurve.valueAt(0.5);
    const value3 = Math.pow(0.5, 2);
    const delta = bezierCurve.deltaAt(0.5);
    const sum = bezierCurve.sumAt(0.5);

    expect(sum).toBe(Math.pow(0.5, 3) / 3);
  });

  test("x^3", () => {
    const bezierCurve = new BezierCurve([0, 0, 0, 1]);

    const delta = bezierCurve.deltaAt(0);
    const sum = bezierCurve.sumAt(0.5);
    const expectedSum = Math.pow(0.5, 4) / 4;

    expect(sum).toBe(expectedSum);
  });

  test("EaseInOut", () => {
    const bezierCurve = new BezierCurve([0, 1]);
    const value = bezierCurve.valueAt(0.5);
    const delta = bezierCurve.deltaAt(0);
    const sum = bezierCurve.sumAt(0.25);

    expect(sum).toBe(0.03125);
    expect(value).toBe(0.5);
    expect(delta).toBe(1);
  });

});
