"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _number = _interopRequireDefault(require("./number.js"));

var _letter = _interopRequireDefault(require("./letter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var percent = new _clarityPatternParser.Literal("%", "%");
var character = new _clarityPatternParser.OrValue("character", [_letter.default, percent]);
var unitType = new _clarityPatternParser.RepeatValue("unit-type", character);
var unit = new _clarityPatternParser.AndComposite("unit", [_number.default, unitType]);
var _default = unit;
exports.default = _default;
//# sourceMappingURL=unit.js.map