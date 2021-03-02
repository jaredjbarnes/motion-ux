import assert from "assert";
import easings from "../easings.js";
import SlopeTimelineBuilder from "../SlopeTimelineBuilder.js";
import Timeline from "../Timeline.js";

exports["SlopeTimelineBuilder: Forward"] = () => {
  const timeline = new Timeline([
    {
      name: "test",
      property: "left",
      from: "100",
      to: "200",
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    },
  ]);

  const builder = new SlopeTimelineBuilder();
  const slopeTimeline = builder.build(timeline, 0.5, 1000, 1000, 1);
  slopeTimeline.render(1);
  const values = slopeTimeline.getCurrentValues();

  assert.strictEqual(values.test.left.value, "249.99999999990905");
};

exports["SlopeTimelineBuilder: Forward with longer duration."] = () => {
  const timeline = new Timeline([
    {
      name: "test",
      property: "left",
      from: "100",
      to: "200",
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    },
  ]);

  const builder = new SlopeTimelineBuilder();
  const slopeTimeline = builder.build(timeline, 0.5, 1000, 2000, 1);
  slopeTimeline.render(1);
  const values = slopeTimeline.getCurrentValues();

  assert.strictEqual(values.test.left.value, "349.9999999998181");
};

exports["SlopeTimelineBuilder: Backward"] = () => {
  const timeline = new Timeline([
    {
      name: "test",
      property: "left",
      from: "100",
      to: "200",
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    },
  ]);

  const builder = new SlopeTimelineBuilder();
  const slopeTimeline = builder.build(timeline, 0.5, 1000, 1000, -1);
  slopeTimeline.render(1);
  const values = slopeTimeline.getCurrentValues();

  assert.strictEqual(values.test.left.value, "50.00000000009095");
};

exports["SlopeTimelineBuilder: Stopped"] = () => {
  const timeline = new Timeline([
    {
      name: "test",
      property: "left",
      from: "100",
      to: "200",
      startAt: 0,
      endAt: 1,
      easing: easings.linear,
    },
  ]);

  const builder = new SlopeTimelineBuilder();
  const slopeTimeline = builder.build(timeline, 0.5, 1000, 1000, 0);
  slopeTimeline.render(1);
  const values = slopeTimeline.getCurrentValues();

  assert.strictEqual(values.test.left.value, "150");
};
