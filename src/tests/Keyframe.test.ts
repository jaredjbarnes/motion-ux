import Keyframe from "../Keyframe";
import Animation from "../Animation";

describe("Keyframe", () => {
  test("createKeyframes: Many Steps.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: 0,
      },
      "25%": {
        opacity: 0.75,
      },
      "50%": {
        opacity: 0.25,
      },
      "75%": {
        opacity: 0.5,
      },
      to: {
        opacity: 1,
      },
    });

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

  test("createKeyframes: simple values.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: 0,
        display: "none",
      },
      to: {
        opacity: 1,
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.5);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.5);
    expect(currentValues.display).toBe("block");

    animation.update(1);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(1);
    expect(currentValues.display).toBe("block");
  });

  test("createKeyframes: Both controls.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: { value: 0, controlsOut: [-0.5] },
        display: "none",
      },
      to: {
        opacity: {
          value: 1,
          controlsIn: [1.5],
        },
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.1);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(-0.08);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.984375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(1.014255);
    expect(currentValues.display).toBe("block");
  });

  test("createKeyframes: Control out.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: { value: 0, controlsOut: [-0.5] },
        display: "none",
      },
      to: {
        opacity: 1,
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.1);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(-0.08);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.9702000000000001);
    expect(currentValues.display).toBe("block");
  });

  test("createKeyframes: Control in.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: 0,
        display: "none",
      },
      to: {
        opacity: { value: 1, controlsIn: [1.5] },
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.1);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.28);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(1.125);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(1.0097999999999998);
    expect(currentValues.display).toBe("block");
  });

  test("createKeyframes: Both easings.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: { value: 0, easeOut: "quad" },
        display: "none",
      },
      to: {
        opacity: {
          value: 1,
          easeIn: "quad",
        },
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.1);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.028);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.84375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.999702);
    expect(currentValues.display).toBe("block");
  });

  test("createKeyframes: Ease out.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: { value: 0, easeOut: "quad" },
        display: "none",
      },
      to: {
        opacity: 1,
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.1);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.010000000000000002);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.5625);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.9801);
    expect(currentValues.display).toBe("block");
  });

  test("createKeyframes: Ease in.", () => {
    const keyframes = Keyframe.createKeyframes({
      from: {
        opacity: 0,
        display: "none",
      },
      to: {
        opacity: { value: 1, easeIn: "quad" },
        display: "block",
      },
    });

    const animation = new Animation("css", keyframes);

    animation.update(0.1);

    let currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.19);
    expect(currentValues.display).toBe("block");

    animation.update(0.75);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.9375);
    expect(currentValues.display).toBe("block");

    animation.update(0.99);

    currentValues = animation.getCurrentValues();

    expect(currentValues.opacity).toBe(0.9999);
    expect(currentValues.display).toBe("block");
  });
});
