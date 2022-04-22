import ExtendedAnimation from "../ExtendedAnimation";
import Animation from "../Animation";
import Keyframe from "../Keyframe";
import Player from "../Player";
import MockClock from "../MockClock";
import easings from "../easings";

describe("Animation", () => {
  test("Extend Linearly", () => {
    const animation = new Animation("css", [
      new Keyframe({
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: 0,
        to: 1,
      }),
    ]);

    const extendedAnimation = new ExtendedAnimation(animation, 1000, 1, 1000);
    let values = extendedAnimation.update(0).currentValues;

    expect(values.opacity).toBe(1);

    values = extendedAnimation.update(0.75).currentValues;

    expect(values.opacity).toBe(1.7500000000000007);
  });

  test("Extend Exponentially", () => {
    const animation = new Animation("css", [
      new Keyframe({
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: 0,
        to: 1,
        easing: easings.easeOutExpo,
      }),
    ]);

    const extendedAnimation = new ExtendedAnimation(animation, 1000, 1, 1000);
    let values = extendedAnimation.update(0).currentValues;

    expect(values.opacity).toBe(1);

    values = extendedAnimation.update(0.75).currentValues;

    expect(values.opacity).toBe(1.0784990329006057);
  });
});
