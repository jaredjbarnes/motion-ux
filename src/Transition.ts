import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
import ExtendedAnimation from "./ExtendedAnimation";
import BlendedAnimation from "./BlendedAnimation";
import TimeObserver, { ITimeEvent } from "./TimeObserver";

export interface ITransitionConfig<T> {
  animation: IAnimation<T>;
  duration: number;
  iterationCount: number; // Defaults to 1
  transitionDuration: number; // Defaults to the duration of the animation
  transitionEasing: keyof typeof easings; // Defaults to linear
  segueTo?: string;
}

export class Transition<T> {
  protected _currentState: ITransitionConfig<T> | null = null;
  protected _observer: TimeObserver<ITimeEvent> | null = null;

  public player = new Player();

  protected _transitionToState(config: ITransitionConfig<T>) {
    const lastState = this._currentState;

    this._currentState = config;

    if (this.player.animation == null || lastState == null) {
      this.player.animation = config.animation.clone();
    } else {
      const remainingDuration = (1 - this.player.time) * lastState.duration;
      const extendedDuration = config.transitionDuration - remainingDuration;

      const from = new ExtendedAnimation(
        this.player.animation,
        this.player.duration,
        this.player.time,
        this.player.state,
        extendedDuration
      );

      this.player.animation = new BlendedAnimation(
        from,
        config.animation.clone(),
        easings[config.transitionEasing]
      );
    }

    this.player.seek(0);
    this.player.duration = config.transitionDuration;
    this.player.iterations = 0;
    this.player.repeat = Infinity;

    this._observer?.dispose();
    this._observer = this.player.observeTimeOnce(1, () => {
      this.player.animation = config.animation.clone();
      this.player.duration = config.duration;
      this.player.repeat = config.iterationCount;
    });

    return this;
  }

  execute(state: ITransitionConfig<T>) {
    this._transitionToState(state);
    this.player.play();
    return this;
  }

  dispose() {
    this.player.dispose();
  }
}
