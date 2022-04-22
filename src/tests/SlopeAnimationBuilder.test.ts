import easings from "../easings";
import SlopeAnimationBuilder from "../SlopeAnimationBuilder";
import Animation from "../Animation";
import Keyframe from "../Keyframe";

describe("SlopeAnimationBuilder", () => {
  test("Forward", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: 100,
        to: 200,
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 1000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left.toString(), 10)).toBe(250);
  });

  test("Forward with longer duration.", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: 100,
        to: 200,
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 2000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left.toString(), 10)).toBe(350);
  });

  test("Stopped", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: 100,
        to: 200,
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build<number>(animation, 1000, 0.5, 1000);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left.toString(), 10)).toBe(150);
  });

  test("Forward Array", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: [100],
        to: [200],
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 1000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left[0].toString(), 10)).toBe(250);
  });

  test("Forward Array with longer duration.", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: [100],
        to: [200],
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 2000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left[0].toString(), 10)).toBe(350);
  });

  test("Stopped Array", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: [100],
        to: [200],
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build<number[]>(animation, 1000, 0.5, 1000);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left[0].toString(), 10)).toBe(150);
  });

  test("Forward Object", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: { property: 100 },
        to: { property: 200 },
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 1000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left.property.toString(), 10)).toBe(250);
  });

  test("Forward Object with longer duration.", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: { property: 100 },
        to: { property: 200 },
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);
    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 2000, 1);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left.property.toString(), 10)).toBe(350);
  });

  test("Stopped Object", () => {
    const animation = new Animation("position", [
      new Keyframe({
        property: "left",
        from: { property: 100 },
        to: { property: 200 },
        startAt: 0,
        endAt: 1,
        easing: easings.linear,
      }),
    ]);

    const builder = new SlopeAnimationBuilder();
    const slopeAnimation = builder.build(animation, 1000, 0.5, 1000);
    slopeAnimation.update(1);
    const values = slopeAnimation.currentValues;

    expect(parseInt(values.left.property.toString(), 10)).toBe(150);
  });
});
