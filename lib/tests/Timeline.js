"use strict";

var _Timeline = _interopRequireDefault(require("../Timeline.js"));

var _MockClock = _interopRequireDefault(require("../MockClock.js"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["Timeline: Get current values as 0."] = function () {
  var name = "my-animation";
  var timeline = new _Timeline.default([{
    name: name,
    property: "opacity",
    startAt: 0,
    endAt: 1,
    from: "0",
    to: "1"
  }]);
  var values = timeline.render(0).getCurrentValues();

  _assert.default.strictEqual(values[name].opacity, "0");
};

exports["Timeline: Animated value types do not match."] = function () {
  var name = "my-animation";

  _assert.default.throws(function () {
    new _Timeline.default([{
      name: name,
      property: "opacity",
      startAt: 0,
      endAt: 1,
      from: "0px",
      to: "1"
    }]);
  }, {
    message: "Invalid Animation: The value types that are being animated do not match. From: \"0px\", To:\"1\", Controls: []"
  });
};

exports["Timeline: Valid Path."] = function () {
  var name = "my-animation";
  var from = "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10";
  var to = "M 10 315 L 110 400 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 149.9 L 315 10";
  var timeline = new _Timeline.default([{
    name: name,
    property: "path",
    startAt: 0,
    endAt: 1,
    from: from,
    to: to
  }]);
  timeline.render(1);
  var value = timeline.getCurrentValues()[name].path;

  _assert.default.strictEqual(value, to);
};

exports["Timeline: Curved Path."] = function () {
  var name = "my-animation";
  var from = "M 0 0 C 0 0, 0 0, 0 0";
  var to = "M 10 10 C 150 150, 30 30, 20 20";
  var timeline = new _Timeline.default([{
    name: name,
    property: "path",
    startAt: 0,
    endAt: 1,
    from: from,
    to: to
  }]);
  timeline.render(1);
  var value = timeline.getCurrentValues()[name].path;

  _assert.default.strictEqual(value, to);
};

exports["Timeline: Multiple startAts on same property."] = function () {
  var name = "my-animation";
  var timeline = new _Timeline.default([{
    name: name,
    property: "opacity",
    startAt: 0,
    endAt: 1,
    from: "1",
    to: "0"
  }, {
    name: name,
    property: "display",
    startAt: 0.01,
    endAt: 0.01,
    from: "none",
    to: "block"
  }, {
    name: name,
    property: "display",
    startAt: 0.25,
    endAt: 0.25,
    from: "block",
    to: "none"
  }, {
    name: name,
    property: "display",
    startAt: 0.5,
    endAt: 0.5,
    from: "none",
    to: "block"
  }, {
    name: name,
    property: "display",
    startAt: 0.99,
    endAt: 0.99,
    from: "block",
    to: "none"
  }]);
  timeline.render(1);
  var values = timeline.getCurrentValues()[name];
  var opacity = values.opacity;
  var display = values.display;

  _assert.default.strictEqual(display, "none");

  _assert.default.strictEqual(opacity, "0");

  timeline.render(0.3);
  values = timeline.getCurrentValues()[name];
  opacity = values.opacity;
  display = values.display;

  _assert.default.strictEqual(display, "none");

  _assert.default.strictEqual(opacity, "0.7");

  timeline.render(0.49);
  values = timeline.getCurrentValues()[name];
  opacity = values.opacity;
  display = values.display;

  _assert.default.strictEqual(display, "none");

  _assert.default.strictEqual(opacity, "0.51");

  timeline.render(0.75);
  values = timeline.getCurrentValues()[name];
  opacity = values.opacity;
  display = values.display;

  _assert.default.strictEqual(display, "block");

  _assert.default.strictEqual(opacity, "0.25");

  timeline.render(0);
  values = timeline.getCurrentValues()[name];
  opacity = values.opacity;
  display = values.display;

  _assert.default.strictEqual(display, "none");

  _assert.default.strictEqual(opacity, "1");
};
//# sourceMappingURL=Timeline.js.map