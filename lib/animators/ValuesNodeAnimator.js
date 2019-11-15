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

      var fromNode = this.options.fromNode;
      var toNode = this.options.toNode;
      this.animators = fromNode.children.map(function (from, index) {
        var to = toNode.children[index];
        var options = {
          startAt: _this.options.startAt,
          endAt: _this.options.endAt,
          fromNode: from,
          toNode: to,
          easing: _this.options.easing
        };
        return new _this.nameToAnimatorMap[from.name](options);
      });
    }
  }, {
    key: "normalizeNodes",
    value: function normalizeNodes() {
      this.options.fromNode.children = this.options.fromNode.children.filter(function (node) {
        return node.name != "spaces";
      });
      this.options.toNode.children = this.options.toNode.children.filter(function (node) {
        return node.name != "spaces";
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