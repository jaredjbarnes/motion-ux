import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
export interface ITransitionState<T> {
    animation: IAnimation<T>;
    duration: number;
    iterationCount: number;
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
    segueTo?: string;
}
export declare class KeyframeTransition<T> {
    protected _currentState: ITransitionState<T> | null;
    protected _observer: TimeObserver<ITimeEvent> | null;
    player: Player;
    protected _transitionToState(state: ITransitionState<T>): this;
    transition(state: ITransitionState<T>): this;
    dispose(): void;
}
