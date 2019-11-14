"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var letter = new _clarityPatternParser.AnyOfThese("letter", "ABCDEFabcdef");
var number = new _clarityPatternParser.AnyOfThese("number", "0987654321");
var pound = new _clarityPatternParser.Literal("pound", "#");
var character = new _clarityPatternParser.OrValue("character", [letter, number]);
var sixHex = new _clarityPatternParser.AndValue("six-hex", [pound, character, character, character, character, character, character]);
var threeHex = new _clarityPatternParser.AndValue("six-hex", [pound, character, character, character]);
var hex = new _clarityPatternParser.OrValue("hex", [sixHex, threeHex]);
var _default = hex;
exports.default = _default;
//# sourceMappingURL=hex.js.map