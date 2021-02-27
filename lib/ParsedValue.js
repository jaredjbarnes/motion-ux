"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cssValue = _interopRequireDefault(require("./patterns/cssValue.js"));

var _TreeNormalizer = _interopRequireDefault(require("./TreeNormalizer.js"));

var _TreeUtility = _interopRequireDefault(require("./TreeUtility.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var treeUtility = new _TreeUtility.default();
var treeNormalizer = new _TreeNormalizer.default();

var ParsedValue =
/*#__PURE__*/
function () {
  function ParsedValue(value, graph, graphHash) {
    _classCallCheck(this, ParsedValue);

    this.value = value;

    if (typeof graph === "undefined") {
      this.graph = treeNormalizer.normalize(_cssValue.default.parse(new _clarityPatternParser.Cursor(value)));
      treeUtility.convertNumberNodesToNumberValues(this.graph);
    } else {
      this.graph = graph;
    }

    if (typeof graphHash === "undefined") {
      this.graphHash = treeUtility.sequenceHash(this.graph);
    } else {
      this.graphHash = graphHash;
    }
  }

  _createClass(ParsedValue, [{
    key: "clone",
    value: function clone() {
      return new ParsedValue(this.value, this.graph.clone(), this.graphHash);
    }
  }]);

  return ParsedValue;
}();

exports.default = ParsedValue;
//# sourceMappingURL=ParsedValue.js.map