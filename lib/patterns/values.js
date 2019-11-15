"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../node_modules/clarity-pattern-parser/src/index.js");

var _value = _interopRequireDefault(require("./value.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var space = new _index.Literal("space", " ");
var spaces = new _index.RepeatValue("spaces", space);
var values = new _index.RepeatComposite("values", _value.default, spaces);
var _default = values;
exports.default = _default;
//# sourceMappingURL=values.js.map