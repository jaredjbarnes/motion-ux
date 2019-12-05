"use strict";

var _Timeline = _interopRequireDefault(require("../Timeline.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["Timeline: Get current values as 0."] = function () {
  var target = {};
  var timeline = new _Timeline.default({
    animations: [{
      target: target,
      name: "opacity",
      startAt: 0,
      endAt: 1,
      from: "0",
      to: "1"
    }],
    duration: 1000
  });
  var values = timeline.getValuesAt(0);
};
//# sourceMappingURL=Timeline.js.map