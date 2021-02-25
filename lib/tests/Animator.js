"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _Animator = _interopRequireDefault(require("../Animator.js"));

var _Animation = _interopRequireDefault(require("../Animation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["Animator: "] = function () {
  var from = "rgba(0,0,0,0)";
  var to = "rgba(255,255,255,1)";
  var animation = new _Animation.default({
    name: "test",
    property: "color",
    startAt: 0,
    endAt: 1,
    from: from,
    to: to
  });
  var animator = new _Animator.default(animation);
  var value = animator.render(0.5);

  _assert.default.strictEqual("rgba(127.5, 127.5, 127.5, 0.5)", value);
};
//# sourceMappingURL=Animator.js.map