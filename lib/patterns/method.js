"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../node_modules/clarity-pattern-parser/src/index.js");

var _name = _interopRequireDefault(require("./name.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comma = new _index.Literal("comma", ",");
var space = new _index.Literal("space", " ");
var spaces = new _index.RepeatValue("spaces", space);
var optionalSpaces = new _index.OptionalValue(spaces);
var divider = new _index.AndValue("divider", [optionalSpaces, comma, optionalSpaces]);
var openParen = new _index.Literal("open-paren", "(");
var closeParen = new _index.Literal("close-paren", ")");
var values = new _index.RecursivePattern("values");
var args = new _index.RepeatComposite("arguments", values, divider);
var optionalArgs = new _index.OptionalComposite(args);
var method = new _index.AndComposite("method", [_name.default, openParen, optionalSpaces, optionalArgs, optionalSpaces, closeParen]);
var _default = method;
exports.default = _default;
//# sourceMappingURL=method.js.map