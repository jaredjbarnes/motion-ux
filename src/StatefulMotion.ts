import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionState, Transition } from "./Transition";
import KeyframesGenerator, { IAnimatedProperties } from "./KeyframesGenerator";

export type IMotionState<T> = ITransitionState<T> & {
  segueTo: string;
};

export interface StatefulMotionConfig<T> {
  [key: string]: IMotionState<T>;
}

const keyframeGenerator = new KeyframesGenerator();

export default class StatefulMotion<T> extends Transition<T> {
  protected _currentStateName: string | null = null;
  protected _states: { [key: string]: IMotionState<T> } = {};
  protected _segueObserver: TimeObserver<ITimeEvent> | null = null;

  addState(name: string, state: IMotionState<T>) {
    this._states[name] = state;
  }

  addStates(states: { [key: string]: IMotionState<T> }) {
    Object.keys(states).forEach((name) => this.addState(name, states[name]));
  }

  removeState(name: string, state: IMotionState<T>) {
    delete this._states[name];
  }

  removeAllStates() {
    this._states = {};
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
