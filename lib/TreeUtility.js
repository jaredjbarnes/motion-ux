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

var visitor = new _Visitor.default();

function convertNumberNode(node) {
  if (node.name === "number") {
    node.value = Number(node.value);
  }
} // Hashing function, this may not be the best. So this may need to be replaced.
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript


function hash(str) {
  var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;

  for (var i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

var TreeUtility =
/*#__PURE__*/
function () {
  function TreeUtility() {
    _classCallCheck(this, TreeUtility);
  }

  _createClass(TreeUtility, [{
    key: "areTreeStructuresEqual",
    value: function areTreeStructuresEqual(nodeA, nodeB) {
      var nodeASequence = this.sequence(nodeA);
      var nodeBSequence = this.sequence(nodeB);
      return nodeASequence === nodeBSequence;
    }
  }, {
    key: "sequence",
    value: function sequence(node) {
      var sequence = [];
      visitor.setCallback(function (node) {
        sequence.push(node.name);
      });
      visitor.visitDown(node);
      return sequence.join("|");
    }
  }, {
    key: "sequenceHash",
    value: function sequenceHash(node) {
      return hash(this.sequence(node));
    }
  }, {
    key: "convertNumberNodesToNumberValues",
    value: function convertNumberNodesToNumberValues(node) {
      visitor.setCallback(convertNumberNode);
      visitor.visitDown(node);
    }
  }]);

  return TreeUtility;
}();

exports.default = TreeUtility;
//# sourceMappingURL=TreeUtility.js.map