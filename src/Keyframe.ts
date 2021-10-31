import easings, { EasingFunction } from "./easings";
import { DynamicEasingNames } from "./createDynamicEasing";
import KeyframesGenerator, {
  IKeyframeControls,
  IAnimationConfig,
} from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";

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

const keyframesGenerator = new KeyframesGenerator();

export default class Keyframe<T> {
  public property: string;
  public to: T;
  public from: T;
  public result: T;
  public startAt: number;
  public endAt: number;
  public controls: T[];
  public easing: EasingFunction;

  constructor(config: KeyframeConfig<T>) {
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.result = JSON.parse(JSON.stringify(config.from));
    this.startAt = typeof config.startAt === "number" ? config.startAt : 0;
    this.endAt = typeof config.endAt === "number" ? config.endAt : 1;
    this.controls = Array.isArray(config.controls) ? config.controls : [];
    this.easing =
      typeof config.easing === "function" ? config.easing : easings.linear;
  }

  clone() {
    return new Keyframe({
      property: this.property,
      to: JSON.parse(JSON.stringify(this.to)),
      from: JSON.parse(JSON.stringify(this.from)),
      startAt: this.startAt,
      endAt: this.endAt,
      controls: this.controls.map((c) => JSON.parse(JSON.stringify(c))),
      easing: this.easing,
    });
  }
}
