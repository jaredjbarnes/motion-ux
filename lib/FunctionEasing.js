"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FunctionEasing =
/*#__PURE__*/
function () {
  function FunctionEasing(func) {
    _classCallCheck(this, FunctionEasing);

    this.func = func;
    this.validateFunction();
  }

  _createClass(FunctionEasing, [{
    key: "valueAt",
    value: function valueAt(percentage) {
      return this.func(percentage);
    }
  }, {
    key: "validateFunction",
    value: function validateFunction() {
      if (typeof this.func !== "function") {
        throw new Error("Function easing needs a function to work properly.");
      }
    }
  }]);

  return FunctionEasing;
}();

exports.default = FunctionEasing;
//# sourceMappingURL=FunctionEasing.js.map