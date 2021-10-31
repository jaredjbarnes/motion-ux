import createDynamicEasing, { DynamicEasingNames } from "./createDynamicEasing";
import Keyframe from "./Keyframe";

export interface IKeyframeControls<T> {
  value: T;
  controlsIn?: T[];
  controlsOut?: T[];
  easeIn?: DynamicEasingNames;
  easeOut?: DynamicEasingNames;
}

export interface IAnimationConfig<T> {
  [key: string]: T | IKeyframes<T>;
}
export interface IKeyframes<T> {
  [key: string]: T | IKeyframeControls<T>;
  from: T | IKeyframeControls<T>;
  to: T | IKeyframeControls<T>;
}

export interface IKeyframesConstrained<T> {
  [key: string]: IKeyframeControls<T>;
  from: IKeyframeControls<T>;
  to: IKeyframeControls<T>;
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

  getEaseIn<T>(currentValue: IKeyframeControls<T>) {
    if (this.isComplexKeyframe(currentValue) && currentValue.easeOut != null) {
      return currentValue.easeOut || "linear";
    } else {
      return "linear";
    }
  }

  getEaseOut<T>(nextValue: IKeyframeControls<T>) {
    if (this.isComplexKeyframe(nextValue) && nextValue.easeIn != null) {
      return nextValue.easeIn || "linear";
    } else {
      return "linear";
    }
  }

  getControlsIn<T>(currentValue: IKeyframeControls<T>) {
    if (
      this.isComplexKeyframe(currentValue) &&
      Array.isArray(currentValue.controlsOut)
    ) {
      return currentValue.controlsOut.map((v) => this.transformValue(v));
    } else {
      return [];
    }
  }

  getControlsOut<T>(nextValue: IKeyframeControls<T>) {
    if (
      this.isComplexKeyframe(nextValue) &&
      Array.isArray(nextValue.controlsIn)
    ) {
      return nextValue.controlsIn.map((v) => this.transformValue(v));
    } else {
      return [];
    }
  }

  getFrom<T>(currentValue: IKeyframeControls<T>) {
    if (this.isComplexKeyframe(currentValue)) {
      return this.transformValue(currentValue.value);
    } else if (typeof currentValue === "string") {
      return this.transformValue(currentValue);
    } else {
      if (typeof currentValue?.value === "string") {
        throw new Error(
          "Invalid complex value, only found a value with no other complex settings."
        );
      }
      throw new Error(`Unknown from value: ${JSON.stringify(currentValue)}`);
    }
  }

  getTo<T>(nextValue: IKeyframeControls<T>) {
    if (this.isComplexKeyframe(nextValue)) {
      return this.transformValue(nextValue.value);
    } else if (typeof nextValue === "string") {
      return this.transformValue(nextValue);
    } else {
      if (typeof nextValue?.value === "string") {
        throw new Error(
          "Invalid complex value, only found a value with no other complex settings."
        );
      }
      throw new Error(`Unknown to value: ${JSON.stringify(nextValue)}`);
    }
  }

  normalizePrimitiveValue<T>(value: T): IKeyframeControls<T> {
    return {
      value,
    };
  }

  normalizeValue<T>(value: T | IKeyframeControls<T>): IKeyframeControls<T> {
    if (typeof value === "string" || typeof value === "number") {
      return this.normalizePrimitiveValue(value);
    } else {
      return value as IKeyframeControls<T>;
    }
  }

  normalizeKeyframeValue<T>(
    value: T | IKeyframeControls<T> | IKeyframes<T>
  ): IKeyframesConstrained<T> {
    if (typeof value === "string" || typeof value === "number") {
      return {
        from: this.normalizePrimitiveValue(value),
        to: this.normalizePrimitiveValue(value),
      };
    } else if (typeof value === "object" && value != null) {
      const keyframes: any = value;
      const keys = Object.keys(keyframes);
      keys.forEach((key) => {
        const keyframeValue = this.normalizeValue(keyframes[key]);
        keyframeValue;
      });

      return value as IKeyframesConstrained<T>;
    } else {
      throw new Error("Unknown value type.");
    }
  }

  generate<T>(animationConfig: IAnimationConfig<T>) {
    const animatedProperties = Object.keys(animationConfig);
    const keyframes: Keyframe<T>[] = [];

    for (let x = 0; x < animatedProperties.length; x++) {
      const property = animatedProperties[x];
      let lastKeyFramePercentage = 0;
      const keyframeValue = this.normalizeKeyframeValue(
        animationConfig[property]
      );
      const timeKeys = Object.keys(keyframeValue);
      timeKeys.sort(this.sortPercentages);

      for (let index = 0; index < timeKeys.length - 1; index++) {
        const key = timeKeys[index];
        const nextKey = timeKeys[index + 1];

        const currentValue = keyframeValue[key];
        const nextValue = keyframeValue[nextKey] || null;
        const startAt = lastKeyFramePercentage;
        const endAt = this.getDecimalFromPercentage(timeKeys[index + 1]);

        lastKeyFramePercentage = endAt;

        const easingIn = this.getEaseIn(currentValue);
        const easingOut = this.getEaseOut(nextValue);
        const easing = createDynamicEasing(easingIn, easingOut);
        const controlsIn = this.getControlsIn(currentValue);
        const controlsOut = this.getControlsOut(nextValue);
        const controls = [...controlsIn, ...controlsOut];
        const from = this.getFrom(currentValue);
        const to = this.getTo(nextValue);

        const keyframe = new Keyframe<T>({
          property: key,
          from,
          to,
          controls,
          easing,
          startAt,
          endAt,
        });

        keyframes.push(keyframe);
      }
    }
    return keyframes;
  }
}
