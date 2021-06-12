import createDynamicEasing, { DynamicEasingNames } from "./createDynamicEasing";
import Keyframe from "./Keyframe";

export interface IComplexKeyframeValue {
  value: any;
  controlsIn?: any[];
  controlsOut?: any[];
  easeIn?: DynamicEasingNames;
  easeOut?: DynamicEasingNames;
}

interface IAnimatableObject {
  [key: string]: IAnimationKeyframeValue;
}

export type IAnimationKeyframeValue = string | number | IComplexKeyframeValue;

export interface IAnimationKeyframes {
  [key: string]: IAnimatableObject;
  from: IAnimatableObject;
  to: IAnimatableObject;
}

const complexFrameKeys = ["controlsIn", "controlsOut", "easeIn", "easeOut"];

export default class KeyframesGenerator {
  private transformValue: (value: any) => any = (value) => value;

  setTransformValue(transformValue: (value: any) => any) {
    this.transformValue = transformValue;
  }

  isComplexKeyframe(value: any) {
    const keys = Object.keys(value);

    return (
      keys.includes("value") && keys.some((k) => complexFrameKeys.includes(k))
    );
  }

  sortPercentages = (keyA: string, keyB: string) => {
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

    const keyAParts = keyA.split("%");
    const keyBParts = keyB.split("%");
    const keyANumber = parseFloat(keyAParts[0]);
    const keyBNumber = parseFloat(keyBParts[0]);

    if (keyANumber < keyBNumber) {
      return -1;
    } else if (keyANumber > keyBNumber) {
      return 1;
    }

    return 0;
  };

  getDecimalFromPercentage(percentage: string) {
    if (percentage === "to") {
      return 1;
    }

    if (percentage === "from") {
      return 0;
    }

    const percentageParts = percentage.split("%");
    let decimal = parseFloat(percentageParts[0]) / 100;

    if (isNaN(decimal)) {
      throw new Error(
        `Unknown keyframe step: ${decimal}. Expected format 10% or 10.01% etc`
      );
    }

    decimal = Math.max(0, decimal);
    decimal = Math.min(1, decimal);

    return decimal;
  }

  getEaseIn(currentValue: any) {
    if (this.isComplexKeyframe(currentValue) && currentValue.easeOut != null) {
      return currentValue.easeOut || "linear";
    } else {
      return "linear";
    }
  }

  getEaseOut(nextValue: any) {
    if (this.isComplexKeyframe(nextValue) && nextValue.easeIn != null) {
      return nextValue.easeIn || "linear";
    } else {
      return "linear";
    }
  }

  getControlsIn(currentValue: any) {
    if (
      this.isComplexKeyframe(currentValue) &&
      Array.isArray(currentValue.controlsOut)
    ) {
      return currentValue.controlsOut.map((v: any) => this.transformValue(v));
    } else {
      return [];
    }
  }

  getControlsOut(nextValue: any) {
    if (
      this.isComplexKeyframe(nextValue) &&
      Array.isArray(nextValue.controlsIn)
    ) {
      return nextValue.controlsIn.map((v: any) => this.transformValue(v));
    } else {
      return [];
    }
  }

  getFrom(currentValue: any) {
    if (this.isComplexKeyframe(currentValue)) {
      return this.transformValue(currentValue.value);
    } else {
      return this.transformValue(currentValue);
    }
  }

  getTo(nextValue: any) {
    if (this.isComplexKeyframe(nextValue)) {
      return this.transformValue(nextValue.value);
    } else {
      return this.transformValue(nextValue);
    }
  }

  generate(animationKeyframes: IAnimationKeyframes) {
    const timeKeys = Object.keys(animationKeyframes);
    const keyframes: Keyframe<any>[] = [];
    let lastKeyFramePercentage = 0;
    timeKeys.sort(this.sortPercentages);

    for (let index = 0; index < timeKeys.length - 1; index++) {
      const key = timeKeys[index];
      const nextKey = timeKeys[index + 1];
      const currentAnimationKeyframe = animationKeyframes[key];
      const nextAnimationKeyframe = animationKeyframes[nextKey] || null;
      const startAt = lastKeyFramePercentage;
      const endAt = this.getDecimalFromPercentage(timeKeys[index + 1]);

      lastKeyFramePercentage = endAt;

      Object.keys(currentAnimationKeyframe).forEach((key) => {
        const currentValue = currentAnimationKeyframe[key];
        const nextValue = nextAnimationKeyframe[key];

        if (nextValue == null) {
          throw new Error(
            `All keyframe declarations need to have the same properties. Missing '${key}' from one of the keyframes. ${JSON.stringify(animationKeyframes)}`
          );
        }

        const easingIn = this.getEaseIn(currentValue);
        const easingOut = this.getEaseOut(nextValue);
        const easing = createDynamicEasing(easingIn, easingOut);
        const controlsIn = this.getControlsIn(currentValue);
        const controlsOut = this.getControlsOut(nextValue);
        const controls = [...controlsIn, ...controlsOut];
        const from = this.getFrom(currentValue);
        const to = this.getTo(nextValue);

        const keyframe = new Keyframe<any>({
          property: key,
          from,
          to,
          controls,
          easing,
          startAt,
          endAt,
        });

        keyframes.push(keyframe);
      });
    }
    return keyframes;
  }
}
