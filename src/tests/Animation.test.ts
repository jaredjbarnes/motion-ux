import Animation from "../Animation";
import Keyframe from "../Keyframe";
import CssKeyframe from "../CssKeyframe";
import easings from "../easings";

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

  test("Nested Object Animation.", () => {
    const name = "my-animation";
    const animation = new Animation("css", [
      new Keyframe({
        property: "object",
        startAt: 0,
        endAt: 1,
        from: {
          scrollTop: 0,
          viewport: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },
        to: {
          scrollTop: 10,
          viewport: {
            top: -100,
            left: -100,
            right: 100,
            bottom: 100,
          },
        },
      }),
    ]);

    let values = animation.update(0).currentValues;
    const object = values.object;
    expect(object.scrollTop).toBe(0);

    values = animation.update(0.5).currentValues;

    expect(object.viewport.top).toBe(-50);
    expect(object.viewport.left).toBe(-50);
    expect(object.viewport.right).toBe(50);
    expect(object.viewport.bottom).toBe(50);
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

  test("playground", () => {
    const animation = new Animation("my-animation", [
      new Keyframe({
        property: "prop",
        from: 0,
        to: 1,
        easing: easings.easeOutExpo
      }),
    ]);

    animation.update(0.9);
    const extendsAnimation = animation.extend();
    const values = extendsAnimation.update(0.2).currentValues;

    expect(values).toBe(null);
  });
});
