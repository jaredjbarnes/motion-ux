import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionConfig, Transition } from "./Transition";
import KeyframesGenerator, { IAnimatedProperties } from "./KeyframesGenerator";
import Animation from "./Animation";
import easings from "./easings";

export interface StatefulMotionConfig<T> {
  [key: string]: IMotionState<T>;
}

export type IMotionState<T> =
  | IValuesMotionState<T>
  | IControlledMotionState<T>
  | ILoopMotionState<T>;

export interface IMotionStateBase {
  transitionDuration: number;
  transitionEasing: keyof typeof easings;
  segueTo: string;
}

export interface ILoopMotionState<T> extends IMotionStateBase {
  iterationCount: number; //Default Infinity
  duration: number;
  loop: IAnimatedProperties<T>;
  enterDuration: never;
  leaveDuration: never;
  enter: never;
  leave: never;
  values: never;
}

export interface IControlledMotionState<T> extends IMotionStateBase {
  enter: IAnimatedProperties<T>;
  leave: IAnimatedProperties<T>;
  enterDuration: number;
  leaveDuration: number;
  duration: never;
  loop: never;
  iterationCount: never;
  values: never;
}

export interface IValuesMotionState<T> extends IMotionStateBase {
  values: IAnimatedProperties<T>;
  enter: never;
  leave: never;
  enterDuration: never;
  leaveDuration: never;
  loop: never;
  duration: never;
  iterationCount: never;
}

const keyframeGenerator = new KeyframesGenerator();

export default class StatefulMotion<T> extends Transition<T> {
  protected _currentStateName: string | null = null;
  protected _states: { [key: string]: ITransitionConfig<T> } = {};
  protected _segueObserver: TimeObserver<ITimeEvent> | null = null;

  addState(name: string, state: IMotionState<T>) {
    this._states[name] = {
      animation: new Animation(name, keyframeGenerator.generate(state)),
      duration: state.duration != null ? state.duration : 0,
      segueTo: state.segueTo,
      transitionDuration: state.transitionDuration,
      iterationCount: state.iterationCount != null ? state.iterationCount : 1,
      transitionEasing: state.transitionEasing,
    };
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
