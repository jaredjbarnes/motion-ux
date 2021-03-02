"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

var _AnimationConfigValidator = _interopRequireDefault(require("./AnimationConfigValidator.js"));

var _ParsedValue = _interopRequireDefault(require("./ParsedValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validator = new _AnimationConfigValidator.default();

var AnimationUtility =
/*#__PURE__*/
function () {
  function AnimationUtility() {
    _classCallCheck(this, AnimationUtility);

    this.config = null;
  }

  _createClass(AnimationUtility, [{
    key: "_setConfig",
    value: function _setConfig(config) {
      this.config = config;
      this.result = {};
      validator.setConfig(config);
    }
  }, {
    key: "normalizeConfig",
    value: function normalizeConfig(config) {
      this._setConfig(config);

      this._normalizeName();

      this._normalizeProperty();

      this._normalizeFrom();

      this._normalizeControls();

      this._normalizeTo();

      this._normalizeStartAt();

      this._normalizeEndAt();

      this._normalizeEasing();

      return this.result;
    }
  }, {
    key: "_normalizeName",
    value: function _normalizeName() {
      this.result.name = this.config.name;
    }
  }, {
    key: "_normalizeProperty",
    value: function _normalizeProperty() {
      this.result.property = this.config.property;
    }
  }, {
    key: "_normalizeFrom",
    value: function _normalizeFrom() {
      if (validator.hasValidFromAsString()) {
        this.result.from = new _ParsedValue.default(this.config.from);
      } else {
        validator.validateFromAsString();
      }
    }
  }, {
    key: "_normalizeControls",
    value: function _normalizeControls() {
      if (!Array.isArray(this.config.controls)) {
        this.config.controls = [];
      }

      if (validator.hasValidControlsAsStrings()) {
        this.result.controls = this.config.controls.map(function (control) {
          return (0, _ParsedValue.default)(control);
        });
      } else {
        validator.validateControlsAsStrings();
      }
    }
  }, {
    key: "_normalizeTo",
    value: function _normalizeTo() {
      if (validator.hasValidToAsString()) {
        this.result.to = new _ParsedValue.default(this.config.to);
      } else {
        validator.validateToAsString();
      }
    }
  }, {
    key: "_normalizeStartAt",
    value: function _normalizeStartAt() {
      if (validator.hasValidStartAt()) {
        this.result.startAt = this.config.startAt;
      } else {
        this.result.startAt = 0;
      }
    }
  }, {
    key: "_normalizeEndAt",
    value: function _normalizeEndAt() {
      if (validator.hasValidEndAt()) {
        this.result.endAt = this.config.endAt;
      } else {
        this.result.endAt = 1;
      }
    }
  }, {
    key: "_normalizeEasing",
    value: function _normalizeEasing() {
      if (!validator.hasValidEasingString() && !validator.hasValidEasingFunction()) {
        this.result.easing = _easings.default.linear;
      } else if (validator.hasValidEasingString()) {
        this.result.easing = _easings.default[this.config.easing] || _easings.default.linear;
      } else if (validator.hasValidEasingFunction()) {
        this.result.easing = this.config.easing;
      }
    }
  }]);

  return AnimationUtility;
}();

exports.default = AnimationUtility;
//# sourceMappingURL=AnimationUtility.js.map