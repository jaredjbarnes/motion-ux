import IAnimation from "./IAnimation";
import easings from "./easings";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { KeyframeTransition } from "./KeyframeTransition";
export interface IState<T> {
    animation: IAnimation<T>;
    duration: number;
    iterationCount: number;
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
    segueTo?: string;
}
export default class StatefulMotion<T> extends KeyframeTransition<T> {
    protected _currentStateName: string | null;
    protected _states: {
        [key: string]: IState<T>;
    };
    protected _segueObserver: TimeObserver<ITimeEvent> | null;
    registerState(name: string, state: IState<T>): void;
    registerStates(states: {
        [key: string]: IState<T>;
    }): void;
    private isFallThrough;
    private getFallThrough;
    changeState(name: string): this;
}
