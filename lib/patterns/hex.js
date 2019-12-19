"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var hex = new _clarityPatternParser.RegexValue("hex", "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}");
var _default = hex;
exports.default = _default;
//# sourceMappingURL=hex.js.map