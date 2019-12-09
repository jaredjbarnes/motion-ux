"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var space = new _clarityPatternParser.Literal("space", " ");
var spaces = new _clarityPatternParser.RepeatValue("spaces", space);
var _default = spaces;
exports.default = _default;
//# sourceMappingURL=spaces.js.map