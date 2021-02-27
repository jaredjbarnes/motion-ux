import Timeline from "../Timeline.js";
import MockClock from "../MockClock.js";
import assert from "assert";

exports["Timeline: Get current values as 0."] = () => {
  const name = "my-animation";
  const timeline = new Timeline([
    {
      name: name,
      property: "opacity",
      startAt: 0,
      endAt: 1,
      from: "0",
      to: "1",
    },
  ]);

  const values = timeline.render(0).getCurrentValues();

  assert.strictEqual(values[name].opacity.value, "0");
};

exports["Timeline: Animated value types do not match."] = () => {
  const name = "my-animation";

  assert.throws(
    () => {
      new Timeline([
        {
          name: name,
          property: "opacity",
          startAt: 0,
          endAt: 1,
          from: "0px",
          to: "1",
        },
      ]);
    },
    {
      message: `Invalid Animation: The value types that are being animated do not match. From: "0px", To:"1", Controls: []`,
    }
  );
};

exports["Timeline: Valid Path."] = () => {
  const name = "my-animation";
  const from =
    "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10";
  const to =
    "M 10 315 L 110 400 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 149.9 L 315 10";

  const timeline = new Timeline([
    {
      name: name,
      property: "path",
      startAt: 0,
      endAt: 1,
      from: from,
      to: to,
    },
  ]);

  timeline.render(1);
  const value = timeline.getCurrentValues()[name].path.value;

  assert.strictEqual(value, to);
};

exports["Timeline: Curved Path."] = () => {
  const name = "my-animation";
  const from = "M 0 0 C 0 0, 0 0, 0 0";
  const to = "M 10 10 C 150 150, 30 30, 20 20";

  const timeline = new Timeline([
    {
      name: name,
      property: "path",
      startAt: 0,
      endAt: 1,
      from: from,
      to: to,
    },
  ]);

  timeline.render(1);
  const value = timeline.getCurrentValues()[name].path.value;

  assert.strictEqual(value, to);
};

exports["Timeline: Multiple startAts on same property."] = () => {
  const name = "my-animation";
  const timeline = new Timeline([
    {
      name: name,
      property: "opacity",
      startAt: 0,
      endAt: 1,
      from: "1",
      to: "0",
    },
    {
      name: name,
      property: "display",
      startAt: 0.01,
      endAt: 0.01,
      from: "none",
      to: "block",
    },
    {
      name: name,
      property: "display",
      startAt: 0.25,
      endAt: 0.25,
      from: "block",
      to: "none",
    },
    {
      name: name,
      property: "display",
      startAt: 0.5,
      endAt: 0.5,
      from: "none",
      to: "block",
    },
    {
      name: name,
      property: "display",
      startAt: 0.99,
      endAt: 0.99,
      from: "block",
      to: "none",
    },
  ]);

  timeline.render(1);

  let values = timeline.getCurrentValues()[name];
  let opacity = values.opacity.value;
  let display = values.display.value;

  assert.strictEqual(display, "none");
  assert.strictEqual(opacity, "0");

  timeline.render(0.3);
  values = timeline.getCurrentValues()[name];

  opacity = values.opacity.value;
  display = values.display.value;

  assert.strictEqual(display, "none");
  assert.strictEqual(opacity, "0.7");

  timeline.render(0.49);
  values = timeline.getCurrentValues()[name];

  opacity = values.opacity.value;
  display = values.display.value;

  assert.strictEqual(display, "none");
  assert.strictEqual(opacity, "0.51");

  timeline.render(0.75);
  values = timeline.getCurrentValues()[name];

  opacity = values.opacity.value;
  display = values.display.value;

  assert.strictEqual(display, "block");
  assert.strictEqual(opacity, "0.25");

  timeline.render(0);
  values = timeline.getCurrentValues()[name];

  opacity = values.opacity.value;
  display = values.display.value;

  assert.strictEqual(display, "none");
  assert.strictEqual(opacity, "1");
};
