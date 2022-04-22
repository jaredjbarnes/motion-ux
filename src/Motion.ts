import ExtendedAnimation from "./ExtendedAnimation";
import IAnimation, { AnimationState } from "./IAnimation";
import Animation from "./Animation";
import Player, { RepeatDirection } from "./Player";
import BlendedAnimation from "./BlendedAnimation";
import { EasingFunction } from "./easings";
import KeyframeGenerator from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";

export default class Motion<T> {
  protected setOnFirst: boolean;
  protected player = new Player<T>();
  protected currentDuration = 0;
  protected keyframeGenerator = new KeyframeGenerator();
  protected observer: TimeObserver<any> | null = null;

  constructor(render: (animation: IAnimation<T>) => void, setOnFirst = false) {
    this.player.render = render;
    this.setOnFirst = setOnFirst;
  }

  segueTo(
    animation: IAnimation<T>,
    duration: number = 0,
    easing?: EasingFunction
  ) {
    const currentDuration = this.currentDuration;
    const currentAnimation = this.player.animation;
    const currentTime = this.player.time;

    this.player.duration = this.currentDuration = duration;
    this.player.iterations = 0;
    this.player.repeat = 1;

    if (currentAnimation == null) {
      if (this.setOnFirst) {
        const finishedAnimation = animation.clone();
        this.player.duration = 0.001;
        this.player.animation = finishedAnimation;
      } else {
        this.player.animation = animation;
      }
    } else {
      const extendDurationBy = duration - currentDuration * currentTime;

      let fromAnimation: IAnimation<T>;

      if (extendDurationBy > 0) {
        fromAnimation = new ExtendedAnimation(
          currentAnimation,
          currentDuration,
          currentTime,
          extendDurationBy
        );
      } else {
        const values = currentAnimation.currentValues;
        const animation = this.makeAnimationFromLastValues(values);
        fromAnimation = animation;
      }

      const newAnimation = new BlendedAnimation(
        fromAnimation,
        animation,
        easing
      );

      this.player.animation = newAnimation;

      this.observer?.dispose();
      this.observer = this.player.observeTimeOnce(1, () => {
        const values = newAnimation.currentValues;
        const animation = this.makeAnimationFromLastValues(values);
        this.player.animation = animation;
      });
    }

    this.player.time = 0;
    this.player.play();
  }

  segueToLoop(animation: IAnimation<T>, duration = 0, easing?: EasingFunction) {
    const currentDuration = this.currentDuration;
    const currentAnimation = this.player.animation;
    const currentTime = this.player.time;

    this.player.duration = this.currentDuration = duration;
    this.player.iterations = 0;
    this.player.repeat = 1;

    this.player.repeat = Infinity;
    this.player.repeatDirection = RepeatDirection.DEFAULT;

    if (currentAnimation == null) {
      this.player.animation = animation;
    } else {
      const extendDurationBy = duration - currentDuration * currentTime;

      let fromAnimation: IAnimation<T>;

      if (extendDurationBy > 0) {
        fromAnimation = new ExtendedAnimation(
          currentAnimation,
          currentDuration,
          currentTime,
          extendDurationBy
        );
      } else {
        fromAnimation = currentAnimation;
      }

      this.player.animation = new BlendedAnimation(
        fromAnimation,
        animation,
        easing
      );

      this.observer?.dispose();
      this.observer = this.player.observeTimeOnce(1, () => {
        this.player.animation = animation;
      });
    }
    this.player.time = 0;
    this.player.play();
  }

  protected makeAnimationFromLastValues(values: AnimationState<T>) {
    const keyframes = Object.keys(values).reduce((acc, key) => {
      acc[key] = {
        from: JSON.parse(JSON.stringify(values[key])),
        to: JSON.parse(JSON.stringify(values[key])),
      };
      return acc;
    }, {} as any);

    return new Animation<T>(
      "last-animation",
      this.keyframeGenerator.generate(keyframes)
    );
  }

  stop() {
    this.player.stop();
  }

  play() {
    this.player.play();
  }
}
