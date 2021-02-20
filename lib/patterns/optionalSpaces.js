"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var space = new _clarityPatternParser.Literal("optional-space", " ");
var spaces = new _clarityPatternParser.RepeatValue("optional-spaces", space);
var optionalSpaces = new _clarityPatternParser.OptionalValue(spaces);
var _default = optionalSpaces;
exports.default = _default;
//# sourceMappingURL=optionalSpaces.js.map