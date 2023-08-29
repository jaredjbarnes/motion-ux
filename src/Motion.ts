import Animation, { IAnimation } from "./Animation";
import Player from "./Player";
import KeyframeGenerator from "./KeyframesGenerator";
import { createTransitionAnimation } from "./createTransitionAnimation";
import BlendedAnimation from "./BlendedAnimation";
import easings, { EasingFunction } from "./easings";
import { deepClone } from "./deepClone";

function defaultOnComplete() {}

const DESIRED_FPS = 1000 / 60;

export default class Motion<T extends {}> {
  protected currentDuration = 0;
  protected keyframeGenerator = new KeyframeGenerator();
  protected player: Player;
  protected animation: IAnimation<T>;
  protected animationAfterSegue: IAnimation<T>;
  protected onComplete = defaultOnComplete;

  constructor(
    render: (animation: IAnimation<T>) => void,
    initialValue: T,
    duration = 0
  ) {
    this.animation = this.makeAnimationFromValues(initialValue);
    this.animationAfterSegue = this.animation;
    this.player = new Player();
    this.player.duration = duration;
    this.player.render = (time: number) => {
      if (this.animation != null) {
        this.animation.update(time);
        render(this.animation);
      }
    };

    this.player.observeTime(1, () => {
      this.animation = this.animationAfterSegue;
      this.onComplete();
    });
  }

  inject(animation: IAnimation<T>) {
    this.animation = animation;

    this.player.duration = DESIRED_FPS;
    this.player.time = 0.999;
    this.player.play();

    return this;
  }

  segueTo(
    to: IAnimation<T>,
    duration: number = 0,
    easing: EasingFunction = easings.linear,
    onComplete = defaultOnComplete
  ) {
    const transitionAnimation = this.createTransition(to, duration, easing);

    this.onComplete = onComplete;
    to.update(1);
    this.animationAfterSegue = this.makeAnimationFromValues(to.currentValues);

    to.update(0);
    this.animation = transitionAnimation;

    this.player.repeat = 1;
    this.player.play();

    return this;
  }

  segueToLoop(
    to: IAnimation<T>,
    duration = 0,
    easing: EasingFunction,
    onComplete = defaultOnComplete
  ) {
    const transitionAnimation = this.createTransition(to, duration, easing);

    this.onComplete = onComplete;
    this.animationAfterSegue = to;
    this.animation = transitionAnimation;
    this.player.repeat = Infinity;
    this.player.play();

    return this;
  }

  private createTransition(to: IAnimation<T>, duration: number = 0, easing: EasingFunction = easings.linear) {
    const currentAnimation = this.animation;
    const from = createTransitionAnimation(currentAnimation, to, duration);

    const blendedAnimation = new BlendedAnimation(from, to, easing);

    this.player.time = 0;
    this.player.duration = duration;
    this.player.iterations = 0;

    return blendedAnimation;
  }

  stop() {
    this.player.stop();
    return this;
  }

  play() {
    this.player.play();
    return this;
  }

  protected makeAnimationFromValues(values: any) {
    const keyframes = Object.keys(values).reduce((acc, key) => {
      acc[key] = {
        from: deepClone(values[key]),
        to: deepClone(values[key]),
      };
      return acc;
    }, {} as any);

    return new Animation<T>(
      "completed-animation",
      this.keyframeGenerator.generate(keyframes)
    );
  }
}
