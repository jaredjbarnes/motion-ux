import Animation from "../Animation";
import Keyframe from "../Keyframe";
import CssKeyframe from "../CssKeyframe";

describe("Animation", () => {
  test("Get current values as 0.", () => {
    const name = "my-animation";
    const animation = new Animation([
      new Keyframe({
        name: name,
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: [0],
        to: [1],
      }),
    ]);

    const values = animation.update(0).getCurrentValues();

    const array = values[name].opacity;

    if (Array.isArray(array)) {
      expect(array[0]).toBe(0);
    }
  });

  test("CssKeyframes", () => {
    const from = "M 0 0 C 0 0, 0 0, 0 0";
    const to = "M 10 10 C 150 150,30 30,20 20";

    const animation = new Animation([
      new CssKeyframe({
        name: "css",
        property: "path",
        from,
        to,
      }),
    ]);

    animation.update(0.5);

    expect(animation.getCurrentValues()).toBe("");
  });

  test("Valid Path.", () => {
    const name = "my-animation";
    const from =
      "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10";
    const to =
      "M 10 315 L 110 400 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 149.9 L 315 10";

    const animation = new Animation([
      new Keyframe({
        name: name,
        property: "path",
        startAt: 0,
        endAt: 1,
        from: from.split(" "),
        to: to.split(" "),
      }),
    ]);

    animation.update(1);
    const value = animation.getCurrentValues()[name].path;
    if (Array.isArray(value)) {
      expect(value.join(" ")).toBe(to);
    } else {
      throw new Error("Value should have been an array.");
    }
  });

  test("Multiple startAts on same property.", () => {
    const name = "my-animation";
    const animation = new Animation([
      new Keyframe({
        name: name,
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: [1],
        to: [0],
      }),
      new Keyframe({
        name: name,
        property: "display",
        startAt: 0.01,
        endAt: 0.01,
        from: ["none"],
        to: ["block"],
      }),
      new Keyframe({
        name: name,
        property: "display",
        startAt: 0.25,
        endAt: 0.25,
        from: ["block"],
        to: ["none"],
      }),
      new Keyframe({
        name: name,
        property: "display",
        startAt: 0.5,
        endAt: 0.5,
        from: ["none"],
        to: ["block"],
      }),
      new Keyframe({
        name: name,
        property: "display",
        startAt: 0.99,
        endAt: 0.99,
        from: ["block"],
        to: ["none"],
      }),
    ]);

    animation.update(1);

    let values = animation.getCurrentValues()[name];
    let opacity = values.opacity as number[];
    let display = values.display as string[];

    expect(display[0]).toBe("none");
    expect(opacity[0]).toBe(0);

    animation.update(0.3);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity as number[];
    display = values.display as string[];

    expect(display[0]).toBe("none");
    expect(opacity[0]).toBe(0.7);

    animation.update(0.49);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity as number[];
    display = values.display as string[];

    expect(display[0]).toBe("none");
    expect(opacity[0]).toBe(0.51);

    animation.update(0.75);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity as number[];
    display = values.display as string[];

    expect(display[0]).toBe("block");
    expect(opacity[0]).toBe(0.25);

    animation.update(0);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity as number[];
    display = values.display as string[];

    expect(display[0]).toBe("none");
    expect(opacity[0]).toBe(1);
  });
});
