"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TreeUtility = _interopRequireDefault(require("./TreeUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var emptyFn = function emptyFn() {};

var treeUtility = new _TreeUtility.default();

var GraphsVisitor =
/*#__PURE__*/
function () {
  function GraphsVisitor(callback) {
    _classCallCheck(this, GraphsVisitor);

    this.setCallback(callback);
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  _createClass(GraphsVisitor, [{
    key: "visitUp",
    value: function visitUp(graphs) {
      if (!Array.isArray(graphs)) {
        return;
      }

      var siblings = graphs.slice(1);
      var node = graphs[0];
      var areEqual = siblings.every(function (sibling) {
        return treeUtility.areTreeStructuresEqual(node, sibling);
      });

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }

      this.walkUp(graphs);
    }
  }, {
    key: "walkUp",
    value: function walkUp(graphs) {
      var _this = this;

      if (!Array.isArray(graphs)) {
        return;
      }

      var node = graphs[0];

      if (Array.isArray(node.children)) {
        var _loop = function _loop(index) {
          var childGraphs = graphs.map(function (node) {
            return node.children[index];
          });

          _this.walkUp(childGraphs);
        };

        for (var index = 0; index < node.children.length; index++) {
          _loop(index);
        }
      }

      this.callback(graphs);
    }
  }, {
    key: "visitDown",
    value: function visitDown(graphs) {
      if (!Array.isArray(graphs)) {
        return;
      }

      var siblings = graphs.slice(1);
      var node = graphs[0];
      var areEqual = siblings.every(function (sibling) {
        return treeUtility.areTreeStructuresEqual(node, sibling);
      });

      if (!areEqual) {
        throw new Error("The nodes structures need to be the same.");
      }

      this.walkDown(graphs);
    }
  }, {
    key: "walkDown",
    value: function walkDown(graphs) {
      var _this2 = this;

      if (!Array.isArray(graphs)) {
        return;
      }

      this.callback(graphs);
      var node = graphs[0];

      if (Array.isArray(node.children)) {
        var _loop2 = function _loop2(index) {
          var childGraphs = graphs.map(function (node) {
            return node.children[index];
          });

          _this2.walkDown(childGraphs);
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

  return GraphsVisitor;
}();

exports.default = GraphsVisitor;
//# sourceMappingURL=GraphsVisitor.js.map