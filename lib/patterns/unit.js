"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _number = _interopRequireDefault(require("./number.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unitType = new _clarityPatternParser.RegexValue("unit-type", "[a-zA-Z]+|%");
var unit = new _clarityPatternParser.AndComposite("unit", [_number.default, unitType]);
var _default = unit;
exports.default = _default;
//# sourceMappingURL=unit.js.map