"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GraphOperations = _interopRequireDefault(require("./GraphOperations.js"));

var _GraphsVisitor = _interopRequireDefault(require("./GraphsVisitor.js"));

var _Visitor = _interopRequireDefault(require("./Visitor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GraphOperator =
/*#__PURE__*/
function () {
  function GraphOperator() {
    _classCallCheck(this, GraphOperator);

    this.graphsVisitor = new _GraphsVisitor.default();
    this.visitor = new _Visitor.default();
    this.graphOperations = new _GraphOperations.default();
  }

  _createClass(GraphOperator, [{
    key: "assign",
    value: function assign(graph, number) {
      this.visitor.setCallback(function (node) {
        if (node.name === "number") {
          node.value = number;
        }
      });
      this.visitor.visitDown(graph);
    }
  }, {
    key: "add",
    value: function add(graphs) {
      this.graphsVisitor.setCallback(this.graphOperations.add);
      this.graphsVisitor.visitDown(graphs);
    }
  }, {
    key: "subtract",
    value: function subtract(graphs) {
      this.graphsVisitor.setCallback(this.graphOperations.subtract);
      this.graphsVisitor.visitDown(graphs);
    }
  }, {
    key: "multiply",
    value: function multiply(graphs) {
      this.graphsVisitor.setCallback(this.graphOperations.multiply);
      this.graphsVisitor.visitDown(graphs);
    }
  }, {
    key: "divide",
    value: function divide(graphs) {
      this.graphsVisitor.setCallback(this.graphOperations.divide);
      this.graphsVisitor.visitDown(graphs);
    }
  }]);

  return GraphOperator;
}();

exports.default = GraphOperator;
//# sourceMappingURL=GraphOperator.js.map