"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _spaces = _interopRequireDefault(require("./spaces.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comma = new _clarityPatternParser.Literal("comma", ",");
var optionalSpaces = new _clarityPatternParser.OptionalValue(_spaces.default);
var divider = new _clarityPatternParser.AndValue("divider", [optionalSpaces, comma, optionalSpaces]);
var _default = divider;
exports.default = _default;
//# sourceMappingURL=divider.js.map