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

export interface KeyframeConfig<T, K extends keyof T = keyof T> {
  property: K;
  to: T[K];
  from: T[K];
  endAt?: number;
  startAt?: number;
  controls?: T[K][];
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

export default class Keyframe<T, K extends keyof T = keyof T> {
  public property: K;
  public to: T[K];
  public from: T[K];
  public startAt: number;
  public endAt: number;
  public controls: T[K][];
  public easing: EasingFunction;

  constructor(config: KeyframeConfig<T, K>) {
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
