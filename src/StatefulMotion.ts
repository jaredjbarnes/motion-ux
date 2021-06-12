import IAnimation from "./IAnimation";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { KeyframeTransition } from "./KeyframeTransition";

export interface IState<T> {
  animation: IAnimation<T>;
  duration: number;
  iterationCount: number; // Defaults to 1
  transitionDuration: number; // Defaults to the duration of the animation
  transitionEasing: keyof typeof easings; // Defaults to linear
  segueTo?: string;
}

export default class StatefulMotion<T> extends KeyframeTransition<T> {
  protected _currentStateName: string | null = null;
  protected _states: { [key: string]: IState<T> } = {};
  protected _segueObserver: TimeObserver<ITimeEvent> | null = null;

  registerState(name: string, state: IState<T>) {
    this._states[name] = state;
  }

  registerStates(states: { [key: string]: IState<T> }) {
    Object.keys(states).forEach((name) =>
      this.registerState(name, states[name])
    );
  }

  private isFallThrough(name: string) {
    if (this._currentStateName == null) {
      return false;
    }

    const allFallThroughStates = this.getFallThrough(name, []);
    return allFallThroughStates.includes(this._currentStateName);
  }

  private getFallThrough(name: string, stack: string[]) {
    const state = this._states[name];

    if (state != null && typeof state.segueTo === "string") {
      stack.push(state.segueTo);

      this.getFallThrough(state.segueTo, stack);
    }

    return stack;
  }

  changeState(name: string) {
    const state = this._states[name];

    if (
      this.isFallThrough(name) ||
      state == null ||
      this._currentStateName === name
    ) {
      return this;
    }

    this._currentStateName = name;
    this._transitionToState(state);

    this._segueObserver?.dispose();
    this._segueObserver = this.player.observeTime(1, () => {
      if (
        this.player.iterations >= state.iterationCount &&
        typeof state.segueTo === "string" &&
        this._states[state.segueTo]
      ) {
        this.changeState(state.segueTo);
      }
    });

    this.player.play();
    return this;
  }
}
