"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnimationConfigValidator = _interopRequireDefault(require("./AnimationConfigValidator.js"));

var _AnimationUtility = _interopRequireDefault(require("./AnimationUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validator = new _AnimationConfigValidator.default();
var utility = new _AnimationUtility.default();

var Animation =
/*#__PURE__*/
function () {
  function Animation(config) {
    _classCallCheck(this, Animation);

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

  _createClass(Animation, null, [{
    key: "fromSimpleConfig",
    value: function fromSimpleConfig(config) {
      return new Animation(utility.normalizeConfig(config));
    }
  }]);

  return Animation;
}();

exports.default = Animation;
//# sourceMappingURL=Animation.js.map