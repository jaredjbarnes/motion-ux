import { PathAnimation } from "../PathAnimation";

describe("PathAnimation", () => {
  test("Only a Move", () => {
    const animation = new PathAnimation("M 10 10");
  });

  test("Move then curve", () => {
    const animation = new PathAnimation("M 10 10 C 20 20, 40 20, 50 10");
  });

  test("", () => {});
});
