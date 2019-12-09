"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _spaces = _interopRequireDefault(require("./spaces.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionalSpaces = new _clarityPatternParser.OptionalValue(_spaces.default);
var _default = optionalSpaces;
exports.default = _default;
//# sourceMappingURL=optionalSpaces.js.map