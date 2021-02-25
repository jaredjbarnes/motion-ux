import Animator from "./Animator.js";
import Animation from "./Animation.js";

const sortDesc = (animatorA, animatorB) => {
  return animatorB.animation.startAt - animatorA.animation.startAt;
};

const sortAsc = (animatorA, animatorB) => {
  return animatorA.animation.startAt - animatorB.animation.startAt;
};

export default class Timeline {
  constructor(animations) {
    this._currentValues = {};
    this._initialValues = {};

    this.setAnimations(animations);
  }

  setAnimations(animations) {
    this._currentValues = {};
    this._initialValues = {};

    this.animators = animations.map(
      (animation) => new Animator(new Animation(animation))
    );

    this.createCurrentValues();
    this.createInitialValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  createCurrentValues() {
    this._currentValues = this.animators.reduce((results, animator) => {
      let animation = results[animator.animation.name];

      if (animation == null) {
        animation = results[animator.animation.name] = {};
      }

      if (animation[animator.animation.property] == null) {
        animation[animator.animation.property] = animator.animation.from;
      }

      return results;
    }, {});
  }

  createInitialValues() {
    this.animators.sort(sortDesc);

    this._initialValues = this.animators.reduce((results, animator) => {
      let animation = results[animator.animation.name];

      if (animation == null) {
        animation = results[animator.animation.name] = {};
      }

      animation[animator.animation.property] = animator.animation.from;

      return results;
    }, {});
  }

  applyInitialValues() {
    Object.keys(this._currentValues).forEach((animationName) => {
      Object.keys(this._currentValues[animationName]).forEach((property) => {
        const currentValues = this._currentValues[animationName];
        const initialValues = this._initialValues[animationName];

        currentValues[property] = initialValues[property];
      });
    });
  }

  render(time) {
    this.applyInitialValues();
    const currentValues = this._currentValues;

    // Animate the values that are less than the current time.
    this.animators
      .filter((animator) => {
        return animator.animation.startAt <= time;
      })
      .forEach((animator) => {
        const animation = currentValues[animator.animation.name];
        animation[animator.animation.property] = animator.render(time);
      });

    this.animators
      .filter((animator) => {
        const min = Math.max(animator.animation.startAt, time);
        const max = Math.min(animator.animation.endAt, time);

        return min <= max;
      })
      .forEach((animator) => {
        const animation = currentValues[animator.animation.name];
        animation[animator.animation.property] = animator.render(time);
      });

    return this;
  }

  getCurrentValues() {
    return this._currentValues;
  }
}
