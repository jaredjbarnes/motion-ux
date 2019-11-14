"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var letter = new _clarityPatternParser.AnyOfThese("letter", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
var digit = new _clarityPatternParser.AnyOfThese("digit", "0987654321");
var underbar = new _clarityPatternParser.Literal("underbar", "_");
var dash = new _clarityPatternParser.Literal("dash", "-");
var character = new _clarityPatternParser.OrValue("character", [letter, digit, new _clarityPatternParser.OrValue("bar", [underbar, dash])]);
var characterSequence = new _clarityPatternParser.RepeatValue("character-sequence", character);
var optionalCharacter = new _clarityPatternParser.OptionalValue(characterSequence);
var name = new _clarityPatternParser.AndValue("name", [letter, optionalCharacter]);
var _default = name;
exports.default = _default;
//# sourceMappingURL=name.js.map