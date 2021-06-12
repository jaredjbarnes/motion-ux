import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
export interface IState<T> {
    animation: IAnimation<T>;
    duration: number;
    iterationCount: number;
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
    segueTo?: string;
}
export declare class KeyframeTransition<T> {
    protected _currentState: IState<T> | null;
    protected _observer: TimeObserver<ITimeEvent> | null;
    player: Player;
    protected _transitionToState(state: IState<T>): this;
    transition(state: IState<T>): this;
}
