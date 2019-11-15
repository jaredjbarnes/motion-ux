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

var UnitNodeAnimator =
/*#__PURE__*/
function () {
  function UnitNodeAnimator(options) {
    _classCallCheck(this, UnitNodeAnimator);

    this.options = options;
    this.animator = new _NumberAnimator.default(_objectSpread({}, options, {
      from: parseInt(options.fromNode.children[0].value, 10),
      to: parseInt(options.toNode.children[0].value, 10)
    }));
  }

  _createClass(UnitNodeAnimator, [{
    key: "render",
    value: function render(progress) {
      var value = this.animator.render(progress);
      var unit = this.options.fromNode.children[1].value;
      return "".concat(value).concat(unit);
    }
  }]);

  return UnitNodeAnimator;
}();

exports.default = UnitNodeAnimator;
//# sourceMappingURL=UnitNodeAnimator.js.map