import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
export interface IMotionState<T> {
    animation: IAnimation<T>;
    duration: number;
    iterationCount: number;
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
    segueTo?: string;
}
export declare class KeyframeTransition<T> {
    protected _currentState: IMotionState<T> | null;
    protected _observer: TimeObserver<ITimeEvent> | null;
    player: Player;
    protected _transitionToState(state: IMotionState<T>): this;
    transition(state: IMotionState<T>): this;
    dispose(): void;
}
