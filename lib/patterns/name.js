"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../node_modules/clarity-pattern-parser/src/index.js");

var letter = new _index.AnyOfThese("letter", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
var digit = new _index.AnyOfThese("digit", "0987654321");
var underbar = new _index.Literal("underbar", "_");
var dash = new _index.Literal("dash", "-");
var character = new _index.OrValue("character", [letter, digit, new _index.OrValue("bar", [underbar, dash])]);
var characterSequence = new _index.RepeatValue("character-sequence", character);
var optionalCharacter = new _index.OptionalValue(characterSequence);
var name = new _index.AndValue("name", [letter, optionalCharacter]);
var _default = name;
exports.default = _default;
//# sourceMappingURL=name.js.map