"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ColorAnimator = _interopRequireDefault(require("./ColorAnimator.js"));

var _AnimationOptions = _interopRequireDefault(require("../AnimationOptions.js"));

var _UnitAnimator = _interopRequireDefault(require("./UnitAnimator.js"));

var _UnitArrayAnimator = _interopRequireDefault(require("./UnitArrayAnimator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var functionRegEx = /(.*?)\((.+?)\)/g;

var FunctionAnimator =
/*#__PURE__*/
function () {
  function FunctionAnimator(options) {
    _classCallCheck(this, FunctionAnimator);

    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.functions = null;
    this.unit = null;
    this.change = null;
    this.fromFunctions = null;
    this.toFunctions = null;
    this.parseFromFunctions();
    this.parseToFunctions();
    this.assertValues();
    this.assignAnimator();
  }

  _createClass(FunctionAnimator, [{
    key: "parseFromFunctions",
    value: function parseFromFunctions() {
      var result;
      this.functions = {};
      functionRegEx.lastIndex = 0;

      while (result = functionRegEx.exec(this.options.from)) {
        var functionName = result[1].trim();
        this.functions[functionName] = {
          fromValues: null,
          toValues: null,
          animators: null,
          values: []
        };
        this.functions[functionName].fromValues = result[2].split(",").map(function (value) {
          return value.trim();
        });
      }
    }
  }, {
    key: "parseToFunctions",
    value: function parseToFunctions() {
      var result;
      functionRegEx.lastIndex = 0;

      while (result = functionRegEx.exec(this.options.to)) {
        var functionName = result[1].trim();
        var functionData = this.functions[functionName];

        if (functionData == null) {
          throw new Error("Couldn't find corresponding from function with name: \"".concat(functionName, "\""));
        }

        functionData.toValues = result[2].split(",").map(function (value) {
          return value.trim();
        });
      }
    }
  }, {
    key: "assertValues",
    value: function assertValues() {
      var _this = this;

      Object.keys(this.functions).forEach(function (functionName) {
        var _this$functions$funct = _this.functions[functionName],
            toValues = _this$functions$funct.toValues,
            fromValues = _this$functions$funct.fromValues;

        if (toValues.length !== fromValues.length) {
          throw new Error("The 'from' arguments have a different length than the 'to' arguments.");
        }
      });
    }
  }, {
    key: "assignAnimator",
    value: function assignAnimator() {
      var _this2 = this;

      Object.keys(this.functions).forEach(function (functionName) {
        var functionData = _this2.functions[functionName];
        functionData.animators = functionData.fromValues.map(function (fromValue, index) {
          var toValue = functionData.toValues[index];

          if (fromValue == null || fromValue === "") {
            throw new Error("Invalid function arguments: ".concat(_this2.options.from, "."));
          }

          if (toValue == null || toValue === "") {
            throw new Error("Invalid function arguments: ".concat(_this2.options.to, "."));
          }

          var animationOptions = new _AnimationOptions.default({
            name: index.toString(),
            target: functionData.values,
            from: fromValue,
            to: toValue,
            startAt: _this2.options.startAt,
            endAt: _this2.options.endAt,
            easing: _this2.options.easing
          });

          if (_ColorAnimator.default.isMatch(animationOptions) && _ColorAnimator.default.isMatch(animationOptions)) {
            return new _ColorAnimator.default(animationOptions);
          }

          if (_UnitAnimator.default.isMatch(animationOptions) && _UnitAnimator.default.isMatch(animationOptions)) {
            return new _UnitAnimator.default(animationOptions);
          }

          if (_UnitArrayAnimator.default.isMatch(animationOptions) && _UnitArrayAnimator.default.isMatch(animationOptions)) {
            return new _UnitArrayAnimator.default(animationOptions);
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render(progress, duration) {
      var _this3 = this;

      var value = Object.keys(this.functions).map(function (functionName) {
        var functionData = _this3.functions[functionName];
        functionData.animators.map(function (animator, index) {
          animator.render(progress, duration);
        });
        return "".concat(functionName, "(").concat(functionData.values.join(", "), ")");
      }).join(" ");
      this.target[this.options.name] = value;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }], [{
    key: "isMatch",
    value: function isMatch(options) {
      functionRegEx.lastIndex = 0;
      var isMatchWithFrom = functionRegEx.test(options.from);
      functionRegEx.lastIndex = 0;
      var isMatchWithTo = functionRegEx.test(options.to);
      return isMatchWithFrom && isMatchWithTo;
    }
  }]);

  return FunctionAnimator;
}();

exports.default = FunctionAnimator;
//# sourceMappingURL=FunctionAnimator.js.map