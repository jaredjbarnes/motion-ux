import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionState, KeyframeTransition } from "./KeyframeTransition";
import { IAnimationKeyframes } from "./KeyframesGenerator";
import CssKeyframe from "./CssKeyframe";
import Animation from "./Animation";

export interface IMotionState<T> {
  animation: IAnimationKeyframes;
  duration: number;
  iterationCount: number; // Defaults to 1
  transitionDuration: number; // Defaults to the duration of the animation
  transitionEasing: keyof typeof easings; // Defaults to linear
  segueTo?: string;
}

export interface StatefulMotionConfig<T> {
  [key: string]: IMotionState<T>;
}

export default class StatefulMotion<T> extends KeyframeTransition<T> {
  protected _currentStateName: string | null = null;
  protected _states: { [key: string]: ITransitionState<T> } = {};
  protected _segueObserver: TimeObserver<ITimeEvent> | null = null;

  addState(name: string, state: ITransitionState<T>) {
    this._states[name] = state;
  }

  addStates(states: { [key: string]: ITransitionState<T> }) {
    Object.keys(states).forEach((name) => this.addState(name, states[name]));
  }

  removeState(name: string, state: ITransitionState<T>) {
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

  static createStatefulAnimation<T>(config: StatefulMotionConfig<T>) {
    const statefulMotion = new StatefulMotion<(string | number)[]>();

    Object.keys(config).forEach((name) => {
      const { animation: keyframes, ...props } = config[name];
      const animation = new Animation(
        name,
        CssKeyframe.createKeyframes(keyframes)
      );

      statefulMotion.addState(name, {
        animation,
        ...props,
      });
    });

    return statefulMotion;
  }
}
