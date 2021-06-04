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

    const clock = new MockClock();

    const player = new Player();
    player.clock = clock;
    player.seek(0.5);
    player.animation = animation;
    player.duration = 1000;
    player.play();

    const extendedAnimation = new ExtendedAnimation(player, 1000);
    let values = extendedAnimation.update(0).currentValues;

    expect(values.opacity).toBe(0.5);

    values = extendedAnimation.update(0.75).currentValues;

    expect(values.opacity).toBe(1.2400000000000002);
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

    const clock = new MockClock();

    const player = new Player();
    player.clock = clock;
    player.seek(0.5);
    player.animation = animation;
    player.duration = 1000;
    player.play();

    const extendedAnimation = new ExtendedAnimation(player, 1000);
    let values = extendedAnimation.update(0).currentValues;

    expect(values.opacity).toBe(0.96875);

    values = extendedAnimation.update(0.75).currentValues;

    expect(values.opacity).toBe(1.0251196905281938);
  });
});
