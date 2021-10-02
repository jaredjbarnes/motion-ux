import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionState, KeyframeTransition } from "./KeyframeTransition";
import { IAnimationKeyframes } from "./KeyframesGenerator";
export interface IMotionState<T> {
    animation: IAnimationKeyframes;
    duration: number;
    iterationCount: number;
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
    segueTo?: string;
}
export interface StatefulMotionConfig<T> {
    [key: string]: IMotionState<T>;
}
export default class StatefulMotion<T> extends KeyframeTransition<T> {
    protected _currentStateName: string | null;
    protected _states: {
        [key: string]: ITransitionState<T>;
    };
    protected _segueObserver: TimeObserver<ITimeEvent> | null;
    addState(name: string, state: ITransitionState<T>): void;
    addStates(states: {
        [key: string]: ITransitionState<T>;
    }): void;
    removeState(name: string, state: ITransitionState<T>): void;
    removeAllStates(): void;
    private isFallThrough;
    private getFallThrough;
    changeState(name: string): this;
    static createStatefulAnimation<T>(config: StatefulMotionConfig<T>): StatefulMotion<(string | number)[]>;
}
