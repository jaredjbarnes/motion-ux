import Animator from "./Animator";
import Keyframe from "./Keyframe";
import IAnimation from "./IAnimation";

const sortAsc = (animatorA: Animator<any>, animatorB: Animator<any>) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

type AnimationState<T> = { [key: string]: T };

export default class Animation<T> implements IAnimation<T> {
  protected _time: number = 0;
  protected animators: Animator<T>[] = [];

  public name: string;
  public currentValues: AnimationState<T>;

  constructor(name: string, keyframes: Keyframe<T>[]) {
    this.name = name;
    this.currentValues = {};
    this.animators = keyframes.map((keyframe) => new Animator(keyframe));
    this._createCurrentValues();

    // Sort by time.
    this.animators.sort(sortAsc);
  }

  protected _createCurrentValues() {
    this.currentValues = this.animators.reduce(
      (results: AnimationState<T>, animator) => {
        const keyframe = animator.keyframe;
        const property = keyframe.property;
        results[property] = keyframe.result;

        return results;
      },
      {}
    );
  }

  private _saveCurrentValues() {
    const visitedMap = new Map();
    const animators = this.animators;
    const length = animators.length;

    // Assign all values at least once.
    // This initials values beyond the time we are at.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;
      const key = keyframe.property;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        this.currentValues[keyframe.property] = keyframe.result;
      }
    }

    // Assign if the value of the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;

      if (keyframe.startAt <= this._time) {
        this.currentValues[keyframe.property] = keyframe.result;
      }
    }
  }

  update(time: number) {
    this._time = time;

    this.animators.forEach((animator) => {
      animator.update(time);
    });

    this._saveCurrentValues();

    return this;
  }
}
