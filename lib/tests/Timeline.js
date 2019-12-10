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

exports["Timeline: Animated value types do not match."] = function () {
  var target = {};
  var clock = new _MockClock.default();

  _assert.default.throws(function () {
    new _Timeline.default({
      animations: [{
        target: target,
        name: "opacity",
        startAt: 0,
        endAt: 1,
        from: "0px",
        to: "1"
      }],
      duration: 1000,
      clock: clock
    });
  }, {
    message: "Invalid Animation: The value types that are being animated do not match. From: \"0px\", To:\"1\", Controls: []"
  });
};

exports["Timeline: Valid Path."] = function () {
  var target = {};
  var clock = new _MockClock.default();
  var from = "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10";
  var to = "M 10 315 L 110 400 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 149.9 L 315 10";
  var timeline = new _Timeline.default({
    animations: [{
      target: target,
      name: "path",
      startAt: 0,
      endAt: 1,
      from: from,
      to: to
    }],
    duration: 1000,
    clock: clock
  });
  timeline.seek(1);
  var value = timeline.getCurrentValues().values().next().value.path;

  _assert.default.equal(value, to);
};

exports["Timeline: Curved Path."] = function () {
  var target = {};
  var clock = new _MockClock.default();
  var from = "M 0 0 C 0 0, 0 0, 0 0";
  var to = "M 10 10 C 150 150, 30 30, 20 20";
  var timeline = new _Timeline.default({
    animations: [{
      target: target,
      name: "path",
      startAt: 0,
      endAt: 1,
      from: from,
      to: to
    }],
    duration: 1000,
    clock: clock
  });
  timeline.seek(1);
  var value = timeline.getCurrentValues().values().next().value.path;

  _assert.default.equal(value, to);
};

exports["Timeline: Mutliple startAts on same property."] = function () {
  var target = {};
  var clock = new _MockClock.default();
  var timeline = new _Timeline.default({
    animations: [{
      target: target,
      name: "opacity",
      startAt: 0,
      endAt: 1,
      from: "1",
      to: "0"
    }, {
      target: target,
      name: "display",
      startAt: 0.01,
      endAt: 0.01,
      from: "none",
      to: "block"
    }, {
      target: target,
      name: "display",
      startAt: 0.25,
      endAt: 0.25,
      from: "block",
      to: "none"
    }, {
      target: target,
      name: "display",
      startAt: 0.5,
      endAt: 0.5,
      from: "none",
      to: "block"
    }, {
      target: target,
      name: "display",
      startAt: 0.99,
      endAt: 0.99,
      from: "block",
      to: "none"
    }],
    duration: 1000,
    clock: clock
  });
  timeline.seek(1);
  var values = timeline.getCurrentValues().values().next().value;
  var opacity = values.opacity;
  var display = values.display;

  _assert.default.equal(display, "none");

  _assert.default.equal(opacity, "0");

  timeline.seek(0.3);
  values = timeline.getCurrentValues().values().next().value;
  opacity = values.opacity;
  display = values.display;

  _assert.default.equal(display, "none");

  _assert.default.equal(opacity, "0.7");

  timeline.seek(0.49);
  values = timeline.getCurrentValues().values().next().value;
  opacity = values.opacity;
  display = values.display;

  _assert.default.equal(display, "none");

  _assert.default.equal(opacity, "0.51");

  timeline.seek(0.75);
  values = timeline.getCurrentValues().values().next().value;
  opacity = values.opacity;
  display = values.display;

  _assert.default.equal(display, "block");

  _assert.default.equal(opacity, "0.25");

  timeline.seek(0);
  values = timeline.getCurrentValues().values().next().value;
  opacity = values.opacity;
  display = values.display;

  _assert.default.equal(display, "none");

  _assert.default.equal(opacity, "1");
};
//# sourceMappingURL=Timeline.js.map