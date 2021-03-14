"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KeyframeConfigValidator = _interopRequireDefault(require("./KeyframeConfigValidator.js"));

var _KeyframeUtility = _interopRequireDefault(require("./KeyframeUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validator = new _KeyframeConfigValidator.default();
var utility = new _KeyframeUtility.default();

var Keyframe =
/*#__PURE__*/
function () {
  function Keyframe(config) {
    _classCallCheck(this, Keyframe);

    validator.setConfig(config);
    validator.validate(config);
    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.result = config.from.clone();
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = config.controls;
    this.easing = config.easing;
  }

  _createClass(Keyframe, null, [{
    key: "fromSimpleConfig",
    value: function fromSimpleConfig(config) {
      return new Keyframe(utility.normalizeConfig(config));
    }
  }]);

  return Keyframe;
}();

exports.default = Keyframe;
//# sourceMappingURL=Keyframe.js.map