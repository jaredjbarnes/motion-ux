import Animation from "./Animation.js";
import Keyframe from "./Keyframe.js";
import easings from "./easings.js";

export default class BlendedAnimation extends Animation {
  constructor(fromAnimation, toAnimation, easing) {
    const fromValues = fromAnimation.getCurrentValues();
    const toValues = toAnimation.getCurrentValues();

    const animations = Object.keys(fromValues)
      .map((name) => {
        const fromValue = fromValues[name];
        const toValue = toValues[name];

        return Object.keys(fromValue).map((property) => {
          const from = fromValue[property];
          const to = toValue[property];

          return new Keyframe({
            name,
            property,
            startAt: 0,
            endAt: 1,
            from,
            to,
            controls: [],
            easing: easing || easings.linear,
          });
        });
      })
      .flat();

    super(animations);

    this.fromAnimation = fromAnimation;
    this.toAnimation = toAnimation;
  }

  update(time) {
    this.fromAnimation.update(time);
    this.toAnimation.update(time);

    super.update(time);

  }
}
