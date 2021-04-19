import Animator from "./Animator";
import Keyframe from "./Keyframe";
import { SimpleKeyframeConfig } from "./KeyframeUtility";
import ParsedValue from "./ParsedValue";
import createDynamicEasing, { IEasingNames } from "./createDynamicEasing";

const sortAsc = (animatorA: Animator, animatorB: Animator) => {
  return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};

type AnimationState = {
  [key: string]: { [key: string]: ParsedValue };
};

export interface IComplexKeyframeValue {
  value: string;
  controlsIn?: string[];
  controlsOut?: string[];
  easeIn?: IEasingNames;
  easeOut?: IEasingNames;
}

export type IAnimationKeyframeValue = string | IComplexKeyframeValue;

export interface IAnimationKeyframes {
  [key: string]: {
    [key: string]: IAnimationKeyframeValue;
  };
  from: {
    [key: string]: IAnimationKeyframeValue;
  };
  to: {
    [key: string]: IAnimationKeyframeValue;
  };
}

const sortPercentages = (keyA: string, keyB: string) => {
  if (keyA === "from") {
    return -1;
  }

  if (keyB === "from") {
    return 1;
  }

  if (keyA === "to") {
    return 1;
  }

  if (keyB === "to") {
    return -1;
  }

  const keyANumber = parseInt(keyA, 10);
  const keyBNumber = parseInt(keyB, 10);

  if (keyANumber < keyBNumber) {
    return -1;
  } else if (keyANumber > keyBNumber) {
    return 1;
  }

  return 0;
};

function getDecimalFromPercentage(percentage: string) {
  let decimal = parseInt(percentage, 10) / 100;

  decimal = Math.max(0, decimal);
  decimal = Math.min(1, decimal);

  return decimal;
}

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

  static fromKeyframes(name: string, config: IAnimationKeyframes) {
    const timeKeys = Object.keys(config);
    const keyframes: Keyframe[] = [];
    let lastKeyFramePercentage = 0;
    timeKeys.sort(sortPercentages);

    for (let index = 0; index < timeKeys.length - 1; index++) {
      const key = timeKeys[index];
      const nextKey = timeKeys[index + 1];
      const currentAnimationKeyframe = config[key];
      const nextAnimationKeyframe = config[nextKey] || null;
      const startAt = lastKeyFramePercentage;
      const endAt = getDecimalFromPercentage(timeKeys[index + 1]);

      lastKeyFramePercentage = endAt;

      Object.keys(currentAnimationKeyframe).forEach((key) => {
        const currentValue = currentAnimationKeyframe[key];
        const nextValue = nextAnimationKeyframe[key];

        if (nextValue == null) {
          throw new Error(
            `All keyframe declarations need to have the same properties. Missing: '${key}'`
          );
        }

        const easingIn =
          typeof currentValue === "string"
            ? "linear"
            : currentValue.easeOut || "linear";
        const easingOut =
          typeof nextValue === "string"
            ? "linear"
            : nextValue.easeIn || "linear";

        const easing = createDynamicEasing(easingIn, easingOut);

        const controlsIn =
          typeof currentValue === "string" ? [] : currentValue.controlsIn || [];
        const controlsOut =
          typeof nextValue === "string" ? [] : nextValue.controlsOut || [];

        const controls = [...controlsIn, ...controlsOut];

        const from =
          typeof currentValue === "string" ? currentValue : currentValue.value;

        const to = typeof nextValue === "string" ? nextValue : nextValue.value;

        const keyframeConfig: SimpleKeyframeConfig = {
          name,
          property: key,
          from,
          to,
          controls,
          easing,
          startAt,
          endAt,
        };

        keyframes.push(Keyframe.fromSimpleConfig(keyframeConfig));
      });
    }

    return new Animation(keyframes);
  }
}
