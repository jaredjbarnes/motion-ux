"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberAnimator = _interopRequireDefault(require("./NumberAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

var HexNodeAnimator =
/*#__PURE__*/
function () {
  function HexNodeAnimator(options) {
    _classCallCheck(this, HexNodeAnimator);

    this.options = options;
    this.progress = null;
    this.duration = null;
    this.parseValues();
    this.createAnimators();
  }

  _createClass(HexNodeAnimator, [{
    key: "parseValues",
    value: function parseValues() {
      var _this = this;

      var values = this.options.controls.map(function (node) {
        return _this.hexToRgb(_this.convertToFullHex(node.value));
      }); // The nodes become quite the memory hogs, so we need to remove references.

      this.options.controls.length = 0;

      var _values$reduce = values.reduce(function (acc, rgb) {
        acc.reds.push(rgb[0]);
        acc.greens.push(rgb[1]);
        acc.blues.push(rgb[2]);
        return acc;
      }, {
        reds: [],
        greens: [],
        blues: []
      }),
          reds = _values$reduce.reds,
          greens = _values$reduce.greens,
          blues = _values$reduce.blues;

      this.reds = reds;
      this.greens = greens;
      this.blues = blues;
    }
  }, {
    key: "convertToFullHex",
    value: function convertToFullHex(value) {
      if (value.length === 4) {
        value = value + value.substring(1);
      }

      return value;
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      hexRegEx.lastIndex = 0;
      var result = hexRegEx.exec(hex);
      return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
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
    key: "createAnimators",
    value: function createAnimators() {
      this.redAnimator = new _NumberAnimator.default(_objectSpread({}, this.options, {
        controls: this.reds
      }));
      this.greenAnimator = new _NumberAnimator.default(_objectSpread({}, this.options, {
        controls: this.greens
      }));
      this.blueAnimator = new _NumberAnimator.default(_objectSpread({}, this.options, {
        controls: this.blues
      }));
    }
  }, {
    key: "render",
    value: function render(progress) {
      var red = this.numberToHex(Math.round(this.redAnimator.render(progress)));
      var green = this.numberToHex(Math.round(this.greenAnimator.render(progress)));
      var blue = this.numberToHex(Math.round(this.blueAnimator.render(progress)));
      return "#".concat(red).concat(green).concat(blue);
    }
  }]);

  return HexNodeAnimator;
}();

exports.default = HexNodeAnimator;
//# sourceMappingURL=HexNodeAnimator.js.map