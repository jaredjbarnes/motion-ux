"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _value = _interopRequireDefault(require("./value.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
var space = new _clarityPatternParser.Literal("space", " ");
var spaces = new _clarityPatternParser.RepeatValue("spaces", space);
var values = new _clarityPatternParser.RepeatComposite("values", _value.default, spaces);
var _default = values;
exports.default = _default;
//# sourceMappingURL=values.js.map