import { IAnimation } from "./Animation";

export class PartialAnimation<T extends {}> implements IAnimation<T> {
  private animation: IAnimation<T>;
  private from: number;
  private to: number;
  private length: number;
  private ratio: number;

  name: string;

  get currentValues() {
    return this.animation.currentValues;
  }

  get deltaValues() {
    return this.animation.deltaValues;
  }

  constructor(animation: IAnimation<T>, from: number, to: number) {
    this.animation = animation;
    this.from = from;
    this.to = to;
    this.name = animation.name;
    this.length = to - from;
    this.ratio = this.length / 1;
    this.animation.update(from);
  }

  update(time: number): IAnimation<T> {
    const adjustedTime = time * this.ratio + this.from;
    this.animation.update(adjustedTime);
    return this;
  }

  clone(): IAnimation<T> {
    return new PartialAnimation(this.animation, this.from, this.to);
  }
}
