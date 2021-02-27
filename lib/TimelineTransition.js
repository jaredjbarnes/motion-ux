"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Timeline = _interopRequireDefault(require("./Timeline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TimelineTransition =
/*#__PURE__*/
function () {
  function TimelineTransition(player) {
    _classCallCheck(this, TimelineTransition);

    this.player = player;
  }

  _createClass(TimelineTransition, [{
    key: "transitionTo",
    value: function transitionTo(name) {}
  }]);

  return TimelineTransition;
}();

exports.default = TimelineTransition;
var timeline = new TimelineTransition(player); // Stateful motion.

var useTransition = makeStyledTransition({
  off: {
    animations: [{
      name: "divRef",
      property: "color",
      initialValue: "rgba(0,0,0,1)",
      // Default value is the value.
      value: "rgba(0,0,0,1)",
      easing: "easeIn",
      // Default linear
      startAt: 0.25,
      // Default 0
      endAt: 1 // Default 1

    }],
    initial: true,
    duration: 300,
    repeat: Infinity,
    repeatDirection: Player.repeatDirections.ALTERNATE
  },
  on: {
    animations: [{
      name: "divRef",
      property: "color",
      initialValue: "rgba(255,255,255,1)",
      // Default value is the value.
      value: "rgba(255,255,255,1)",
      controls: ["rgba(255,0,0,1)"],
      easing: "easeIn",
      startAt: 0.25,
      endAt: 1
    }],
    duration: 300
  }
});
//# sourceMappingURL=TimelineTransition.js.map