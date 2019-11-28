"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberNodeAnimator = _interopRequireDefault(require("./NumberNodeAnimator.js"));

var _HexNodeAnimator = _interopRequireDefault(require("./HexNodeAnimator.js"));

var _UnitNodeAnimator = _interopRequireDefault(require("./UnitNodeAnimator.js"));

var _MethodNodeAnimator = _interopRequireDefault(require("./MethodNodeAnimator.js"));

var _NameNodeAnimator = _interopRequireDefault(require("./NameNodeAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValuesNodeAnimator =
/*#__PURE__*/
function () {
  function ValuesNodeAnimator(options) {
    _classCallCheck(this, ValuesNodeAnimator);

    this.options = options;
    this.nameToAnimatorMap = {
      number: _NumberNodeAnimator.default,
      unit: _UnitNodeAnimator.default,
      method: _MethodNodeAnimator.default,
      name: _NameNodeAnimator.default,
      hex: _HexNodeAnimator.default
    };
    this.normalizeNodes();
    this.createAnimators();
  }

  _createClass(ValuesNodeAnimator, [{
    key: "createAnimators",
    value: function createAnimators() {
      var _this = this;

      this.animators = this.options.controls[0].children.map(function (node, index) {
        var controls = _this.options.controls.map(function (node) {
          return node.children[index];
        });

        var options = _objectSpread({}, _this.options, {
          controls: controls
        });

        return new _this.nameToAnimatorMap[node.name](options);
      });
    }
  }, {
    key: "normalizeNodes",
    value: function normalizeNodes() {
      this.options.controls.forEach(function (node) {
        node.children = node.children.filter(function (node) {
          return node.name != "spaces";
        });
      });
    }
  }, {
    key: "render",
    value: function render(progress) {
      return this.animators.map(function (animator) {
        return animator.render(progress);
      }).join(" ");
    }
  }]);

  return ValuesNodeAnimator;
}();

exports.default = ValuesNodeAnimator;
//# sourceMappingURL=ValuesNodeAnimator.js.map