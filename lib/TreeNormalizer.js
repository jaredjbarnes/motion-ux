"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Visitor = _interopRequireDefault(require("./Visitor.js"));

var _HexColor = _interopRequireDefault(require("./HexColor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var filterOutSpaces = function filterOutSpaces(child) {
  return child.name !== "optional-spaces";
};

var TreeNormalizer =
/*#__PURE__*/
function () {
  function TreeNormalizer() {
    _classCallCheck(this, TreeNormalizer);

    this.visitNode = this.visitNode.bind(this);
    this.visitor = new _Visitor.default(this.visitNode);
  }

  _createClass(TreeNormalizer, [{
    key: "visitNode",
    value: function visitNode(node) {
      if (Array.isArray(node.children)) {
        this.removeOptionalSpaces(node);
        this.replaceHex(node);
        this.removeUnnecessaryDividers(node);
        this.removeUnnecessarySpaces(node);
      }

      this.removeSpacesAroundDividers(node);
    }
  }, {
    key: "removeSpacesAroundDividers",
    value: function removeSpacesAroundDividers(node) {
      if (node.name === "divider") {
        node.value = node.value.trim() + " ";
      }
    }
  }, {
    key: "removeUnnecessaryDividers",
    value: function removeUnnecessaryDividers(node) {
      var children = node.children;

      while (children.length > 0 && children[children.length - 1].name === "divider") {
        children.pop();
      }
    }
  }, {
    key: "removeUnnecessarySpaces",
    value: function removeUnnecessarySpaces(node) {
      var children = node.children;

      while (node.name === "values" && children.length > 0 && children[children.length - 1].name === "spaces") {
        children.pop();
      }
    }
  }, {
    key: "removeOptionalSpaces",
    value: function removeOptionalSpaces(node) {
      node.children = node.children.filter(filterOutSpaces);
    }
  }, {
    key: "replaceHex",
    value: function replaceHex(node) {
      node.children = node.children.map(function (child) {
        if (child.name === "hex") {
          var hexColor = new _HexColor.default(child.value);
          return hexColor.toComplexNode();
        }

        return child;
      });
    }
  }, {
    key: "normalize",
    value: function normalize(node) {
      this.visitor.visitDown(node);
      return node;
    }
  }]);

  return TreeNormalizer;
}();

exports.default = TreeNormalizer;
//# sourceMappingURL=TreeNormalizer.js.map