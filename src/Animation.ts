import Animator from "./Animator";
import Keyframe from "./Keyframe";

export interface IAnimation<T> {
  name: string;
  currentValues: T;
  deltaValues: T;
  update(time: number): IAnimation<T>;
  clone(): IAnimation<T>;
}

const sortTime = (animatorA: Animator<any>, animatorB: Animator<any>) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

export default class Animation<T extends {}> implements IAnimation<T> {
  protected animators: Animator<T>[] = [];
  protected time = 0;

  public name: string;
  public currentValues: T;
  public deltaValues: T;

  constructor(name: string, keyframes: Keyframe<T, keyof T>[]) {
    this.name = name;
    this.currentValues = {} as T;
    this.deltaValues = {} as T;
    this.keyframes = keyframes;
  }

  set keyframes(keyframes: Keyframe<T, keyof T>[]) {
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
        this.currentValues[keyframe.property] = animator.initialValue;
        this.deltaValues[keyframe.property] = animator.initialDelta;
      }

      if (keyframe.startAt <= this.time) {
        this.currentValues[keyframe.property] = animator.value;
        this.deltaValues[keyframe.property] = animator.delta;
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
