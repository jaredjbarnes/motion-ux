import easings, { EasingFunction } from "./easings";

export interface KeyframeConfig<T> {
  name: string;
  property: string;
  to: T;
  from: T;
  endAt?: number;
  startAt?: number;
  controls?: T[];
  easing?: EasingFunction;
}

export default class Keyframe<T> {
  public name: string;
  public property: string;
  public to: T;
  public from: T;
  public result: T;
  public startAt: number;
  public endAt: number;
  public controls: T[];
  public easing: EasingFunction;

  constructor(config: KeyframeConfig<T>) {
    this.name = config.name;
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
}
