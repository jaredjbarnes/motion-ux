import Motion from "../Motion";
import MockClock from "../MockClock";
import Player from "../Player";
import { createAnimation } from "../createAnimation";

interface Style {
  opacity: number;
  scale: number;
}

describe("Motion", () => {
  test("segue", () => {
    const style = {
      opacity: 0,
      scale: 0.25,
    };

    const mockClock = new MockClock();
    Player.setClock(mockClock);

    const initialAnimation = createAnimation({
      opacity: 0,
      scale: 0.25,
    });

    const motion = new Motion<Style>((animation) => {
      style.opacity = animation.currentValues.opacity;
      style.scale = animation.currentValues.scale;
    }, style);

    motion.segueTo(
      createAnimation({
        opacity: 0,
        scale: 0.25,
      })
    );

    mockClock.tick(1);

    motion.segueTo(
      createAnimation({
        opacity: 1,
        scale: {
          from: 0.25,
          "40%": {
            value: 1.5,
            easeIn: "quad",
            easeOut: "quad",
          },
          to: {
            value: 1,
            easeIn: "expo",
          },
        },
      }),
      1000
    );

    mockClock.tick(400);
  });
});
