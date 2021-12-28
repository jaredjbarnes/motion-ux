import Player from "./Player";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { IAnimatedProperties } from "./KeyframesGenerator";
export declare type ITransitionState<T> = IValuesTransitionState<T> | IControlledTransitionState<T> | ILoopTransitionState<T>;
export interface ILoopTransitionState<T> {
    type: "loop";
    easing: keyof typeof easings;
    iterationCount: number;
    duration: number;
    loop: IAnimatedProperties<T>;
}
export interface IControlledTransitionState<T> {
    type: "controlled";
    easing: keyof typeof easings;
    enter: IAnimatedProperties<T>;
    leave: IAnimatedProperties<T>;
    enterDuration: number;
    leaveDuration: number;
}
export interface IValuesTransitionState<T> {
    type: "values";
    duration: number;
    easing: keyof typeof easings;
    values: IAnimatedProperties<T>;
}
export declare class Transition<T> {
    protected _currentState: ILoopTransitionState<T> | IControlledTransitionState<T> | null;
    protected _observer: TimeObserver<ITimeEvent> | null;
    player: Player;
    protected _normalizeState(state: ITransitionState<T>): ILoopTransitionState<T> | IControlledTransitionState<T>;
    protected _transitionToState(state: ITransitionState<T>): this;
    execute(state: ITransitionState<T>): this;
    dispose(): void;
}
