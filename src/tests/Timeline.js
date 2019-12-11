import Timeline from "../Timeline.js";
import MockClock from "../MockClock.js";
import assert from "assert";

exports["Timeline: Get current values as 0."] = () => {
  const target = {};
  const clock = new MockClock();

  const timeline = new Timeline({
    animations: [
      {
        target: target,
        name: "opacity",
        startAt: 0,
        endAt: 1,
        from: "0",
        to: "1"
      }
    ],
    duration: 1000,
    clock: clock
  });

  const values = timeline.getValuesAt(0);

  assert.equal(values.values().next().value.opacity, 0);
};

exports["Timeline: Dispose."] = () => {
  const target = {};
  const clock = new MockClock();

  const timeline = new Timeline({
    animations: [
      {
        target: target,
        name: "opacity",
        startAt: 0,
        endAt: 1,
        from: "0",
        to: "1"
      }
    ],
    duration: 1000,
    clock
  });

  timeline.play();

  timeline.observe("RENDER", () => {});
  assert.equal(timeline.scrubber.observers.length, 1);
  assert.equal(timeline.scrubber.state, 1);

  timeline.dispose();
  assert.equal(timeline.scrubber.observers.length, 0);
  assert.equal(timeline.scrubber.state, 0);
};

exports["Timeline: Animated value types do not match."] = () => {
  const target = {};
  const clock = new MockClock();

  assert.throws(
    () => {
      new Timeline({
        animations: [
          {
            target: target,
            name: "opacity",
            startAt: 0,
            endAt: 1,
            from: "0px",
            to: "1"
          }
        ],
        duration: 1000,
        clock
      });
    },
    {
      message: `Invalid Animation: The value types that are being animated do not match. From: "0px", To:"1", Controls: []`
    }
  );
};

exports["Timeline: Valid Path."] = () => {
  const target = {};
  const clock = new MockClock();
  const from =
    "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10";
  const to =
    "M 10 315 L 110 400 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 149.9 L 315 10";

  const timeline = new Timeline({
    animations: [
      {
        target: target,
        name: "path",
        startAt: 0,
        endAt: 1,
        from: from,
        to: to
      }
    ],
    duration: 1000,
    clock
  });

  timeline.seek(1);
  const value = timeline
    .getCurrentValues()
    .values()
    .next().value.path;

  assert.equal(value, to);
};

exports["Timeline: Curved Path."] = () => {
  const target = {};
  const clock = new MockClock();
  const from = "M 0 0 C 0 0, 0 0, 0 0";
  const to = "M 10 10 C 150 150, 30 30, 20 20";

  const timeline = new Timeline({
    animations: [
      {
        target: target,
        name: "path",
        startAt: 0,
        endAt: 1,
        from: from,
        to: to
      }
    ],
    duration: 1000,
    clock
  });

  timeline.seek(1);
  const value = timeline
    .getCurrentValues()
    .values()
    .next().value.path;

  assert.equal(value, to);
};

exports["Timeline: Mutliple startAts on same property."] = () => {
  const target = {};
  const clock = new MockClock();

  const timeline = new Timeline({
    animations: [
      {
        target: target,
        name: "opacity",
        startAt: 0,
        endAt: 1,
        from: "1",
        to: "0"
      },
      {
        target: target,
        name: "display",
        startAt: 0.01,
        endAt: 0.01,
        from: "none",
        to: "block"
      },
      {
        target: target,
        name: "display",
        startAt: 0.25,
        endAt: 0.25,
        from: "block",
        to: "none"
      },
      {
        target: target,
        name: "display",
        startAt: 0.5,
        endAt: 0.5,
        from: "none",
        to: "block"
      },
      {
        target: target,
        name: "display",
        startAt: 0.99,
        endAt: 0.99,
        from: "block",
        to: "none"
      }
    ],
    duration: 1000,
    clock
  });

  timeline.seek(1);
  let values = timeline
    .getCurrentValues()
    .values()
    .next().value;

  let opacity = values.opacity;
  let display = values.display;

  assert.equal(display, "none");
  assert.equal(opacity, "0");

  timeline.seek(0.3);
  values = timeline
    .getCurrentValues()
    .values()
    .next().value;

  opacity = values.opacity;
  display = values.display;

  assert.equal(display, "none");
  assert.equal(opacity, "0.7");

  timeline.seek(0.49);
  values = timeline
    .getCurrentValues()
    .values()
    .next().value;

  opacity = values.opacity;
  display = values.display;

  assert.equal(display, "none");
  assert.equal(opacity, "0.51");

  timeline.seek(0.75);
  values = timeline
    .getCurrentValues()
    .values()
    .next().value;

  opacity = values.opacity;
  display = values.display;

  assert.equal(display, "block");
  assert.equal(opacity, "0.25");

  timeline.seek(0);
  values = timeline
    .getCurrentValues()
    .values()
    .next().value;

  opacity = values.opacity;
  display = values.display;

  assert.equal(display, "none");
  assert.equal(opacity, "1");
};