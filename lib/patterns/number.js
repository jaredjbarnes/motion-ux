"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

;
var zero = new _clarityPatternParser.Literal("zero", "0");
var bigE = new _clarityPatternParser.Literal("big-e", "E");
var littleE = new _clarityPatternParser.Literal("little-e", "e");
var plus = new _clarityPatternParser.Literal("plus", "+");
var minus = new _clarityPatternParser.Literal("minus", "-");
var period = new _clarityPatternParser.Literal("period", ".");
var digit = new _clarityPatternParser.AnyOfThese("digit", "0987654321");
var nonZeroDigit = new _clarityPatternParser.AnyOfThese("non-zero-digit", "987654321");
var digitSequence = new _clarityPatternParser.RepeatValue("digit-sequence", digit);
var plusOrMinus = new _clarityPatternParser.OrValue("plus-or-minus", [plus, minus]);
var optionalPlusOrMinus = new _clarityPatternParser.OptionalValue(plusOrMinus);
var validDigitSequence = new _clarityPatternParser.AndValue("non-zero-start", [optionalPlusOrMinus, nonZeroDigit, new _clarityPatternParser.OptionalValue(digitSequence)]);
var e = new _clarityPatternParser.OrValue("e", [bigE, littleE]);
var integer = new _clarityPatternParser.OrValue("integer", [zero, validDigitSequence]);
var fraction = new _clarityPatternParser.AndValue("fraction", [optionalPlusOrMinus, digitSequence, period, digitSequence]);
var float = new _clarityPatternParser.OrValue("float", [fraction, integer]);
var exponent = new _clarityPatternParser.AndValue("exponent", [float, e, optionalPlusOrMinus, digitSequence]);
var number = new _clarityPatternParser.OrValue("number", [exponent, fraction, integer]);
var _default = number;
exports.default = _default;
//# sourceMappingURL=number.js.map