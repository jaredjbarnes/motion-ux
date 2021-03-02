"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GraphOperations =
/*#__PURE__*/
function () {
  function GraphOperations() {
    _classCallCheck(this, GraphOperations);

    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
  }

  _createClass(GraphOperations, [{
    key: "add",
    value: function add(nodes) {
      if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
        var leftNode = nodes[0];
        var rightNode = nodes[1];
        var resultNode = nodes[2];
        resultNode.value = leftNode.value + rightNode.value;
      }
    }
  }, {
    key: "subtract",
    value: function subtract(nodes) {
      if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
        var leftNode = nodes[0];
        var rightNode = nodes[1];
        var resultNode = nodes[2];
        resultNode.value = leftNode.value - rightNode.value;
      }
    }
  }, {
    key: "multiply",
    value: function multiply(nodes) {
      if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
        var leftNode = nodes[0];
        var rightNode = nodes[1];
        var resultNode = nodes[2];
        resultNode.value = leftNode.value * rightNode.value;
      }
    }
  }, {
    key: "divide",
    value: function divide(nodes) {
      if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
        var leftNode = nodes[0];
        var rightNode = nodes[1];
        var resultNode = nodes[2];
        resultNode.value = leftNode.value / rightNode.value;
      }
    }
  }, {
    key: "isNumberNode",
    value: function isNumberNode(nodes) {
      return nodes[0].name === "number";
    }
  }, {
    key: "canOperate",
    value: function canOperate(nodes) {
      return nodes.length === 3;
    }
  }]);

  return GraphOperations;
}();

exports.default = GraphOperations;
//# sourceMappingURL=GraphOperations.js.map