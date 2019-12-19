"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var number = new _clarityPatternParser.RegexValue("number", "[-+]?[0-9]*[.]?[0-9]+([eE][-+]?[0-9]+)?");
var _default = number;
exports.default = _default;
//# sourceMappingURL=number.js.map