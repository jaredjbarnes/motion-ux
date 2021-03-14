"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Animator = _interopRequireDefault(require("./Animator.js"));

var _Keyframe = _interopRequireDefault(require("./Keyframe.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sortAsc = function sortAsc(animatorA, animatorB) {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

var Animation =
/*#__PURE__*/
function () {
  function Animation(keyframes) {
    _classCallCheck(this, Animation);

    this.animators = new Map();
    this._time = 0;
    this.initialize(keyframes);
  }

  _createClass(Animation, [{
    key: "initialize",
    value: function initialize(keyframes) {
      this._currentValues = {};
      this.animators = keyframes.map(function (keyframe) {
        if (keyframe instanceof _Keyframe.default) {
          return keyframe;
        } else {
          return _Keyframe.default.fromSimpleConfig(keyframe);
        }
      }).map(function (keyframe) {
        return new _Animator.default(keyframe);
      });

      this._createCurrentValues(); // Sort by time.


      this.animators.sort(sortAsc);
    }
  }, {
    key: "_createCurrentValues",
    value: function _createCurrentValues() {
      this._currentValues = this.animators.reduce(function (results, animator) {
        var name = animator.keyframe.name;
        var property = animator.keyframe.property;
        var keyframe = results[name];

        if (keyframe == null) {
          keyframe = results[name] = {};
        }

        if (keyframe[property] == null) {
          keyframe[property] = animator.keyframe.result.clone();
        }

        return results;
      }, {});
    }
  }, {
    key: "_assignValue",
    value: function _assignValue(keyframe) {
      var currentValue = this._currentValues[keyframe.name][keyframe.property];
      currentValue.value = keyframe.result.value;
      currentValue.graph = keyframe.result.graph;
      currentValue.graphHash = keyframe.result.graphHash;
    }
  }, {
    key: "_saveCurrentValues",
    value: function _saveCurrentValues() {
      var visitedMap = new Map();
      var animators = this.animators;
      var length = animators.length; // Assign all values at least once.
      // This initials values beyond the time we are at.

      for (var x = 0; x < length; x++) {
        var keyframe = animators[x].keyframe;
        var key = "".concat(keyframe.name, "|").concat(keyframe.property);

        if (!visitedMap.has(key)) {
          visitedMap.set(key, true);

          this._assignValue(keyframe);
        }
      } // Assign if the value of the start at was before the time now.
      // Since we have it sorted, the most current will win.


      for (var _x = 0; _x < length; _x++) {
        var _keyframe = animators[_x].keyframe;

        if (_keyframe.startAt <= this._time) {
          this._assignValue(_keyframe);
        }
      }
    }
  }, {
    key: "update",
    value: function update(time) {
      this._time = time; // Update all keyframes

      this.animators.forEach(function (animator) {
        animator.update(time);
      });

      this._saveCurrentValues();

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
      var oldKeyframes = this.animators.map(function (a) {
        return a.keyframe;
      });
      var newKeyframes = timeline.animators.map(function (a) {
        return a.keyframe;
      });
      this.initialize([].concat(_toConsumableArray(oldKeyframes), _toConsumableArray(newKeyframes)));
      return this;
    }
  }]);

  return Animation;
}();

exports.default = Animation;
//# sourceMappingURL=Animation.js.map