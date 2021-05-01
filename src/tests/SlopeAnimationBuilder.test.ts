import easings from "../easings";
import SlopeAnimationBuilder from "../SlopeAnimationBuilder";
import Animation from "../Animation";
import Keyframe from "../Keyframe";

describe("SlopeAnimationBuilder", () => {
  test("Forward", () => {
    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: "test",
        property: "left",
        from: "100",
        to: "200",
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 0.5, 1000, 1000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.getCurrentValues();

    expect(values.test.left.value).toBe("249.99999999990905");
  });

  test("Forward with longer duration.", () => {
    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: "test",
        property: "left",
        from: "100",
        to: "200",
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 0.5, 1000, 2000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.getCurrentValues();

    expect(values.test.left.value).toBe("349.9999999998181");
  });

  test("Backward with longer duration.", () => {
    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: "test",
        property: "left",
        from: "100",
        to: "200",
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 0.5, 1000, 1000, -1);
    slopeAnimation.update(1);
    let values = slopeAnimation.getCurrentValues();

    expect(values.test.left.value).toBe("150");

    slopeAnimation.update(0);
    values = slopeAnimation.getCurrentValues();

    expect(values.test.left.value).toBe("50.00000000009095");
  });

  test("Stopped", () => {
    const animation = new Animation([
      Keyframe.fromSimpleConfig({
        name: "test",
        property: "left",
        from: "100",
        to: "200",
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 0.5, 1000, 1000, 0);
    slopeAnimation.update(1);
    const values = slopeAnimation.getCurrentValues();

    expect(values.test.left.value).toBe("150");
  });
});
