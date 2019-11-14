"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rgbRegEx = _interopRequireDefault(require("./rgbRegEx.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

var HexAnimator =
/*#__PURE__*/
function () {
  function HexAnimator(options) {
    _classCallCheck(this, HexAnimator);

    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.values = null;
    this.duration = null;
    this.fromValue = null;
    this.toValue = null;
    this.change = null;
    this.parsefromValue();
    this.parsetoValue();
    this.calculateChange();
  }

  _createClass(HexAnimator, [{
    key: "parsefromValue",
    value: function parsefromValue() {
      if (this.fromValue == null) {
        _rgbRegEx.default.lastIndex = 0;
        this.fromValue = this.hexToRgb(this.options.from);
      }
    }
  }, {
    key: "parsetoValue",
    value: function parsetoValue() {
      if (this.toValue == null) {
        _rgbRegEx.default.lastIndex = 0;
        this.toValue = this.hexToRgb(this.options.to);
      }
    }
  }, {
    key: "calculateChange",
    value: function calculateChange() {
      if (this.changes == null) {
        var red = this.toValue[0] - this.fromValue[0];
        var green = this.toValue[1] - this.fromValue[1];
        var blue = this.toValue[2] - this.fromValue[2];
        this.change = [red, green, blue];
      }
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
    value: function render(progress, duration) {
      this.progress = progress;
      this.duration = duration;

      if (progress <= this.options.startAt) {
        this.target[this.options.name] = this.options.from;
        return;
      }

      if (progress >= this.options.endAt) {
        this.target[this.options.name] = this.options.to;
        return;
      }

      this.calculateProgress();
      this.target[this.options.name] = this.toHex();
    }
  }, {
    key: "calculateProgress",
    value: function calculateProgress() {
      var progress = this.progress - this.options.startAt;
      var duration = this.options.endAt - this.options.startAt;
      var progressWithEasing = this.options.easing(progress, 0, 1, duration);
      var red = this.fromValue[0] + this.change[0] * progressWithEasing;
      var green = this.fromValue[1] + this.change[1] * progressWithEasing;
      var blue = this.fromValue[2] + this.change[2] * progressWithEasing;
      red = Math.max(0, red);
      red = Math.min(255, red);
      green = Math.max(0, green);
      green = Math.min(255, green);
      blue = Math.max(0, blue);
      blue = Math.min(255, blue);
      this.values = [red, green, blue];
    }
  }, {
    key: "toHex",
    value: function toHex() {
      var values = this.values;
      return "rgba(".concat(values[0], ",").concat(values[1], ",").concat(values[2], ")");
    }
  }], [{
    key: "isMatch",
    value: function isMatch(options) {
      hexRegEx.lastIndex = 0;
      return hexRegEx.test(options.from) && hexRegEx.test(options.to);
    }
  }]);

  return HexAnimator;
}();

exports.default = HexAnimator;
//# sourceMappingURL=HexAnimator.js.map