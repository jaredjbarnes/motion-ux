import easings, { EasingFunction } from "./easings";
import { DynamicEasingNames } from "./createDynamicEasing";
import { deepClone } from "./deepClone";
import ObjectOperator from "./ObjectOperator";

const objectOperator = new ObjectOperator();

export interface IComplexKeyframeValue<T> {
  value: T;
  controlsIn?: T[];
  controlsOut?: T[];
  easeIn?: DynamicEasingNames;
  easeOut?: DynamicEasingNames;
}

export interface KeyframeConfig<T> {
  property: string;
  to: T;
  from: T;
  endAt?: number;
  startAt?: number;
  controls?: T[];
  easing?: EasingFunction;
}

export function generateInitialDelta<T>(delta: T) {
  if (typeof delta === "number") {
    return 0 as any as T;
  } else if (typeof delta === "string") {
    return delta;
  } else {
    objectOperator.assign(delta, 0);
    return delta;
  }
}

export default class Keyframe<T> {
  public property: string;
  public to: T;
  public from: T;
  public startAt: number;
  public endAt: number;
  public controls: T[];
  public easing: EasingFunction;

  constructor(config: KeyframeConfig<T>) {
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.startAt = typeof config.startAt === "number" ? config.startAt : 0;
    this.endAt = typeof config.endAt === "number" ? config.endAt : 1;
    this.controls = Array.isArray(config.controls) ? config.controls : [];
    this.easing =
      typeof config.easing === "function" ? config.easing : easings.linear;
  }

  clone() {
    return new Keyframe({
      property: this.property,
      to: deepClone(this.to),
      from: deepClone(this.from),
      startAt: this.startAt,
      endAt: this.endAt,
      controls: this.controls.map((c) => deepClone(c)),
      easing: this.easing,
    });
  }
}
