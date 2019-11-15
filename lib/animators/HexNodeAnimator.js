"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberAnimator = _interopRequireDefault(require("./NumberAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.values = null;
    this.duration = null;
    this.fromValue = null;
    this.toValue = null;
    this.change = null;
    this.parsefromValue();
    this.parsetoValue();
    this.createAnimators();
  }

  _createClass(HexNodeAnimator, [{
    key: "parsefromValue",
    value: function parsefromValue() {
      var fromValue = this.options.fromNode.value;

      if (fromValue.length === 4) {
        fromValue = fromValue + fromValue.substring(1);
      }

      this.fromValue = this.hexToRgb(fromValue);
    }
  }, {
    key: "parsetoValue",
    value: function parsetoValue() {
      var toValue = this.options.toNode.value;

      if (toValue.length === 4) {
        toValue = toValue + toValue.substring(1);
      }

      this.toValue = this.hexToRgb(toValue);
    }
  }, {
    key: "createAnimators",
    value: function createAnimators() {
      var _this = this;

      this.animators = this.fromValue.map(function (value, index) {
        return new _NumberAnimator.default({
          from: value,
          to: _this.toValue[index],
          startAt: _this.options.startAt,
          endAt: _this.options.endAt,
          easing: _this.options.easing
        });
      });
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      hexRegEx.lastIndex = 0;
      var result = hexRegEx.exec(hex);
      return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    }
  }, {
    key: "render",
    value: function render(progress) {
      var red = Math.round(this.animators[0].render(progress));
      var green = Math.round(this.animators[1].render(progress));
      var blue = Math.round(this.animators[2].render(progress));
      return "rgba(".concat(red, ",").concat(green, ",").concat(blue, ", 1)");
    }
  }]);

  return HexNodeAnimator;
}();

exports.default = HexNodeAnimator;
//# sourceMappingURL=HexNodeAnimator.js.map