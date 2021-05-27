import Animator from "../Animator";
import easings from "../easings";
import Keyframe from "../Keyframe";

describe("Animator", () => {
  test("Get value at 0.5.", () => {
    const keyframe = new Keyframe({
      property: "property",
      from: [0],
      to: [1],
      controls: [],
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    });

    const animator = new Animator(keyframe);
    const result: any = animator.update(0.5);

    expect(result[0]).toBe(0.5);
  });

  test("Get value at 0.5 with quad easing.", () => {
    const keyframe = new Keyframe({
      property: "property",
      from: [0],
      to: [1],
      controls: [],
      startAt: 0,
      endAt: 1,
      easing: easings.easeOutQuad,
    });

    const animator = new Animator(keyframe);
    const result: any = animator.update(0.5);

    expect(result[0]).toBe(0.75);
  });

  test("Get value at 0.5 with control.", () => {
    const keyframe = new Keyframe({
      property: "property",
      from: 0,
      to: 1,
      controls: [1],
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    });

    const animator = new Animator(keyframe);
    const result: any = animator.update(0.5);

    expect(result).toBe(0.75);
  });
});
