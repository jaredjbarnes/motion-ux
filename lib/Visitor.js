"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var emptyFn = function emptyFn() {};

var Visitor =
/*#__PURE__*/
function () {
  function Visitor(callback) {
    _classCallCheck(this, Visitor);

    if (typeof callback === "function") {
      this.callback = callback;
    } else {
      this.callback = emptyFn;
    }

    this.callback = callback;
    this.visitDown = this.visitDown.bind(this);
    this.visitUp = this.visitUp.bind(this);
  }

  _createClass(Visitor, [{
    key: "walkUp",
    value: function walkUp(node) {
      if (Array.isArray(node.children)) {
        node.children.forEach(this.visitUp);
      }

      this.callback(node);
    }
  }, {
    key: "visitUp",
    value: function visitUp(node) {
      this.walkUp(node);
    }
  }, {
    key: "walkDown",
    value: function walkDown(node) {
      this.callback(node);

      if (Array.isArray(node.children)) {
        node.children.forEach(this.visitDown);
      }
    }
  }, {
    key: "visitDown",
    value: function visitDown(node) {
      this.walkDown(node);
    }
  }]);

  return Visitor;
}();

exports.default = Visitor;
//# sourceMappingURL=Visitor.js.map