"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Animator = _interopRequireDefault(require("./Animator.js"));

var _Animation = _interopRequireDefault(require("./Animation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sortDesc = function sortDesc(animatorA, animatorB) {
  return animatorB.animation.startAt - animatorA.animation.startAt;
};

var sortAsc = function sortAsc(animatorA, animatorB) {
  return animatorA.animation.startAt - animatorB.animation.startAt;
};

var Timeline =
/*#__PURE__*/
function () {
  function Timeline(animations) {
    _classCallCheck(this, Timeline);

    this._currentValues = {};
    this._initialValues = {};
    this.animators = animations.map(function (animation) {
      return new _Animator.default(new _Animation.default(animation));
    });
    this.createCurrentValues();
    this.createInitialValues(); // Sort by time.

    this.animators.sort(sortAsc);
  }

  _createClass(Timeline, [{
    key: "createCurrentValues",
    value: function createCurrentValues() {
      this._currentValues = this.animators.reduce(function (results, animator) {
        var animation = results[animator.animation.name];

        if (animation == null) {
          animation = results[animator.animation.name] = {};
        }

        if (animation[animator.animation.property] == null) {
          animation[animator.animation.property] = animator.animation.from;
        }

        return results;
      }, {});
    }
  }, {
    key: "createInitialValues",
    value: function createInitialValues() {
      this.animators.sort(sortDesc);
      this._initialValues = this.animators.reduce(function (results, animator) {
        var animation = results[animator.animation.name];

        if (animation == null) {
          animation = results[animator.animation.name] = {};
        }

        animation[animator.animation.property] = animator.animation.from;
        return results;
      }, {});
    }
  }, {
    key: "applyInitialValues",
    value: function applyInitialValues() {
      var _this = this;

      Object.keys(this._currentValues).forEach(function (animationName) {
        Object.keys(_this._currentValues[animationName]).forEach(function (property) {
          var currentValues = _this._currentValues[animationName];
          var initialValues = _this._initialValues[animationName];
          currentValues[property] = initialValues[property];
        });
      });
    }
  }, {
    key: "render",
    value: function render(time) {
      this.applyInitialValues();
      var currentValues = this._currentValues; // Animate the values that are less than the current time.

      this.animators.filter(function (animator) {
        return animator.animation.startAt <= time;
      }).forEach(function (animator) {
        var animation = currentValues[animator.animation.name];
        animation[animator.animation.property] = animator.render(time);
      });
      this.animators.filter(function (animator) {
        var min = Math.max(animator.animation.startAt, time);
        var max = Math.min(animator.animation.endAt, time);
        return min <= max;
      }).forEach(function (animator) {
        var animation = currentValues[animator.animation.name];
        animation[animator.animation.property] = animator.render(time);
      });
      return this;
    }
  }, {
    key: "getCurrentValues",
    value: function getCurrentValues() {
      return this._currentValues;
    }
  }]);

  return Timeline;
}();

exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map