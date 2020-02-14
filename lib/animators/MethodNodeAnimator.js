"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuesNodeAnimator = _interopRequireDefault(require("./ValuesNodeAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MethodNodeAnimator =
/*#__PURE__*/
function () {
  function MethodNodeAnimator(options) {
    _classCallCheck(this, MethodNodeAnimator);

    this.options = options;
    this.createArgs();
    this.createAnimators();
    this.methodName = this.getMethodName(); // The nodes become quite the memory hogs, so we need to remove references.

    this.options.controls.length = 0;
  }

  _createClass(MethodNodeAnimator, [{
    key: "createArgs",
    value: function createArgs() {
      this.args = this.options.controls.map(function (node) {
        return node.children.find(function (node) {
          return node.name === "arguments";
        }).children.filter(function (node) {
          return node.name === "values";
        });
      });
    }
  }, {
    key: "createAnimators",
    value: function createAnimators() {
      var _this = this;

      this.animators = this.args[0].map(function (_, index) {
        var controls = _this.args.map(function (arg) {
          return arg[index];
        });

        return new _ValuesNodeAnimator.default(_objectSpread({}, _this.options, {
          controls: controls
        }));
      });
    }
  }, {
    key: "getMethodName",
    value: function getMethodName() {
      return this.options.controls[0].children.find(function (node) {
        return node.name === "name";
      }).value;
    }
  }, {
    key: "render",
    value: function render(progress) {
      var methodName = this.methodName;
      var args = this.getArgs(progress);
      return "".concat(methodName, "(").concat(args, ")");
    }
  }, {
    key: "getArgs",
    value: function getArgs(progress) {
      return this.animators.map(function (animator) {
        return animator.render(progress);
      }).join(", ");
    }
  }]);

  return MethodNodeAnimator;
}();

exports.default = MethodNodeAnimator;
//# sourceMappingURL=MethodNodeAnimator.js.map