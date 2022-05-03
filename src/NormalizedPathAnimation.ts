import { PathAnimation } from "./PathAnimation";
import { AnimationState, IAnimation } from "./Animation";
import easings, { EasingFunction } from "./easings";

export class NormalizedPathAnimation implements IAnimation<number> {
  private easing: EasingFunction;
  private simpsonStripAmount: number;
  private pathAnimation: PathAnimation;
  private pathDistance: number;
  private delta: number;

  name: string = "";
  currentValues: AnimationState<number> = {};

  constructor(
    pathString: string,
    easing: EasingFunction = easings.linear,
    simpsonStripAmount: number = 4,
    delta: number = 0.001
  ) {
    this.easing = easing;
    this.delta = delta;
    this.simpsonStripAmount = simpsonStripAmount - (simpsonStripAmount % 2);
    this.pathAnimation = new PathAnimation(pathString);
    this.pathDistance = this.simpsonsRule(
      0,
      1,
      this.distanceAtTime,
      this.simpsonStripAmount
    );
  }

  simpsonsRule(
    lowerBound: number,
    upperBound: number,
    f: (x: number) => number,
    n: number = 4
  ) {
    // Use Simpsons Rule to calculate the distance.
    let stripAmount = f(lowerBound);
    const stepAmount = (upperBound - lowerBound) / n;
    let currentX = lowerBound;

    for (let x = 0; x < n - 1; x++) {
      currentX += stepAmount;
      let coefficient = 4;

      if (x % 2 !== 0) {
        coefficient = 2;
      }

      stripAmount += coefficient * f(currentX);
    }

    stripAmount += f(upperBound);

    return (stepAmount / 3) * stripAmount;
  }

  distanceAtTime = (time: number) => {
    if (time === 1) {
      time = time - this.delta;
    }

    const { x: upperX, y: upperY } = this.pathAnimation.update(
      time + this.delta
    ).currentValues;
    const { x: lowerX, y: lowerY } =
      this.pathAnimation.update(time).currentValues;

    const deltaX = Math.abs(upperX - lowerX);
    const deltaY = Math.abs(upperY - lowerY);

    return Math.sqrt(
      Math.pow(deltaX / this.delta, 2) + Math.pow(deltaY / this.delta, 2)
    );
  };

  update(time: number): IAnimation<number> {
    throw new Error("Method not implemented.");
  }

  clone(): IAnimation<number> {
    throw new Error("Method not implemented.");
  }
}
