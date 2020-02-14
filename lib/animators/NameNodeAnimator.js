"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NameNodeAnimator =
/*#__PURE__*/
function () {
  function NameNodeAnimator(options) {
    _classCallCheck(this, NameNodeAnimator);

    this.options = options;
    this.values = this.options.controls.map(function (node) {
      return node.value;
    }); // The nodes become quite the memory hogs, so we need to remove references.

    this.options.controls.length = 0;
  }

  _createClass(NameNodeAnimator, [{
    key: "render",
    value: function render(progress) {
      if (progress > 0) {
        return this.values[this.values.length - 1];
      } else {
        return this.values[0];
      }
    }
  }]);

  return NameNodeAnimator;
}();

exports.default = NameNodeAnimator;
//# sourceMappingURL=NameNodeAnimator.js.map