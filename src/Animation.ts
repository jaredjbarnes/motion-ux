import Animator from "./Animator";
import Keyframe from "./Keyframe";
import { SimpleKeyframeConfig } from "./KeyframeUtility";
import ParsedValue from "./ParsedValue";

const sortAsc = (animatorA: Animator, animatorB: Animator) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

type AnimationState = {
  [key: string]: { [key: string]: ParsedValue };
};

export default class Animation {
  public animators: Animator[] = [];
  public _time: number = 0;
  public _currentValues!: AnimationState;

  constructor(keyframes: Keyframe[] | SimpleKeyframeConfig[]) {
    this.initialize(keyframes);
  }

  initialize(keyframes: Keyframe[] | SimpleKeyframeConfig[]) {
    this._currentValues = {};

    this.animators = keyframes
      .map((keyframe: any) => {
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

  private _createCurrentValues() {
    this._currentValues = this.animators.reduce(
      (results: AnimationState, animator) => {
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
      },
      {}
    );
  }

  private _assignValue(keyframe: Keyframe) {
    const currentValue = this._currentValues[keyframe.name][keyframe.property];

    currentValue.value = keyframe.result.value;
    currentValue.graph = keyframe.result.graph;
    currentValue.graphHash = keyframe.result.graphHash;
  }

  private _saveCurrentValues() {
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

  update(time: number) {
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

  merge(animation: Animation) {
    const oldKeyframes = this.animators.map((a) => a.keyframe);
    const newKeyframes = animation.animators.map((a) => a.keyframe);

    this.initialize([...oldKeyframes, ...newKeyframes]);

    return this;
  }
}
