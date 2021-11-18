import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionState, Transition } from "./Transition";
export declare type IMotionState<T> = ITransitionState<T> & {
    segueTo: string;
};
export interface StatefulMotionConfig<T> {
    [key: string]: IMotionState<T>;
}
export default class StatefulMotion<T> extends Transition<T> {
    protected _currentStateName: string | null;
    protected _states: {
        [key: string]: IMotionState<T>;
    };
    protected _segueObserver: TimeObserver<ITimeEvent> | null;
    addState(name: string, state: IMotionState<T>): void;
    addStates(states: {
        [key: string]: IMotionState<T>;
    }): void;
    removeState(name: string, state: IMotionState<T>): void;
    removeAllStates(): void;
    private isFallThrough;
    private getFallThrough;
    changeState(name: string): this;
}
