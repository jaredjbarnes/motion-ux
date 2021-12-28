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


export interface ILoopTransitionState<T> {
  type: "loop",
  easing: keyof typeof easings;
  iterationCount: number; //Default Infinity
  duration: number;
  loop: IAnimatedProperties<T>;
}

export interface IControlledTransitionState<T> {
  type: "controlled"
  easing: keyof typeof easings;
  enter: IAnimatedProperties<T>;
  leave: IAnimatedProperties<T>;
  enterDuration: number;
  leaveDuration: number;
}

export interface IValuesTransitionState<T> {
  type: "values",
  duration: number;
  easing: keyof typeof easings;
  values: IAnimatedProperties<T>;
}

const keyframesGenerator = new KeyframesGenerator();
export class Transition<T> {
  protected _currentState: ILoopTransitionState<T> | IControlledTransitionState<T> | null = null;
  protected _observer: TimeObserver<ITimeEvent> | null = null;

  public player = new Player();

  protected _normalizeState(
    state: ITransitionState<T>
  ): ILoopTransitionState<T> | IControlledTransitionState<T> {
    if (state.type === "values") {
      const { values, duration, easing } = state;
      return {
        easing,
        type: "controlled",
        enter: values,
        leave: values,
        enterDuration: duration,
        leaveDuration: duration
      };
    } else if (state.type === "loop") {
      return state;
    } else {
      return state;
    }
  }

  protected _transitionToState(state: ITransitionState<T>) {
    state = this._normalizeState(state);
    const lastState = this._currentState;
    this._currentState = state;

    const keyframes = keyframesGenerator.generate(
      state.type === "controlled" ? state.enter : state.loop
    );
    const animation = new Animation("enter", keyframes);

    if (this.player.animation == null) {
      this.player.animation = animation;
    }

    if (lastState != null) {
      if (lastState.type === "loop" || this.player.state !== 0) {
        const lastDuration = lastState.type === "loop" ? lastState.duration : lastState.enterDuration;
        const newDuration = state.type === "loop" ? state.duration : state.enterDuration;
        const remainingDuration = (1 - this.player.time) * lastDuration;
        const extendedDuration = Math.max(newDuration - remainingDuration, 0);

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
          easings[state.easing]
        );
      } else if (lastState.type === "controlled") {
        const leaveAnimation = new Animation(
          "leave",
          keyframesGenerator.generate(lastState.leave)
        );

        this.player.animation = new BlendedAnimation(
          leaveAnimation,
          animation,
          easings[state.easing]
        );
      }
    }

    this.player.seek(0);
    this.player.duration = state.type === "loop" ? state.duration : state.enterDuration;
    this.player.iterations = 0;
    this.player.repeat = 1;

    this._observer?.dispose();
    this._observer = this.player.observeTimeOnce(1, () => {
      if (state.type === "loop") {
        this.player.animation = animation.clone();
        this.player.duration = state.duration;
        this.player.repeat = state.iterationCount;
      }
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
