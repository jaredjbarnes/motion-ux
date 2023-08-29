import { SlopeAnimation } from "../SlopeAnimation";

describe("SlopeAnimation", () => {
  test("Constructor", () => {
    const delta = {
      propA: 1,
      propB: 1,
    };

    const currentValues = {
      propA: 2,
      propB: 3,
    };

    const slopeAnimation = new SlopeAnimation(currentValues, delta, 1);
    slopeAnimation.update(1);
    const result = slopeAnimation.currentValues;

    expect(result.propA).toBe(3);
    expect(result.propB).toBe(4);
  });

});
