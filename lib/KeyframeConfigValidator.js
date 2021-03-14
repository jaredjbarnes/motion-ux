"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParsedValue = _interopRequireDefault(require("./ParsedValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyframeConfigValidator =
/*#__PURE__*/
function () {
  function KeyframeConfigValidator() {
    _classCallCheck(this, KeyframeConfigValidator);

    this.config = null;
  }

  _createClass(KeyframeConfigValidator, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "isSimpleConfig",
    value: function isSimpleConfig() {
      return this.hasValidToAsString();
    }
  }, {
    key: "validateConfig",
    value: function validateConfig() {
      if (this.config == null) {
        throw new Error("Invalid Arguments: The \"config\" cannot be null or undefined.");
      }
    }
  }, {
    key: "validate",
    value: function validate(config) {
      this.setConfig(config);
      this.validateName();
      this.validateProperty();
      this.validateToAsParsedValue();
      this.validateControlsAsParsedValues();
      this.validateFromAsParsedValue();
      this.validateStartAt();
      this.validateEndAt();
      this.validateEasingFunction();
      this.validateNodes();
    }
  }, {
    key: "validateName",
    value: function validateName() {
      this.validateConfig();

      if (!this.hasValidName()) {
        throw new Error("Invalid Arguments: The \"name\" property needs to be an string.");
      }
    }
  }, {
    key: "hasValidName",
    value: function hasValidName() {
      return typeof this.config.name === "string";
    }
  }, {
    key: "validateProperty",
    value: function validateProperty() {
      this.validateConfig();

      if (!this.hasValidProperty()) {
        throw new Error("The \"property\" property needs to be a string.");
      }
    }
  }, {
    key: "hasValidProperty",
    value: function hasValidProperty() {
      return typeof this.config.property === "string";
    }
  }, {
    key: "validateToAsString",
    value: function validateToAsString() {
      this.validateConfig();

      if (!this.hasValidToAsString()) {
        throw new Error("The \"to\" property needs to be a string, but found ".concat(this.config.to, "."));
      }
    }
  }, {
    key: "hasValidToAsString",
    value: function hasValidToAsString() {
      return typeof this.config.to === "string";
    }
  }, {
    key: "validateToAsParsedValue",
    value: function validateToAsParsedValue() {
      this.validateConfig();

      if (!this.hasValidToAsParsedValue()) {
        throw new Error("The \"to\" property needs to be a ParsedValue, but found ".concat(this.config.to, "."));
      }
    }
  }, {
    key: "hasValidToAsParsedValue",
    value: function hasValidToAsParsedValue() {
      return this.config.to instanceof _ParsedValue.default;
    }
  }, {
    key: "validateFromAsString",
    value: function validateFromAsString() {
      this.validateConfig();

      if (typeof this.config.from !== "string") {
        throw new Error("The \"from\" property needs to be a string, but found ".concat(this.config.from, "."));
      }
    }
  }, {
    key: "hasValidFromAsString",
    value: function hasValidFromAsString() {
      return typeof this.config.from === "string";
    }
  }, {
    key: "validateFromAsParsedValue",
    value: function validateFromAsParsedValue() {
      this.validateConfig();

      if (!this.hasValidFromAsParsedValue()) {
        throw new Error("The \"from\" property needs to be a ParsedValue, but found ".concat(this.config.from, "."));
      }
    }
  }, {
    key: "hasValidFromAsParsedValue",
    value: function hasValidFromAsParsedValue() {
      return this.config.from instanceof _ParsedValue.default;
    }
  }, {
    key: "validateControlsAsStrings",
    value: function validateControlsAsStrings() {
      this.validateConfig();

      if (!this.hasValidControlsAsStrings()) {
        throw new Error("The \"controls\" property needs to be made of strings, but found ".concat(this.config.controls, "."));
      }
    }
  }, {
    key: "hasValidControlsAsStrings",
    value: function hasValidControlsAsStrings() {
      return Array.isArray(this.config.controls) && this.config.controls.every(function (control) {
        return typeof control === "string";
      });
    }
  }, {
    key: "validateControlsAsParsedValues",
    value: function validateControlsAsParsedValues() {
      this.validateConfig();

      if (!this.hasValidControlsAsParsedValues()) {
        throw new Error("The \"controls\" property needs to be made of ParsedValues, but found ".concat(this.config.controls, "."));
      }
    }
  }, {
    key: "hasValidControlsAsParsedValues",
    value: function hasValidControlsAsParsedValues() {
      return this.config.controls.every(function (control) {
        return control instanceof _ParsedValue.default;
      });
    }
  }, {
    key: "validateStartAt",
    value: function validateStartAt() {
      this.validateConfig();

      if (!this.hasValidStartAt) {
        throw new Error("The \"startAt\" property must be a number between 0 and 1.");
      }
    }
  }, {
    key: "hasValidStartAt",
    value: function hasValidStartAt() {
      return typeof this.config.startAt === "number" && this.config.startAt >= 0 && this.config.startAt <= 1;
    }
  }, {
    key: "validateEndAt",
    value: function validateEndAt() {
      this.validateConfig();

      if (!this.hasValidEndAt()) {
        throw new Error("The \"endAt\" property must be a number between 0 and 1.");
      }
    }
  }, {
    key: "hasValidEndAt",
    value: function hasValidEndAt() {
      return typeof this.config.endAt === "number" && this.config.endAt >= 0 && this.config.endAt <= 1;
    }
  }, {
    key: "validateEasingString",
    value: function validateEasingString() {
      this.validateConfig();

      if (!this.hasValidEasingString()) {
        throw new Error("The \"easing\" property must be a string.");
      }
    }
  }, {
    key: "hasValidEasingString",
    value: function hasValidEasingString() {
      return typeof this.config.easing === "string";
    }
  }, {
    key: "validateEasingFunction",
    value: function validateEasingFunction() {
      this.validateConfig();

      if (!this.hasValidEasingFunction()) {
        throw new Error("The \"easing\" property must be a function.");
      }
    }
  }, {
    key: "hasValidEasingFunction",
    value: function hasValidEasingFunction() {
      return typeof this.config.easing === "function";
    }
  }, {
    key: "validateNodes",
    value: function validateNodes() {
      this.validateConfig();
      var config = this.config;

      if (!this.areGraphStructuresEqual()) {
        throw new Error("Invalid Keyframe: The value types that are being animated do not match. From: ".concat(JSON.stringify(config.from.value), ", To:").concat(JSON.stringify(config.to.value), ", Controls: ").concat(JSON.stringify(config.controls.map(function (v) {
          return v.value;
        }))));
      }
    }
  }, {
    key: "areGraphStructuresEqual",
    value: function areGraphStructuresEqual() {
      var allStructuresAreEqual = true;
      var config = this.config;

      if (config.to.graphHash !== config.from.graphHash) {
        allStructuresAreEqual = false;
      }

      for (var x = 0; x < config.controls.length; x++) {
        var value = config.controls[x];

        if (value.graphHash !== config.from.graphHash) {
          allStructuresAreEqual = false;
          break;
        }
      }

      return allStructuresAreEqual;
    }
  }]);

  return KeyframeConfigValidator;
}();

exports.default = KeyframeConfigValidator;
//# sourceMappingURL=KeyframeConfigValidator.js.map