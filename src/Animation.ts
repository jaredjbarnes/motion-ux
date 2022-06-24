import Animator from "./Animator";
import Keyframe from "./Keyframe";

export type AnimationState<T> = { [key: string]: T };

export interface IAnimation<T> {
  name: string;
  currentValues: T;
  update(time: number): IAnimation<T>;
  clone(): IAnimation<T>;
}

const sortTime = (animatorA: Animator<any>, animatorB: Animator<any>) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

export default class Animation<T> implements IAnimation<T> {
  protected animators: Animator<unknown>[] = [];
  protected time = 0;
  protected offset = 0;

  public name: string;
  public currentValues: T;

  constructor(name: string, keyframes: Keyframe<unknown>[]) {
    this.name = name;
    this.currentValues = {} as T;
    this.keyframes = keyframes;
  }

  set keyframes(keyframes: Keyframe<unknown>[]) {
    this.animators = keyframes.map((keyframe) => new Animator(keyframe));
    this._createCurrentValues();
    this.animators.sort(sortTime);
  }

  get keyframes() {
    return this.animators.map((a) => a.keyframe);
  }

  protected _createCurrentValues() {
    this.currentValues = this.animators.reduce((results: any, animator) => {
      const keyframe = animator.keyframe;
      const property = keyframe.property;
      results[property] = keyframe.result;

      return results;
    }, {} as T);
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
        (this.currentValues as any)[keyframe.property] = keyframe.from;
      }
    }

    // Assign if the value of the start at was before the time now.
    // Since we have it sorted, the most current will win.
    for (let x = 0; x < length; x++) {
      const keyframe = animators[x].keyframe;

      if (keyframe.startAt <= this.time) {
        (this.currentValues as any)[keyframe.property] = keyframe.result;
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

  clone() {
    const keyframes = this.animators.map((a) => a.keyframe.clone());
    return new Animation<T>(this.name, keyframes);
  }
}
