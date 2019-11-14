"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unitRegEx = _interopRequireDefault(require("./unitRegEx.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UnitAnimator =
/*#__PURE__*/
function () {
  function UnitAnimator(options) {
    _classCallCheck(this, UnitAnimator);

    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.fromValue = null;
    this.toValue = null;
    this.unit = null;
    this.change = null;
    this.parseFromValue();
    this.parseToValue();
    this.calculateChange();
    this.parseUnit();
  }

  _createClass(UnitAnimator, [{
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
      var value = this.toString();
      this.target[this.options.name] = value;
    }
  }, {
    key: "parseFromValue",
    value: function parseFromValue() {
      if (this.fromValue == null) {
        _unitRegEx.default.lastIndex = 0;
        this.fromValue = new Number(_unitRegEx.default.exec(this.options.from)[1]).valueOf();
      }
    }
  }, {
    key: "parseToValue",
    value: function parseToValue() {
      if (this.toValue == null) {
        _unitRegEx.default.lastIndex = 0;
        this.toValue = new Number(_unitRegEx.default.exec(this.options.to)[1]).valueOf();
      }
    }
  }, {
    key: "parseUnit",
    value: function parseUnit() {
      if (this.unit == null) {
        _unitRegEx.default.lastIndex = 0;

        var toUnit = _unitRegEx.default.exec(this.options.to)[2];

        _unitRegEx.default.lastIndex = 0;

        var fromUnit = _unitRegEx.default.exec(this.options.from)[2];

        if (toUnit !== fromUnit) {
          throw new Error("The \"from\" and \"to\" values of \"".concat(this.options.name, "\" are not the same unit type."));
        }

        this.unit = toUnit || "";
      }
    }
  }, {
    key: "calculateChange",
    value: function calculateChange() {
      if (this.change == null) {
        this.change = this.toValue - this.fromValue;
      }
    }
  }, {
    key: "calculateProgress",
    value: function calculateProgress() {
      var progress = this.progress - this.options.startAt;
      var duration = this.options.endAt - this.options.startAt;
      var easingProgress = this.options.easing(progress, 0, 1, duration);
      this.value = this.fromValue + easingProgress * this.change;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.value).concat(this.unit);
    }
  }], [{
    key: "isMatch",
    value: function isMatch(options) {
      _unitRegEx.default.lastIndex = 0;
      return _unitRegEx.default.test(options.to) && _unitRegEx.default.test(options.from);
    }
  }]);

  return UnitAnimator;
}();

exports.default = UnitAnimator;
//# sourceMappingURL=UnitAnimator.js.map