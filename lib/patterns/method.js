"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _name = _interopRequireDefault(require("./name.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comma = new _clarityPatternParser.Literal("comma", ",");
var space = new _clarityPatternParser.Literal("space", " ");
var spaces = new _clarityPatternParser.RepeatValue("spaces", space);
var optionalSpaces = new _clarityPatternParser.OptionalValue(spaces);
var divider = new _clarityPatternParser.AndValue("divider", [optionalSpaces, comma, optionalSpaces]);
var openParen = new _clarityPatternParser.Literal("open-paren", "(");
var closeParen = new _clarityPatternParser.Literal("close-paren", ")");
var values = new _clarityPatternParser.RecursivePattern("values");
var args = new _clarityPatternParser.RepeatComposite("arguments", values, divider);
var optionalArgs = new _clarityPatternParser.OptionalComposite(args);
var method = new _clarityPatternParser.AndComposite("method", [_name.default, openParen, optionalSpaces, optionalArgs, optionalSpaces, closeParen]);
var _default = method;
exports.default = _default;
//# sourceMappingURL=method.js.map