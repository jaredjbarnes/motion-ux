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
