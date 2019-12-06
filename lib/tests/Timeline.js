"use strict";

var _Timeline = _interopRequireDefault(require("../Timeline.js"));

var _MockClock = _interopRequireDefault(require("../MockClock.js"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["Timeline: Get current values as 0."] = function () {
  var target = {};
  var clock = new _MockClock.default();
  var timeline = new _Timeline.default({
    animations: [{
      target: target,
      name: "opacity",
      startAt: 0,
      endAt: 1,
      from: "0",
      to: "1"
    }],
    duration: 1000,
    clock: clock
  });
  var values = timeline.getValuesAt(0);

  _assert.default.equal(values.values().next().value.opacity, 0);
};

exports["Timeline: Dispose."] = function () {
  var target = {};
  var clock = new _MockClock.default();
  var timeline = new _Timeline.default({
    animations: [{
      target: target,
      name: "opacity",
      startAt: 0,
      endAt: 1,
      from: "0",
      to: "1"
    }],
    duration: 1000,
    clock: clock
  });
  timeline.play();
  timeline.observe("RENDER", function () {});

  _assert.default.equal(timeline.scrubber.observers.length, 1);

  _assert.default.equal(timeline.scrubber.state, 1);

  timeline.dispose();

  _assert.default.equal(timeline.scrubber.observers.length, 0);

  _assert.default.equal(timeline.scrubber.state, 0);
};
//# sourceMappingURL=Timeline.js.map