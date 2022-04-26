import easings from "../easings";
import { NormalizedPathAnimation } from "../NormalizedPathAnimation";
import { PathAnimation } from "../PathAnimation";

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
    const distance = animation.simpsonsRule(2, 10, (x: number) => Math.sqrt(x));

    expect(distance).toBe(Math.sqrt(2));
  });
});
