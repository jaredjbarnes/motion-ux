"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("https://unpkg.com/browse/clarity-pattern-parser@1.0.1/src/index.js");

var letter = new _index.AnyOfThese("letter", "ABCDEFabcdef");
var number = new _index.AnyOfThese("number", "0987654321");
var pound = new _index.Literal("pound", "#");
var character = new _index.OrValue("character", [letter, number]);
var sixHex = new _index.AndValue("six-hex", [pound, character, character, character, character, character, character]);
var threeHex = new _index.AndValue("six-hex", [pound, character, character, character]);
var hex = new _index.OrValue("hex", [sixHex, threeHex]);
var _default = hex;
exports.default = _default;
//# sourceMappingURL=hex.js.map