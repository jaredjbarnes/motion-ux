import Animator from "./Animator.js";
import Keyframe from "./Keyframe.js";

const sortAsc = (animatorA, animatorB) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

export default class Animation {
  constructor(keyframes) {
    this.animators = new Map();
    this._time = 0;

    this.initialize(keyframes);
  }

  initialize(keyframes) {
    this._currentValues = {};

    this.animators = keyframes
      .map((keyframe) => {
        if (keyframe instanceof Keyframe) {
          return keyframe;
        } else {
          return Keyframe.fromSimpleConfig(keyframe);
        }
      })
      .map((keyframe) => new Animator(keyframe));

    this._createCurrentValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  _createCurrentValues() {
    this._currentValues = this.animators.reduce((results, animator) => {
      const name = animator.keyframe.name;
      const property = animator.keyframe.property;

      let keyframe = results[name];

      if (keyframe == null) {
        keyframe = results[name] = {};
      }

      if (keyframe[property] == null) {
        keyframe[property] = animator.keyframe.result.clone();
      }

      return results;
    }, {});
  }

  _assignValue(keyframe) {
    const currentValue = this._currentValues[keyframe.name][
      keyframe.property
    ];

    currentValue.value = keyframe.result.value;
    currentValue.graph = keyframe.result.graph;
    currentValue.graphHash = keyframe.result.graphHash;
  }

  _saveCurrentValues() {
    const visitedMap = new Map();
    const animators = this.animators;
    const length = animators.length;

    // Assign all values at least once.
    // This initials values beyond the time we are at.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;
      const key = `${keyframe.name}|${keyframe.property}`;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        this._assignValue(keyframe);
      }
    }

    // Assign if the value of the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;

      if (keyframe.startAt <= this._time) {
        this._assignValue(keyframe);
      }
    }
  }

  update(time) {
    this._time = time;
    // Update all keyframes
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
    const oldKeyframes = this.animators.map((a) => a.keyframe);
    const newKeyframes = timeline.animators.map((a) => a.keyframe);

    this.initialize([...oldKeyframes, ...newKeyframes]);

    return this;
  }
}
