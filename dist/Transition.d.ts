import Player from "./Player";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { IAnimatedProperties } from "./KeyframesGenerator";
export declare type Easings = keyof typeof easings;
export declare type ITransitionAnimation<T> = {
    keyframes: IAnimatedProperties<T>;
    duration: number;
    easing: Easings;
};
export declare type ITransitionAnimationLoop<T> = ITransitionAnimation<T> & {
    iterationCount: number;
};
export declare type ITransitionProperties<T> = {
    [P in keyof T]: T[P];
};
export declare type IValuesTransitionState<T> = {
    "@values": IAnimatedProperties<T>;
    "@loop": never;
    "@enter"?: ITransitionAnimation<T>;
    "@leave"?: ITransitionAnimation<T>;
};
export declare type ILoopTransitionState<T> = {
    "@values": never;
    "@loop": ITransitionAnimationLoop<T>;
    "@enter"?: ITransitionAnimation<T>;
    "@leave"?: ITransitionAnimation<T>;
};
export declare type ITransitionState<T> = IValuesTransitionState<T> | ILoopTransitionState<T>;
export declare class Transition<T> {
    protected _currentState: ITransitionState<T> | null;
    protected _currentDuration: number;
    protected _currentEasing: keyof typeof easings;
    protected _observer: TimeObserver<ITimeEvent> | null;
    player: Player<any>;
    protected _transitionToState(state: ITransitionState<T>, duration?: number, easing?: Easings): this;
    private isActivelyMoving;
    private isLoop;
    execute(state: ITransitionState<T>): this;
    dispose(): void;
}
