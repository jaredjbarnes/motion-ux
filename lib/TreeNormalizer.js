"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Visitor = _interopRequireDefault(require("./Visitor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TreeNormalizer =
/*#__PURE__*/
function () {
  function TreeNormalizer() {
    _classCallCheck(this, TreeNormalizer);

    this.removeSpacesVisitor = new _Visitor.default(function (node) {
      if (Array.isArray(node.children)) {
        node.children = node.children.filter(function (child) {
          return child.name !== "spaces";
        });
      }
    });
  }

  _createClass(TreeNormalizer, [{
    key: "normalize",
    value: function normalize(node) {
      this.removeSpacesVisitor.visitDown(node);
    }
  }]);

  return TreeNormalizer;
}();

exports.default = TreeNormalizer;
//# sourceMappingURL=TreeNormalizer.js.map