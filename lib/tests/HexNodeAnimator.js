"use strict";

var _HexNodeAnimator = _interopRequireDefault(require("../animators/HexNodeAnimator.js"));

var _easings = _interopRequireDefault(require("../easings.js"));

var _hex = _interopRequireDefault(require("../patterns/hex.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["HexNodeAnimator: "] = function () {
  var fromNode = _hex.default.parse(new _clarityPatternParser.Cursor("#000000"));

  var toNode = _hex.default.parse(new _clarityPatternParser.Cursor("#FFFFFF"));

  var animator = new _HexNodeAnimator.default({
    startAt: 0,
    endAt: 1,
    easing: _easings.default.linear,
    fromNode: fromNode,
    toNode: toNode
  });
  var result = animator.render(0.5);

  _assert.default.equal(result, "rgba(128,128,128, 1)");
};
//# sourceMappingURL=HexNodeAnimator.js.map