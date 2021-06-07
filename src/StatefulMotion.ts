import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
import ExtendedAnimation from "./ExtendedAnimation";
import BlendedAnimation from "./BlendedAnimation";
import TimeObserver, { ITimeEvent } from "./TimeObserver";

export interface IState<T> {
  animation: IAnimation<T>;
  duration: number;
  iterationCount: number; // Defaults to 1
  transitionDuration: number; // Defaults to the duration of the animation
  transitionEasing: keyof typeof easings; // Defaults to linear
  segueTo?: string;
}

export default class StatefulMotion<T> {
  private currentState: string | null = null;
  private states: { [key: string]: IState<T> } = {};
  private observer: TimeObserver<ITimeEvent> | null = null;
  private segueObserver: TimeObserver<ITimeEvent> | null = null;

  public player = new Player();

  registerState(name: string, state: IState<T>) {
    this.states[name] = state;
  }

  registerStates(states: { [key: string]: IState<T> }) {
    Object.keys(states).forEach((name) =>
      this.registerState(name, states[name])
    );
  }

  changeState(name: string) {
    const state = this.states[name];

    if (state == null || this.currentState === name) {
      return this;
    }

    this.currentState = name;
    this.observer?.dispose();
    this.segueObserver?.dispose();

    if (this.player.animation == null) {
      this.player.animation = state.animation.clone();
    } else {
      const remainingDuration =
        (1 - this.player.time) * this.states[this.currentState].duration;
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
        state.animation.clone(),
        easings[state.transitionEasing]
      );
    }

    this.player.seek(0);
    this.player.duration = state.transitionDuration;
    this.player.iterations = 0;
    this.player.repeat = Infinity;

    this.observer = this.player.observeTimeOnce(1, () => {
      this.player.animation = state.animation.clone();
      this.player.duration = state.duration;
      this.player.repeat = state.iterationCount;
    });

    this.segueObserver = this.player.observeTime(1, () => {
      if (
        this.player.iterations >= state.iterationCount &&
        typeof state.segueTo === "string" &&
        this.states[state.segueTo]
      ) {
        this.changeState(state.segueTo);
      }
    });

    this.player.play();
    return this;
  }
}
