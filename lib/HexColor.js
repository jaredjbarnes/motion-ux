"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clarityPatternParser = require("clarity-pattern-parser");

var _hex = _interopRequireDefault(require("./patterns/hex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

var HexColor =
/*#__PURE__*/
function () {
  function HexColor(hexString) {
    _classCallCheck(this, HexColor);

    this.setHex(hexString);
  }

  _createClass(HexColor, [{
    key: "setHex",
    value: function setHex(hexString) {
      this.hexString = hexString;
      this.normalizeHex();
      this.saveRgba();
    }
  }, {
    key: "saveRgba",
    value: function saveRgba() {
      var hex = this.hexString;
      hexRegEx.lastIndex = 0;
      var result = hexRegEx.exec(hex);
      this.rgba = result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1] : [0, 0, 0, 1];
    }
  }, {
    key: "toComplexNode",
    value: function toComplexNode() {
      var children = this.rgba.map(function (number) {
        var valuesNode = new _clarityPatternParser.CompositeNode("repeat-composite", "values");
        valuesNode.children.push(new _clarityPatternParser.ValueNode("regex-value", "number", number.toString()));
        return valuesNode;
      }).reduce(function (acc, valueNode) {
        acc.push(valueNode);
        acc.push(new _clarityPatternParser.ValueNode("regex-value", "divider", ", "));
        return acc;
      }, []);
      var node = new _clarityPatternParser.CompositeNode("and-composite", "method");
      var name = new _clarityPatternParser.ValueNode("regex-value", "name", "rgba");
      var openParen = new _clarityPatternParser.ValueNode("literal", "open-paren", "(");
      var args = new _clarityPatternParser.CompositeNode("repeat-composite", "arguments");
      var closeParen = new _clarityPatternParser.ValueNode("literal", "close-paren", ")");
      args.children = children;
      node.children.push(name, openParen, args, closeParen);
      return node;
    }
  }, {
    key: "toValueNode",
    value: function toValueNode() {
      return new _clarityPatternParser.ValueNode("hex", this.hexString);
    }
  }, {
    key: "toRgbString",
    value: function toRgbString() {
      return "rgb(".concat(this.rgba[0], ",").concat(this.rgba[1], ",").concat(this.rgba[2], ")");
    }
  }, {
    key: "normalizeHex",
    value: function normalizeHex() {
      if (this.hexString.length === 4) {
        this.hexString = this.hexString + this.hexString.substring(1);
      }
    }
  }, {
    key: "numberToHex",
    value: function numberToHex(number) {
      if (number > 255) {
        number = 255;
      }

      if (number < 0) {
        number = 0;
      }

      var hex = number.toString(16);

      if (hex.length < 2) {
        hex = "0" + hex;
      }

      return hex;
    }
  }, {
    key: "toHexString",
    value: function toHexString() {
      var rgbArray = this.rgba;
      var red = this.numberToHex(rgbArray[0]);
      var green = this.numberToHex(rgbArray[1]);
      var blue = this.numberToHex(rgbArray[2]);
      return "#".concat(red).concat(green).concat(blue);
    }
  }]);

  return HexColor;
}();

exports.default = HexColor;
//# sourceMappingURL=HexColor.js.map