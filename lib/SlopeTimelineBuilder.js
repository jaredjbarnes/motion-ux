"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _easings = _interopRequireDefault(require("./easings.js"));

var _GraphOperator = _interopRequireDefault(require("./GraphOperator.js"));

var _Animation = _interopRequireDefault(require("./Animation.js"));

var _Timeline = _interopRequireDefault(require("./Timeline.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FORWARD = 1;
var BACKWARD = -1;

var SlopeTimelineBuilder =
/*#__PURE__*/
function () {
  function SlopeTimelineBuilder() {
    _classCallCheck(this, SlopeTimelineBuilder);

    this.timeline = null;
    this.slopeTimeline = null;
    this.direction = 0;
    this.newDuration = 0;
    this.duration = 0;
    this.offset = 0;
    this.delta = 0.0001;
    this.deltaStepValues = null;
    this.scaledValues = null;
    this.deltaValues = null;
    this.nowValues = null;
    this.diffValues = null;
    this.derivativeValues = null;
    this.scaledValues = null;
    this.toValues = null;
    this.graphOperator = new _GraphOperator.default();
  }

  _createClass(SlopeTimelineBuilder, [{
    key: "cloneValues",
    value: function cloneValues(values) {
      return Object.keys(values).reduce(function (clone, name) {
        clone[name] = Object.keys(values[name]).reduce(function (clone, property) {
          clone[property] = values[name][property].clone();
          return clone;
        }, {});
        return clone;
      }, {});
    }
  }, {
    key: "build",
    value: function build(timeline, offset, duration, newDuration, direction) {
      this.timeline = timeline;
      this.offset = offset;
      this.duration = duration;
      this.newDuration = newDuration;
      this.direction = direction;
      this.cacheValues();
      this.calculate();
      this.createSlopeTimeline();
      return this.slopeTimeline;
    }
  }, {
    key: "cacheValues",
    value: function cacheValues() {
      this.timeline.render(this.offset);
      this.nowValues = this.timeline.getCurrentValues();
      this.deltaStepValues = this.cloneValues(this.nowValues);
      this.scaleValues = this.cloneValues(this.nowValues);
      this.nowValues = this.cloneValues(this.timeline.getCurrentValues());
      this.diffValues = this.cloneValues(this.nowValues);
      this.derivativeValues = this.cloneValues(this.nowValues);
      this.scaledValues = this.cloneValues(this.nowValues);
      this.toValues = this.cloneValues(this.nowValues);
      this.cacheDeltaStepValues();
      this.cacheScaleValues();

      if (this.direction === FORWARD) {
        this.cacheDeltaValueForward();
      } else if (this.direction === BACKWARD) {
        this.cacheDeltaValueBackward();
      } else {
        this.cacheDeltaValueStopped();
      }
    }
  }, {
    key: "cacheDeltaStepValues",
    value: function cacheDeltaStepValues() {
      var _this = this;

      Object.keys(this.deltaStepValues).forEach(function (name) {
        Object.keys(_this.deltaStepValues[name]).forEach(function (property) {
          _this.graphOperator.assign(_this.deltaStepValues[name][property].graph, _this.delta);
        });
      });
    }
  }, {
    key: "cacheScaleValues",
    value: function cacheScaleValues() {
      var _this2 = this;

      var scale = this.newDuration / this.duration;
      Object.keys(this.scaleValues).forEach(function (name) {
        Object.keys(_this2.scaleValues[name]).forEach(function (property) {
          _this2.graphOperator.assign(_this2.scaleValues[name][property].graph, scale);
        });
      });
    }
  }, {
    key: "cacheDeltaValueForward",
    value: function cacheDeltaValueForward() {
      this.timeline.render(this.offset + this.delta);
      this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
    }
  }, {
    key: "cacheDeltaValueBackward",
    value: function cacheDeltaValueBackward() {
      this.timeline.render(this.offset - this.delta);
      this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
    }
  }, {
    key: "cacheDeltaValueStopped",
    value: function cacheDeltaValueStopped() {
      this.timeline.render(this.offset);
      this.deltaValues = this.cloneValues(this.timeline.getCurrentValues());
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var _this3 = this;

      Object.keys(this.nowValues).forEach(function (name) {
        Object.keys(_this3.nowValues[name]).forEach(function (property) {
          var now = _this3.nowValues[name][property].graph;
          var delta = _this3.deltaValues[name][property].graph;
          var diff = _this3.diffValues[name][property].graph;
          var deltaStep = _this3.deltaStepValues[name][property].graph;
          var derivative = _this3.derivativeValues[name][property].graph;
          var scale = _this3.scaleValues[name][property].graph;
          var scaled = _this3.scaledValues[name][property].graph;
          var to = _this3.toValues[name][property].graph;

          _this3.graphOperator.subtract([delta, now, diff]);

          _this3.graphOperator.divide([diff, deltaStep, derivative]);

          _this3.graphOperator.multiply([derivative, scale, scaled]);

          _this3.graphOperator.add([now, scaled, to]); // Lets update the ParsedValue.value.


          _this3.toValues[name][property].value = to.toString();
        });
      });
    }
  }, {
    key: "createSlopeTimeline",
    value: function createSlopeTimeline() {
      var _this4 = this;

      var animations = Object.keys(this.nowValues).map(function (name) {
        return Object.keys(_this4.nowValues[name]).map(function (property) {
          return new _Animation.default({
            name: name,
            property: property,
            from: _this4.nowValues[name][property],
            controls: [],
            to: _this4.toValues[name][property],
            startAt: 0,
            endAt: 1,
            easing: _easings.default.linear
          });
        });
      }).flat();
      this.slopeTimeline = new _Timeline.default(animations);
    }
  }]);

  return SlopeTimelineBuilder;
}();

exports.default = SlopeTimelineBuilder;
//# sourceMappingURL=SlopeTimelineBuilder.js.map