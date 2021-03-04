import Animator from "./Animator.js";
import Animation from "./Animation.js";

const sortAsc = (animatorA, animatorB) => {
  return animatorA.animation.startAt - animatorB.animation.startAt;
};

export default class Timeline {
  constructor(animations) {
    this.animators = new Map();
    this._time = 0;

    this.initialize(animations);
  }

  initialize(animations) {
    this._currentValues = {};

    this.animators = animations
      .map((animation) => {
        if (animation instanceof Animation) {
          return animation;
        } else {
          return Animation.fromSimpleConfig(animation);
        }
      })
      .map((animation) => new Animator(animation));

    this._createCurrentValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  _createCurrentValues() {
    this._currentValues = this.animators.reduce((results, animator) => {
      const name = animator.animation.name;
      const property = animator.animation.property;

      let animation = results[name];

      if (animation == null) {
        animation = results[name] = {};
      }

      if (animation[property] == null) {
        animation[property] = animator.animation.result.clone();
      }

      return results;
    }, {});
  }

  _assignValue(animation) {
    const currentValue = this._currentValues[animation.name][
      animation.property
    ];

    currentValue.value = animation.result.value;
    currentValue.graph = animation.result.graph;
    currentValue.graphHash = animation.result.graphHash;
  }

  _saveCurrentValues() {
    const visitedMap = new Map();
    const animators = this.animators;
    const length = animators.length;

    // Assign all values at least once.
    // This initials values beyond the time we are at.
    for (let x = 0; x < length; x++) {
      const animation = animators[x].animation;
      const key = `${animation.name}|${animation.property}`;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        this._assignValue(animation);
      }
    }

    // Assign if the value if the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const animation = animators[x].animation;

      if (animation.startAt <= this._time) {
        this._assignValue(animation);
      }
    }
  }

  update(time) {
    this._time = time;
    // Update all animations
    this.animators.forEach((animator) => {
      animator.update(time);
    });

    this._saveCurrentValues();

    return this;
  }

  getCurrentValues() {
    return this._currentValues;
  }

  merge(timeline) {
    const oldAnimations = this.animators.map((a) => a.animation);
    const newAnimations = timeline.animators.map((a) => a.animation);

    this.initialize([...oldAnimations, ...newAnimations]);

    return this;
  }
}
