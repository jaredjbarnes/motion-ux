import Animation from "../Animation";
import Keyframe from "../Keyframe";
import CssKeyframe from "../CssKeyframe";

describe("Animation", () => {
  test("Get current values as 0.", () => {
    const name = "my-animation";
    const animation = new Animation("css", [
      new Keyframe({
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: [0],
        to: [1],
      }),
    ]);

    const values = animation.update(0).currentValues;

    const array = values.opacity;

    if (Array.isArray(array)) {
      expect(array[0]).toBe(0);
    }
  });

  test("CssKeyframes", () => {
    const from = "M 0 0 C 0 0, 0 0, 0 0";
    const to = "M 10 10 C 150 150,30 30,20 20";

    const animation = new Animation("css", [
      new CssKeyframe({
        property: "path",
        from,
        to,
      }),
    ]);

    animation.update(0.5);

    const result = animation.currentValues.path.join("");
    expect(result).toBe("M 5 5 C 75 75,15 15,10 10");
  });

  test("Multiple startAts on same property.", () => {
    const name = "my-animation";
    const animation = new Animation<string | number>("css", [
      new Keyframe({
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: 1,
        to: 0,
      }),
      new Keyframe({
        property: "display",
        startAt: 0.01,
        endAt: 0.01,
        from: "none",
        to: "block",
      }),
      new Keyframe({
        property: "display",
        startAt: 0.25,
        endAt: 0.25,
        from: "block",
        to: "none",
      }),
      new Keyframe({
        property: "display",
        startAt: 0.5,
        endAt: 0.5,
        from: "none",
        to: "block",
      }),
      new Keyframe({
        property: "display",
        startAt: 0.99,
        endAt: 0.99,
        from: "block",
        to: "none",
      }),
    ]);

    animation.update(1);

    let values = animation.currentValues;
    let opacity = values.opacity;
    let display = values.display;

    expect(display).toBe("none");
    expect(opacity).toBe(0);

    animation.update(0.3);
    values = animation.currentValues;

    opacity = values.opacity;
    display = values.display;

    expect(display).toBe("none");
    expect(opacity).toBe(0.7);

    animation.update(0.49);
    values = animation.currentValues;

    opacity = values.opacity;
    display = values.display;

    expect(display).toBe("none");
    expect(opacity).toBe(0.51);

    animation.update(0.75);
    values = animation.currentValues;

    opacity = values.opacity;
    display = values.display;

    expect(display).toBe("block");
    expect(opacity).toBe(0.25);

    animation.update(0);
    values = animation.currentValues;

    opacity = values.opacity;
    display = values.display;

    expect(display).toBe("none");
    expect(opacity).toBe(1);
  });
});
