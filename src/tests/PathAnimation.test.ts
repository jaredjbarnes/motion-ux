import easings from "../easings";
import { NormalizedPathAnimation } from "../NormalizedPathAnimation";
import { PathAnimation } from "../PathAnimation";
import BezierCurve from "../BezierCurve";

describe("PathAnimation", () => {
  test("Only a Move", () => {
    const animation = new PathAnimation("M 10 10");
  });

  test("Move then curve", () => {
    const animation = new PathAnimation("M 10 10 C 20 20, 40 20, 50 10");
  });

  test("Normalized Path", () => {
    const animation = new NormalizedPathAnimation(
      //"C 10 10, 30 10, 40 0",
      // "M 10 10 C 20 20, 40 20, 50 10",
      //'v10 h10 v-10 h-10',
      "C5 5, 5 5, 10 10",
      easings.linear,
      4
    );
    const bezierCurve = new BezierCurve([0, 0, 1]);
    const distance = animation.simpsonsRule(0, 10, (x) => {
      return Math.sqrt(
        Math.pow(bezierCurve.deltaAt(x), 2) +
          Math.pow(bezierCurve.deltaAt(x), 2)
      );
    });

    expect(distance).toBe(Math.sqrt(2));
  });
});
