"use strict";

var _MethodNodeAnimator = _interopRequireDefault(require("../animators/MethodNodeAnimator.js"));

var _easings = _interopRequireDefault(require("../easings.js"));

var _values = _interopRequireDefault(require("../patterns/values.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

exports["MethodNodeAnimator: "] = function () {
  var fromNode = _values.default.parse(new _clarityPatternParser.Cursor("rgba(0,0,0,0)")).children[0];

  var toNode = _values.default.parse(new _clarityPatternParser.Cursor("rgba(255,255,255,1)")).children[0];

  var animator = new _MethodNodeAnimator.default({
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear,
    controls: [fromNode, toNode]
  });
  var result = animator.render(0.5);

  _assert.default.equal(result, "rgba(127.5, 127.5, 127.5, 0.5)");
};
//# sourceMappingURL=MethodNodeAnimator.js.map