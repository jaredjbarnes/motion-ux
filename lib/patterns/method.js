"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _name = _interopRequireDefault(require("./name.js"));

var _optionalSpaces = _interopRequireDefault(require("./optionalSpaces.js"));

var _divider = _interopRequireDefault(require("./divider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openParen = new _clarityPatternParser.Literal("open-paren", "(");
var closeParen = new _clarityPatternParser.Literal("close-paren", ")");
var values = new _clarityPatternParser.RecursivePattern("values");
var args = new _clarityPatternParser.RepeatComposite("arguments", values, _divider.default);
var optionalArgs = new _clarityPatternParser.OptionalComposite(args);
var method = new _clarityPatternParser.AndComposite("method", [_name.default, openParen, _optionalSpaces.default, optionalArgs, _optionalSpaces.default, closeParen]);
var _default = method;
exports.default = _default;
//# sourceMappingURL=method.js.map