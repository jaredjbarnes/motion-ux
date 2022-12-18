import Animator from "./Animator";
import Keyframe, { generateInitialDelta } from "./Keyframe";

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
  protected animators: Animator<T>[] = [];
  protected time = 0;

  public name: string;
  public currentValues: T;
  public deltaValues: T;

  constructor(name: string, keyframes: Keyframe<T>[]) {
    this.name = name;
    this.currentValues = {} as T;
    this.deltaValues = {} as T;
    this.keyframes = keyframes;
  }

  set keyframes(keyframes: Keyframe<T>[]) {
    this.animators = keyframes.map((keyframe) => new Animator<T>(keyframe));
    this._createCurrentValues();
    this.animators.sort(sortTime);
  }

  get keyframes() {
    return this.animators.map((a) => a.keyframe);
  }

  protected _createCurrentValues() {
    this.currentValues = {} as T;
    this.deltaValues = {} as T;

    this.animators.forEach((animator) => {
      const keyframe = animator.keyframe;
      const property = keyframe.property;
      (this.currentValues as any)[property] = animator.value;
      (this.deltaValues as any)[property] = animator.delta;
    });
  }

  private _saveCurrentValues() {
    const visitedMap = new Map();
    const animators = this.animators;
    const length = animators.length;

    for (let x = 0; x < length; x++) {
      const animator = animators[x];
      const keyframe = animator.keyframe;
      const key = keyframe.property;

      if (!visitedMap.has(key)) {
        visitedMap.set(key, true);
        (this.currentValues as any)[keyframe.property] = animator.initialValue;
        (this.deltaValues as any)[keyframe.property] = animator.initialDelta;
      }

      if (keyframe.startAt <= this.time) {
        (this.currentValues as any)[keyframe.property] = animator.value;
        (this.deltaValues as any)[keyframe.property] = animator.delta;
      }
    }
  }

  update(time: number) {
    this.time = time;

    this.animators.forEach((animator) => {
      animator.update(this.time);
    });

    this._saveCurrentValues();

    return this;
  }

  clone() {
    const keyframes = this.animators.map((a) => a.keyframe.clone());
    return new Animation<T>(this.name, keyframes);
  }
}
