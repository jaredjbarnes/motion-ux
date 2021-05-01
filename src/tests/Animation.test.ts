import Animation from "../Animation";
import Keyframe from "../Keyframe";

describe("Animation", () => {
  test("Get current values as 0.", () => {
    const name = "my-animation";
    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: name,
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: "0",
        to: "1",
      }),
    ]);

    const values = animation.update(0).getCurrentValues();

    expect(values[name].opacity.value).toBe("0");
  });

  test("Animated value types do not match.", () => {
    const name = "my-animation";

    expect(() => {
      new Animation([
        Keyframe.fromSimpleConfig({
          name: name,
          property: "opacity",
          startAt: 0,
          endAt: 1,
          from: "0px",
          to: "1",
        }),
      ]);
    }).toThrow(
      `Invalid Keyframe: The value types that are being animated do not match. From: "0px", To:"1", Controls: []`
    );
  });

  test("Valid Path.", () => {
    const name = "my-animation";
    const from =
      "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10";
    const to =
      "M 10 315 L 110 400 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 149.9 L 315 10";

    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: name,
        property: "path",
        startAt: 0,
        endAt: 1,
        from: from,
        to: to,
      }),
    ]);

    animation.update(1);
    const value = animation.getCurrentValues()[name].path.value;

    expect(value).toBe(to);
  });

  test("Curved Path.", () => {
    const name = "my-animation";
    const from = "M 0 0 C 0 0, 0 0, 0 0";
    const to = "M 10 10 C 150 150,30 30,20 20";

    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: name,
        property: "path",
        startAt: 0,
        endAt: 1,
        from: from,
        to: to,
      }),
    ]);

    animation.update(1);
    const value = animation.getCurrentValues()[name].path.value;

    expect(value).toBe(to);
  });

  test("Multiple startAts on same property.", () => {
    const name = "my-animation";
    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: name,
        property: "opacity",
        startAt: 0,
        endAt: 1,
        from: "1",
        to: "0",
      }),
      Keyframe.fromSimpleConfig({
        name: name,
        property: "display",
        startAt: 0.01,
        endAt: 0.01,
        from: "none",
        to: "block",
      }),
      Keyframe.fromSimpleConfig({
        name: name,
        property: "display",
        startAt: 0.25,
        endAt: 0.25,
        from: "block",
        to: "none",
      }),
      Keyframe.fromSimpleConfig({
        name: name,
        property: "display",
        startAt: 0.5,
        endAt: 0.5,
        from: "none",
        to: "block",
      }),
      Keyframe.fromSimpleConfig({
        name: name,
        property: "display",
        startAt: 0.99,
        endAt: 0.99,
        from: "block",
        to: "none",
      }),
    ]);

    animation.update(1);

    let values = animation.getCurrentValues()[name];
    let opacity = values.opacity.value;
    let display = values.display.value;

    expect(display).toBe("none");
    expect(opacity).toBe("0");

    animation.update(0.3);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity.value;
    display = values.display.value;

    expect(display).toBe("none");
    expect(opacity).toBe("0.7");

    animation.update(0.49);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity.value;
    display = values.display.value;

    expect(display).toBe("none");
    expect(opacity).toBe("0.51");

    animation.update(0.75);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity.value;
    display = values.display.value;

    expect(display).toBe("block");
    expect(opacity).toBe("0.25");

    animation.update(0);
    values = animation.getCurrentValues()[name];

    opacity = values.opacity.value;
    display = values.display.value;

    expect(display).toBe("none");
    expect(opacity).toBe("1");
  });

  // test("AnimationConfig", ()=>{
  //   const animation = Animation.from("test", {
  //     from: {
  //       fontSize: "10px",
  //       width: "100%",
  //       height: "100%",
  //     },
  //     "75%": {
  //       fontSize: "15px",
  //       width: {
  //         value: "300%"
  //       },
  //       height: "300%",
  //     },
  //     to: {
  //       fontSize: "20px",
  //       width: "50%",
  //       height: "75%",
  //     },
  //   });

  //   expect(animation.animators.length).toBe(6);
  // });
});
