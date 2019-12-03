"use strict";

var _UnitNodeAnimator = _interopRequireDefault(require("../animators/UnitNodeAnimator.js"));

var _easings = _interopRequireDefault(require("../easings.js"));

var _unit = _interopRequireDefault(require("../patterns/unit.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["UnitNodeAnimator: "] = function () {
  var fromNode = _unit.default.parse(new _clarityPatternParser.Cursor("100px"));

  var toNode = _unit.default.parse(new _clarityPatternParser.Cursor("200px"));

  var animator = new _UnitNodeAnimator.default({
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear,
    controls: [fromNode, toNode]
  });
  var result = animator.render(0.5);

  _assert.default.equal(result, "150px");
};
//# sourceMappingURL=UnitNodeAnimator.js.map