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
    animator.update(0.5);

    expect(animator.value[0]).toBe(0.5);
    expect(animator.delta[0]).toBe(1);
  });

  test("Get value at beyond 1.", () => {
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
    animator.update(1.5);

    expect(animator.value[0]).toBe(1.5);
    expect(animator.delta[0]).toBe(1);
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
    animator.update(0.5);

    expect(animator.value[0]).toBe(0.75);
    expect(animator.delta[0]).toBe(1);
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
    animator.update(0.5);

    expect(animator.value).toBe(0.75);
    expect(animator.delta).toBe(1);
  });

  test("Get value at 1 with control.", () => {
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
    animator.update(1);

    expect(animator.value).toBe(1);
    expect(animator.delta).toBe(0);
  });

  test("Get value at beyond on with control.", () => {
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
    animator.update(2);

    expect(animator.value).toBe(0);
    expect(animator.delta).toBe(-2);
  });

  test("Get value at 0 with control.", () => {
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
    animator.update(0);

    expect(animator.value).toBe(0);
    expect(animator.delta).toBe(2);
  });

  test("Get value at 0 with control.", () => {
    const keyframe = new Keyframe({
      property: "property",
      from: 0,
      to: 2,
      controls: [2.5],
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    });

    const animator = new Animator(keyframe);
    animator.update(1);

    expect(animator.value).toBe(0);
    expect(animator.delta).toBe(2);
  });
});
