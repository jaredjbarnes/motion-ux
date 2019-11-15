"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../node_modules/clarity-pattern-parser/src/index.js");

var _number = _interopRequireDefault(require("./number.js"));

var _letter = _interopRequireDefault(require("./letter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var percent = new _index.Literal("%", "%");
var character = new _index.OrValue("character", [_letter.default, percent]);
var unitType = new _index.RepeatValue("unit-type", character);
var unit = new _index.AndComposite("unit", [_number.default, unitType]);
var _default = unit;
exports.default = _default;
//# sourceMappingURL=unit.js.map