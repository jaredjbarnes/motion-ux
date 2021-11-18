import Player from "./Player";
import Animation from "./Animation";
import easings from "./easings";
import ExtendedAnimation from "./ExtendedAnimation";
import BlendedAnimation from "./BlendedAnimation";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import KeyframesGenerator, { IAnimatedProperties } from "./KeyframesGenerator";

export type ITransitionState<T> =
  | IValuesTransitionState<T>
  | IControlledTransitionState<T>
  | ILoopTransitionState<T>;

export interface ITransitionStateBase {
  transitionDuration: number;
  transitionEasing: keyof typeof easings;
}

export interface ILoopTransitionState<T> extends ITransitionStateBase {
  iterationCount: number; //Default Infinity
  duration: number;
  loop: IAnimatedProperties<T>;
  enterDuration: never;
  leaveDuration: never;
  enter: never;
  leave: never;
  values: never;
}

export interface IControlledTransitionState<T> extends ITransitionStateBase {
  enter: IAnimatedProperties<T>;
  leave: IAnimatedProperties<T>;
  enterDuration: number;
  leaveDuration: number;
  duration: never;
  loop: never;
  iterationCount: never;
  values: never;
}

export interface IValuesTransitionState<T> extends ITransitionStateBase {
  values: IAnimatedProperties<T>;
  enter: never;
  leave: never;
  enterDuration: never;
  leaveDuration: never;
  loop: never;
  duration: never;
  iterationCount: never;
}

const keyframesGenerator = new KeyframesGenerator();
export class Transition<T> {
  protected _currentState: ITransitionState<T> | null = null;
  protected _observer: TimeObserver<ITimeEvent> | null = null;

  public player = new Player();

  protected _normalizeState(
    state: ITransitionState<T>
  ): ILoopTransitionState<T> | IControlledTransitionState<T> {
    if (state.values != null) {
      const { values, ...rest } = state;
      return {
        ...rest,
        enter: values,
        leave: values,
      } as IControlledTransitionState<T>;
    } else if (state.loop != null) {
      return state as ILoopTransitionState<T>;
    } else {
      return state as IControlledTransitionState<T>;
    }
  }

  protected _transitionToState(state: ITransitionState<T>) {
    state = this._normalizeState(state);
    const lastState = this._currentState;
    this._currentState = state;

    const keyframes = keyframesGenerator.generate(
      state.enter != null ? state.enter : state.loop
    );
    const animation = new Animation("enter", keyframes);

    if (this.player.animation == null) {
      this.player.animation = animation;
    }

    if (lastState != null) {
      if (lastState.loop != null || this.player.state !== 0) {
        const remainingDuration = (1 - this.player.time) * lastState.duration;
        const extendedDuration = state.transitionDuration - remainingDuration;

        const from = new ExtendedAnimation(
          this.player.animation,
          this.player.duration,
          this.player.time,
          this.player.state,
          extendedDuration
        );

        this.player.animation = new BlendedAnimation(
          from,
          animation,
          easings[state.transitionEasing]
        );
      } else {
        const leaveAnimation = new Animation(
          "leave",
          keyframesGenerator.generate(state.leave)
        );

        this.player.animation = new BlendedAnimation(
          leaveAnimation,
          animation,
          easings[state.transitionEasing]
        );
      }
    }

    this.player.seek(0);
    this.player.duration = state.transitionDuration;
    this.player.iterations = 0;
    this.player.repeat = 1;

    this._observer?.dispose();
    this._observer = this.player.observeTimeOnce(1, () => {
      this.player.animation = animation.clone();
      this.player.duration = state.duration;
      this.player.repeat = state.iterationCount;
    });

    return this;
  }

  execute(state: ITransitionState<T>) {
    this._transitionToState(state);
    this.player.play();
    return this;
  }

  dispose() {
    this.player.dispose();
  }
}
