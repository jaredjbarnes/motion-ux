"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Animator = _interopRequireDefault(require("./Animator.js"));

var _Animation = _interopRequireDefault(require("./Animation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sortAsc = function sortAsc(animatorA, animatorB) {
  return animatorA.animation.startAt - animatorB.animation.startAt;
};

var Timeline =
/*#__PURE__*/
function () {
  function Timeline(animations) {
    _classCallCheck(this, Timeline);

    this.animators = new Map();
    this._time = 0;
    this.initialize(animations);
  }

  _createClass(Timeline, [{
    key: "initialize",
    value: function initialize(animations) {
      this._currentValues = {};
      this.animators = animations.map(function (animation) {
        if (animation instanceof _Animation.default) {
          return animation;
        } else {
          return _Animation.default.fromSimpleConfig(animation);
        }
      }).map(function (animation) {
        return new _Animator.default(animation);
      });
      this.createCurrentValues(); // Sort by time.

      this.animators.sort(sortAsc);
    }
  }, {
    key: "createCurrentValues",
    value: function createCurrentValues() {
      this._currentValues = this.animators.reduce(function (results, animator) {
        var name = animator.animation.name;
        var property = animator.animation.property;
        var animation = results[name];

        if (animation == null) {
          animation = results[name] = {};
        }

        if (animation[property] == null) {
          animation[property] = animator.animation.result.clone();
        }

        return results;
      }, {});
    }
  }, {
    key: "assignValue",
    value: function assignValue(animation) {
      var currentValue = this._currentValues[animation.name][animation.property];
      currentValue.value = animation.result.value;
      currentValue.graph = animation.result.graph;
      currentValue.graphHash = animation.result.graphHash;
    }
  }, {
    key: "saveCurrentValues",
    value: function saveCurrentValues() {
      var visitedMap = new Map();
      var animators = this.animators;
      var length = animators.length; // Assign all values at least once.
      // This initials values beyond the time we are at.

      for (var x = 0; x < length; x++) {
        var animation = animators[x].animation;
        var key = "".concat(animation.name, "|").concat(animation.property);

        if (!visitedMap.has(key)) {
          visitedMap.set(key, true);
          this.assignValue(animation);
        }
      } // Assign if the value if the start at was before the time now.
      // Since we have it sorted, the most current will win.


      for (var _x = 0; _x < length; _x++) {
        var _animation = animators[_x].animation;

        if (_animation.startAt <= this._time) {
          this.assignValue(_animation);
        }
      }
    }
  }, {
    key: "render",
    value: function render(time) {
      this._time = time; // Render all animations

      this.animators.forEach(function (animator) {
        animator.render(time);
      });
      this.saveCurrentValues();
      return this;
    }
  }, {
    key: "getCurrentValues",
    value: function getCurrentValues() {
      return this._currentValues;
    }
  }, {
    key: "merge",
    value: function merge(timeline) {
      var oldAnimations = this.animators.map(function (a) {
        return a.animation;
      });
      var newAnimations = timeline.animators.map(function (a) {
        return a.animation;
      });
      this.initialize([].concat(_toConsumableArray(oldAnimations), _toConsumableArray(newAnimations)));
    }
  }]);

  return Timeline;
}();

exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map