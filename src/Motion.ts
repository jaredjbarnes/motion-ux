import ExtendedAnimation from "./ExtendedAnimation";
import Animation, { IAnimation, AnimationState } from "./Animation";
import Player, { RepeatDirection } from "./Player";
import BlendedAnimation from "./BlendedAnimation";
import { EasingFunction } from "./easings";
import KeyframeGenerator from "./KeyframesGenerator";
import TimeObserver from "./TimeObserver";

export default class Motion<T> {
  protected setOnFirst: boolean;
  protected currentDuration = 0;
  protected keyframeGenerator = new KeyframeGenerator();
  protected observer: TimeObserver<any> | null = null;
  protected player: Player;

  animation: IAnimation<T> | null = null;

  constructor(
    render: (animation: IAnimation<T>) => void,
    setOnFirst = false,
    player?: Player
  ) {
    this.player = player || new Player<T>();
    this.player.render = (time: number) => {
      if (this.animation != null) {
        this.animation.update(time);
        render(this.animation);
      }
    };
    this.setOnFirst = setOnFirst;
  }

  inject(animation: IAnimation<T>) {
    this.animation = animation;

    this.player.duration = 16.667;
    this.player.time = 0.999;
    this.player.play();

    return this;
  }

  segueTo(
    animation: IAnimation<T>,
    duration: number = 0.001,
    easing?: EasingFunction
  ) {
    const currentDuration = this.currentDuration;
    const currentAnimation = this.animation;
    const currentTime = this.player.time;

    this.player.duration = this.currentDuration = duration;
    this.player.iterations = 0;
    this.player.repeat = 1;

    if (currentAnimation == null) {
      if (this.setOnFirst) {
        const finishedAnimation = animation.clone();
        this.player.duration = 0.001;
        this.animation = finishedAnimation;
      } else {
        this.animation = animation;
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

      const newAnimation = new BlendedAnimation<T>(
        fromAnimation,
        animation,
        easing
      );

      this.animation = newAnimation;

      this.observer?.dispose();
      this.observer = this.player.observeTimeOnce(1, () => {
        newAnimation.update(1);
        const values = newAnimation.currentValues;
        const animation = this.makeAnimationFromLastValues(values);
        this.animation = animation;
      });
    }

    this.player.time = 0;
    this.player.play();
  }

  segueToLoop(animation: IAnimation<T>, duration = 0, easing?: EasingFunction) {
    const currentDuration = this.currentDuration;
    const currentAnimation = this.animation;
    const currentTime = this.player.time;

    this.player.duration = this.currentDuration = duration;
    this.player.iterations = 0;
    this.player.repeat = 1;

    this.player.repeat = Infinity;
    this.player.repeatDirection = RepeatDirection.DEFAULT;

    if (currentAnimation == null) {
      this.animation = animation;
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

      this.animation = new BlendedAnimation<T>(
        fromAnimation,
        animation,
        easing
      );

      this.observer?.dispose();
      this.observer = this.player.observeTimeOnce(1, () => {
        this.animation = animation;
      });
    }
    this.player.time = 0;
    this.player.play();
  }

  stop() {
    this.player.stop();
    return this;
  }

  play() {
    this.player.play();
    return this;
  }

  protected makeAnimationFromLastValues(values: any) {
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
}
