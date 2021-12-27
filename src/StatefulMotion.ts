import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionState, Transition } from "./Transition";
import KeyframesGenerator from "./KeyframesGenerator";

export type IMotionState<T> = ITransitionState<T> & {
  segueTo: string;
};

export interface IMotionStates<T, TProps = unknown> {
  [key: string]: IMotionState<T> | ((props: TProps) => IMotionState<T>);
}

const keyframeGenerator = new KeyframesGenerator();

export default class StatefulMotion<T, TProps = unknown> extends Transition<T> {
  protected _currentStateName: string | null = null;
  protected _states: IMotionStates<T, TProps> = {};
  protected _segueObserver: TimeObserver<ITimeEvent> | null = null;

  addState(name: string, state: IMotionState<T>) {
    this._states[name] = state;
  }

  addStates(states: IMotionStates<T, TProps>) {
    this._states = states;
  }

  removeState(name: string, state: IMotionState<T>) {
    delete this._states[name];
  }

  removeAllStates() {
    this._states = {};
  }

  private isFallThrough(name: string, props: TProps) {
    if (this._currentStateName == null) {
      return false;
    }

    const allFallThroughStates = this.getFallThrough(name, props, []);
    return allFallThroughStates.includes(this._currentStateName);
  }

  private getFallThrough(name: string, props: TProps, stack: string[]) {
    const state = this.getState(name, props)

    if (state != null && typeof state.segueTo === "string") {
      stack.push(state.segueTo);

      this.getFallThrough(state.segueTo, props, stack);
    }

    return stack;
  }

  private getState(name: string, props: TProps) {
    const stateRef = this._states[name];
    if (typeof stateRef === "function") {
      return stateRef(props);
    } else {
      return stateRef;
    }
  }

  changeState(name: string, props: TProps) {
    const state = this.getState(name, props)

    if (
      this.isFallThrough(name, props) ||
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
        this.changeState(state.segueTo, props);
      }
    });

    this.player.play();
    return this;
  }
}
