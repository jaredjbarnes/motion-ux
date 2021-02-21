"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TreeUtility = _interopRequireDefault(require("./TreeUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var emptyFn = function emptyFn() {};

var treeUtility = new _TreeUtility.default();

var SideBySideVisitor =
/*#__PURE__*/
function () {
  function SideBySideVisitor(callback) {
    _classCallCheck(this, SideBySideVisitor);

    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  _createClass(SideBySideVisitor, [{
    key: "visitUp",
    value: function visitUp(nodes) {
      if (!Array.isArray(nodes)) {
        return;
      }

      var siblings = nodes.slice(1);
      var node = nodes[0];
      var areEqual = siblings.every(function (sibling) {
        return treeUtility.areTreeStructuresEqual(node, sibling);
      });

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }

      this.walkUp(nodes);
    }
  }, {
    key: "walkUp",
    value: function walkUp(nodes) {
      var _this = this;

      if (!Array.isArray(nodes)) {
        return;
      }

      var node = nodes[0];

      if (Array.isArray(node.children)) {
        var _loop = function _loop(index) {
          var childNodes = nodes.map(function (node) {
            return node.children[index];
          });

          _this.walkUp(childNodes);
        };

        for (var index = 0; index < node.children.length; index++) {
          _loop(index);
        }
      }

      this.callback.apply(this, _toConsumableArray(nodes));
    }
  }, {
    key: "visitDown",
    value: function visitDown(nodes) {
      if (!Array.isArray(nodes)) {
        return;
      }

      var siblings = nodes.slice(1);
      var node = nodes[0];
      var areEqual = siblings.every(function (sibling) {
        return treeUtility.areTreeStructuresEqual(node, sibling);
      });

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }

      this.walkDown(nodes);
    }
  }, {
    key: "walkDown",
    value: function walkDown(nodes) {
      var _this2 = this;

      if (!Array.isArray(nodes)) {
        return;
      }

      this.callback.apply(this, _toConsumableArray(nodes));
      var node = nodes[0];

      if (Array.isArray(node.children)) {
        var _loop2 = function _loop2(index) {
          var childNodes = nodes.map(function (node) {
            return node.children[index];
          });

          _this2.walkDown(childNodes);
        };

        for (var index = 0; index < node.children.length; index++) {
          _loop2(index);
        }
      }
    }
  }, {
    key: "setCallback",
    value: function setCallback(callback) {
      if (typeof callback === "function") {
        this.callback = callback;
      } else {
        this.callback = emptyFn;
      }

      this.callback = callback;
    }
  }]);

  return SideBySideVisitor;
}();

exports.default = SideBySideVisitor;
//# sourceMappingURL=SideBySideVisitor.js.map