"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _easings = _interopRequireDefault(require("../easings.js"));

var _SlopeTimelineBuilder = _interopRequireDefault(require("../SlopeTimelineBuilder.js"));

var _Timeline = _interopRequireDefault(require("../Timeline.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["SlopeTimelineBuilder: Forward"] = function () {
  var timeline = new _Timeline.default([{
    name: "test",
    property: "left",
    from: "100",
    to: "200",
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear
  }]);
  var builder = new _SlopeTimelineBuilder.default();
  var slopeTimeline = builder.build(timeline, 0.5, 1000, 1000, 1);
  slopeTimeline.update(1);
  var values = slopeTimeline.getCurrentValues();

  _assert.default.strictEqual(values.test.left.value, "249.99999999990905");
};

exports["SlopeTimelineBuilder: Forward with longer duration."] = function () {
  var timeline = new _Timeline.default([{
    name: "test",
    property: "left",
    from: "100",
    to: "200",
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear
  }]);
  var builder = new _SlopeTimelineBuilder.default();
  var slopeTimeline = builder.build(timeline, 0.5, 1000, 2000, 1);
  slopeTimeline.update(1);
  var values = slopeTimeline.getCurrentValues();

  _assert.default.strictEqual(values.test.left.value, "349.9999999998181");
};

exports["SlopeTimelineBuilder: Backward"] = function () {
  var timeline = new _Timeline.default([{
    name: "test",
    property: "left",
    from: "100",
    to: "200",
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear
  }]);
  var builder = new _SlopeTimelineBuilder.default();
  var slopeTimeline = builder.build(timeline, 0.5, 1000, 1000, -1);
  slopeTimeline.update(1);
  var values = slopeTimeline.getCurrentValues();

  _assert.default.strictEqual(values.test.left.value, "50.00000000009095");
};

exports["SlopeTimelineBuilder: Stopped"] = function () {
  var timeline = new _Timeline.default([{
    name: "test",
    property: "left",
    from: "100",
    to: "200",
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear
  }]);
  var builder = new _SlopeTimelineBuilder.default();
  var slopeTimeline = builder.build(timeline, 0.5, 1000, 1000, 0);
  slopeTimeline.update(1);
  var values = slopeTimeline.getCurrentValues();

  _assert.default.strictEqual(values.test.left.value, "150");
};
//# sourceMappingURL=SlopeTimelineBuilder.js.map