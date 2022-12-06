import { createAnimation } from "../createAnimation";
import { approximatelyEqual } from "./approximatelyEqual";

describe("createAnimation", () => {
  test("Many Steps.", () => {
    const animation = createAnimation({
      opacity: {
        from: 0,
        "25%": 0.75,
        "50%": 0.25,
        "75%": 0.5,
        to: 1,
      },
    });

    const keyframes = animation.keyframes;

    expect(keyframes[0].from).toBe(0);
    expect(keyframes[0].to).toBe(0.75);
    expect(keyframes[0].property).toBe("opacity");
    expect(keyframes[0].controls.length).toBe(0);

    expect(keyframes[1].from).toBe(0.75);
    expect(keyframes[1].to).toBe(0.25);
    expect(keyframes[1].property).toBe("opacity");
    expect(keyframes[1].controls.length).toBe(0);

    expect(keyframes[2].from).toBe(0.25);
    expect(keyframes[2].to).toBe(0.5);
    expect(keyframes[2].property).toBe("opacity");
    expect(keyframes[2].controls.length).toBe(0);

    expect(keyframes[3].from).toBe(0.5);
    expect(keyframes[3].to).toBe(1);
    expect(keyframes[3].property).toBe("opacity");
    expect(keyframes[3].controls.length).toBe(0);
  });

  test("simple values.", () => {
    const animation = createAnimation({
      opacity: {
        from: 0,
        to: 1,
      },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.5);

    let currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.5);
    expect(currentValues.display).toBe("block");

    animation.update(1);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(1);
    expect(currentValues.display).toBe("block");
  });

  test("Both controls.", () => {
    const animation = createAnimation({
      opacity: {
        from: { value: 0, controlsOut: [-0.5] },
        to: {
          value: 1,
          controlsIn: [1.5],
        },
      },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.1);

    let currentValues = animation.currentValues;

    expect(approximatelyEqual(currentValues.opacity, -0.08)).toBe(true);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.984375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(1.014255);
    expect(currentValues.display).toBe("block");
  });

  test("Control out.", () => {
    const animation = createAnimation({
      opacity: {
        from: { value: 0, controlsOut: [-0.5] },
        to: 1,
      },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.1);

    let currentValues = animation.currentValues;

    expect(approximatelyEqual(currentValues.opacity, -0.08)).toBe(true);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.currentValues;

    expect(approximatelyEqual(0.9702, currentValues.opacity)).toBe(true);
    expect(currentValues.display).toBe("block");
  });

  test("Control in.", () => {
    const animation = createAnimation({
      opacity: { from: 0, to: { value: 1, controlsIn: [1.5] } },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.1);

    let currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.28);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(1.125);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.currentValues;

    expect(approximatelyEqual(currentValues.opacity, 1.00979)).toBe(true);
    expect(currentValues.display).toBe("block");
  });

  test("Both easings.", () => {
    const animation = createAnimation({
      opacity: {
        from: { value: 0, easeOut: "quad" },
        to: {
          value: 1,
          easeIn: "quad",
        },
      },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.1);

    let currentValues = animation.currentValues;

    expect(approximatelyEqual(0.028, currentValues.opacity)).toBe(true);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.84375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.999702);
    expect(currentValues.display).toBe("block");
  });

  test("Ease out.", () => {
    const animation = createAnimation({
      opacity: {
        from: { value: 0, easeOut: "quad" },
        to: 1,
      },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.1);

    let currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.010000000000000002);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.5625);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.9801);
    expect(currentValues.display).toBe("block");
  });

  test("Ease in.", () => {
    const animation = createAnimation({
      opacity: {
        from: 0,
        to: { value: 1, easeIn: "quad" },
      },
      display: {
        from: "none",
        to: "block",
      },
    });

    animation.update(0.1);

    let currentValues = animation.currentValues;

    expect(approximatelyEqual(0.19, currentValues.opacity)).toBe(true);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.9375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.currentValues;

    expect(currentValues.opacity).toBe(0.9999);
    expect(currentValues.display).toBe("block");
  });
});
