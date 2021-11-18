import Player from "./Player";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { IAnimatedProperties } from "./KeyframesGenerator";
export declare type ITransitionState<T> = IValuesTransitionState<T> | IControlledTransitionState<T> | ILoopTransitionState<T>;
export interface ITransitionStateBase {
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
}
export interface ILoopTransitionState<T> extends ITransitionStateBase {
    iterationCount: number;
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
export declare class Transition<T> {
    protected _currentState: ITransitionState<T> | null;
    protected _observer: TimeObserver<ITimeEvent> | null;
    player: Player;
    protected _normalizeState(state: ITransitionState<T>): ILoopTransitionState<T> | IControlledTransitionState<T>;
    protected _transitionToState(state: ITransitionState<T>): this;
    execute(state: ITransitionState<T>): this;
    dispose(): void;
}
