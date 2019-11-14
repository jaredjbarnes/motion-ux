"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rgbRegEx = _interopRequireDefault(require("./rgbRegEx.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RgbAnimator =
/*#__PURE__*/
function () {
  function RgbAnimator(options) {
    _classCallCheck(this, RgbAnimator);

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
    this.calculateProgress();
  }

  _createClass(RgbAnimator, [{
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
      this.target[this.options.name] = this.toRgb();
    }
  }, {
    key: "parsefromValue",
    value: function parsefromValue() {
      if (this.fromValue == null) {
        _rgbRegEx.default.lastIndex = 0;
        this.fromValue = _rgbRegEx.default.exec(this.options.from).slice(1).map(function (value) {
          return new Number(value).valueOf();
        });
      }
    }
  }, {
    key: "parsetoValue",
    value: function parsetoValue() {
      if (this.toValue == null) {
        _rgbRegEx.default.lastIndex = 0;
        this.toValue = _rgbRegEx.default.exec(this.options.to).slice(1).map(function (value) {
          return new Number(value).valueOf();
        });
      }
    }
  }, {
    key: "calculateChange",
    value: function calculateChange() {
      if (this.change == null) {
        var red = this.toValue[0] - this.fromValue[0];
        var green = this.toValue[1] - this.fromValue[1];
        var blue = this.toValue[2] - this.fromValue[2];
        this.change = [red, green, blue];
      }
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
    key: "toRgb",
    value: function toRgb() {
      var _this$values = _slicedToArray(this.values, 3),
          red = _this$values[0],
          green = _this$values[1],
          blue = _this$values[2];

      return "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
    }
  }], [{
    key: "isMatch",
    value: function isMatch(options) {
      _rgbRegEx.default.lastIndex = 0;
      return _rgbRegEx.default.test(options.from) && _rgbRegEx.default.test(options.to);
    }
  }]);

  return RgbAnimator;
}();

exports.default = RgbAnimator;
//# sourceMappingURL=RgbAnimator.js.map