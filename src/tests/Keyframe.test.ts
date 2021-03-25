import assert from "assert";
import Animator from "../Animator";
import Keyframe from "../Keyframe";

describe("Keyframe", () => {
  test("SimpleKeyframeConfig", () => {
    const keyframe = Keyframe.fromSimpleConfig({
      name: "test",
      property: "color",
      startAt: 0,
      endAt: 1,
      from: "rgba(0,0,0,0)",
      to: "rgba(255,255,255,1)",
    });

    const animator = new Animator(keyframe);
    const value = animator.update(0.5).value;

    expect("rgba(127.5, 127.5, 127.5, 0.5)").toBe(value);
  });
});
