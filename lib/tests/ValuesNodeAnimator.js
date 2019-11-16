"use strict";

var _ValuesNodeAnimator = _interopRequireDefault(require("../animators/ValuesNodeAnimator.js"));

var _easings = _interopRequireDefault(require("../easings.js"));

var _values = _interopRequireDefault(require("../patterns/values.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

exports["ValuesNodeAnimator: "] = function () {
  var fromNode = _values.default.parse(new _clarityPatternParser.Cursor("linear-gradient(to left, #000, #000 50%, #eee 75%, #333 75%)"));

  var toNode = _values.default.parse(new _clarityPatternParser.Cursor("linear-gradient(to left, #fff, #fff 50%, #eee 75%, #333 50%)"));

  var animator = new _ValuesNodeAnimator.default({
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear,
    fromNode: fromNode,
    toNode: toNode
  });
  var result = animator.render(0.75);
};
//# sourceMappingURL=ValuesNodeAnimator.js.map