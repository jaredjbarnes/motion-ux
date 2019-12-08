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

var TreeUtility =
/*#__PURE__*/
function () {
  function TreeUtility() {
    _classCallCheck(this, TreeUtility);
  }

  _createClass(TreeUtility, [{
    key: "areTreeStructuresEqual",
    value: function areTreeStructuresEqual(nodeA, nodeB) {
      var nodeASequence = [];
      var nodeBSequence = [];
      var nodeAVisitor = new _Visitor.default(function (node) {
        nodeASequence.push(node.name);
      });
      nodeAVisitor.visitDown(nodeA);
      var nodeBVisitor = new _Visitor.default(function (node) {
        nodeBSequence.push(node.name);
      });
      nodeBVisitor.visitDown(nodeB);
      return nodeASequence.join("|") === nodeBSequence.join("|");
    }
  }]);

  return TreeUtility;
}();

exports.default = TreeUtility;
//# sourceMappingURL=TreeUtility.js.map