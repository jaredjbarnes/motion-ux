"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ValuesNodeAnimator = _interopRequireDefault(require("./animators/ValuesNodeAnimator.js"));

var _values = _interopRequireDefault(require("./patterns/values.js"));

var _clarityPatternParser = require("clarity-pattern-parser");

var _TimelineOption = _interopRequireDefault(require("./TimelineOption.js"));

var _TreeNormalizer = _interopRequireDefault(require("./TreeNormalizer.js"));

var _TreeUtility = _interopRequireDefault(require("./TreeUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var treeUtility = new _TreeUtility.default();

var AnimatorCreator =
/*#__PURE__*/
function () {
  function AnimatorCreator(animationOptions) {
    _classCallCheck(this, AnimatorCreator);

    this.animationOptions = animationOptions;
    this._treeNormalizer = new _TreeNormalizer.default();

    this._assertAnimationOptions();

    this._convertAnimationsToTimelineOptions();

    this._sortTimelineOptions();

    this._createAnimators();
  }

  _createClass(AnimatorCreator, [{
    key: "_assertAnimationOptions",
    value: function _assertAnimationOptions() {
      if (!Array.isArray(this.animationOptions)) {
        throw new Error("Expected animations to be an array.");
      }
    }
  }, {
    key: "_convertAnimationsToTimelineOptions",
    value: function _convertAnimationsToTimelineOptions() {
      this.timelineOptions = this.animationOptions.map(function (animationOption) {
        return new _TimelineOption.default(animationOption);
      });
    }
  }, {
    key: "_sortTimelineOptions",
    value: function _sortTimelineOptions() {
      this.timelineOptions.sort(function (a, b) {
        return a.startAt - b.startAt;
      });
    }
  }, {
    key: "_createAnimators",
    value: function _createAnimators() {
      var _this = this;

      this.animators = this.timelineOptions.map(function (options) {
        var points = [options.from].concat(_toConsumableArray(options.controls), [options.to]);
        var controls;
        controls = points.map(function (point) {
          var cursor = new _clarityPatternParser.Cursor(point);

          var node = _values.default.parse(cursor);

          _this._treeNormalizer.normalize(node);

          if (cursor.hasUnresolvedError()) {
            throw new Error("Parse Error: could not parse css ".concat(options.controls));
          }

          return node;
        });
        var fromNode = controls[0];
        var allStructuresAreEqual = controls.every(function (node) {
          return treeUtility.areTreeStructuresEqual(fromNode, node);
        });

        if (!allStructuresAreEqual) {
          throw new Error("Invalid Animation: The value types that are being animated do not match. From: ".concat(JSON.stringify(options.from), ", To:").concat(JSON.stringify(options.to), ", Controls: ").concat(JSON.stringify(options.controls)));
        }

        return new _ValuesNodeAnimator.default(_objectSpread({}, options, {
          controls: controls
        }));
      });
    }
  }, {
    key: "getAnimators",
    value: function getAnimators() {
      return this.animators;
    }
  }]);

  return AnimatorCreator;
}();

exports.default = AnimatorCreator;
//# sourceMappingURL=AnimatorCreator.js.map