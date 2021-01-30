"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FunctionEasing2 = _interopRequireDefault(require("../FunctionEasing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EaseOutElastic =
/*#__PURE__*/
function (_FunctionEasing) {
  _inherits(EaseOutElastic, _FunctionEasing);

  function EaseOutElastic(tension) {
    var _this;

    _classCallCheck(this, EaseOutElastic);

    var func = function func(percentage) {
      var p = 0.3 / _this.tension;
      var s = p / 4;
      var a = 1;
      if (percentage <= 0) return 0;
      if (percentage >= 1) return 1;
      return a * Math.pow(2, -10 * percentage) * Math.sin((percentage - s) * (2 * Math.PI) / p) + 1;
    };

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EaseOutElastic).call(this, func));
    _this.tension = tension === "number" ? tension : 1;
    return _this;
  }

  return EaseOutElastic;
}(_FunctionEasing2.default);

exports.default = EaseOutElastic;
//# sourceMappingURL=EaseOutElastic.js.map