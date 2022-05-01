import Animator from "./Animator";
import Keyframe from "./Keyframe";

export type AnimationState<T> = { [key: string]: T };

export interface IAnimation<T> {
  name: string;
  currentValues: AnimationState<T>;
  update(time: number): IAnimation<T>;
  extend(): IAnimation<T>;
  clone(): IAnimation<T>;
}

const sortTime = (animatorA: Animator<any>, animatorB: Animator<any>) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

export default class Animation<T> implements IAnimation<T> {
  protected animators: Animator<T>[] = [];
  protected time = 0;
  protected offset = 0;

  public name: string;
  public currentValues: AnimationState<T>;

  constructor(name: string, keyframes: Keyframe<T>[]) {
    this.name = name;
    this.currentValues = {};
    this.keyframes = keyframes;
  }

  set keyframes(keyframes: Keyframe<T>[]) {
    this.animators = keyframes.map((keyframe) => new Animator(keyframe));
    this._createCurrentValues();
    this.animators.sort(sortTime);
  }

  get keyframes() {
    return this.animators.map((a) => a.keyframe);
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
    // These are the initials values beyond the time we are at.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;
      const key = keyframe.property;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        this.currentValues[keyframe.property] = keyframe.from;
      }
    }

    // Assign if the value of the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;

      if (keyframe.startAt <= this.time) {
        this.currentValues[keyframe.property] = keyframe.result;
      }
    }
  }

  update(time: number) {
    this.time = time;

    this.animators.forEach((animator) => {
      animator.update(this.offset + this.time);
    });

    this._saveCurrentValues();

    return this;
  }

  extend() {
    const animation = this.clone();
    animation.offset = this.offset + this.time;
    animation.update(0);
    return animation;
  }

  clone() {
    const keyframes = this.animators.map((a) => a.keyframe.clone());
    return new Animation(this.name, keyframes);
  }
}
