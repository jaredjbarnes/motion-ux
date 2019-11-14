"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnimationOptions = _interopRequireDefault(require("../AnimationOptions.js"));

var _UnitAnimator = _interopRequireDefault(require("./UnitAnimator.js"));

var _unitRegEx = _interopRequireDefault(require("./unitRegEx.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UnitArrayAnimator =
/*#__PURE__*/
function () {
  function UnitArrayAnimator(options) {
    _classCallCheck(this, UnitArrayAnimator);

    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.fromArray = null;
    this.toArray = null;
    this.animationOptions = null;
    this.unitAnimators = null;
    this.parseFromArrays();
    this.parseToArrays();
    this.assertArraysAreEqualLength();
    this.createUnitAnimators();
  }

  _createClass(UnitArrayAnimator, [{
    key: "render",
    value: function render(progress, duration) {
      this.progress = progress;
      this.duration = duration;
      this.target[this.options.name] = this.toString();
    }
  }, {
    key: "parseFromArrays",
    value: function parseFromArrays() {
      if (this.fromArray == null) {
        this.fromArray = this.options.from.trim().split(" ");
      }
    }
  }, {
    key: "parseToArrays",
    value: function parseToArrays() {
      if (this.toArray == null) {
        this.toArray = this.options.to.trim().split(" ");
      }
    }
  }, {
    key: "assertArraysAreEqualLength",
    value: function assertArraysAreEqualLength() {
      if (this.toArray.length !== this.fromArray.length) {
        throw new Error("The unit arrays with in \"".concat(this.options.name, "\" aren't equal length."));
      }
    }
  }, {
    key: "createUnitAnimators",
    value: function createUnitAnimators() {
      var _this = this;

      if (this.unitAnimators == null) {
        this.unitAnimators = this.fromArray.map(function (from, index) {
          return new _UnitAnimator.default(new _AnimationOptions.default({
            target: {},
            name: _this.options.name,
            from: from,
            to: _this.toArray[index],
            startAt: _this.options.startAt,
            endAt: _this.options.endAt
          }));
        });
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this2 = this;

      var value = this.unitAnimators.map(function (animator) {
        animator.render(_this2.progress, _this2.duration);
        return animator.target[animator.options.name];
      }).join(" ");
      return value;
    }
  }], [{
    key: "isMatch",
    value: function isMatch(_ref) {
      var from = _ref.from,
          to = _ref.to;
      return typeof from === "string" && typeof to === "string" && from.trim().split(" ").every(function (unit) {
        _unitRegEx.default.lastIndex = 0;

        _unitRegEx.default.test(unit);
      }) && to.trim().split(" ").every(function (unit) {
        _unitRegEx.default.lastIndex = 0;

        _unitRegEx.default.test(unit);
      });
    }
  }]);

  return UnitArrayAnimator;
}();

exports.default = UnitArrayAnimator;
//# sourceMappingURL=UnitArrayAnimator.js.map