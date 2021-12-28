import TimeObserver, { ITimeEvent } from "./TimeObserver";
import { ITransitionState, Transition } from "./Transition";
export declare type IMotionState<T> = ITransitionState<T> & {
    segueTo?: string;
};
export interface IMotionStates<T, TProps = unknown> {
    [key: string]: IMotionState<T> | ((props: TProps) => IMotionState<T>);
}
export default class StatefulMotion<T, TProps = unknown> extends Transition<T> {
    protected _currentStateName: string | null;
    protected _states: IMotionStates<T, TProps>;
    protected _segueObserver: TimeObserver<ITimeEvent> | null;
    addState(name: string, state: IMotionState<T>): void;
    addStates(states: IMotionStates<T, TProps>): void;
    removeState(name: string, state: IMotionState<T>): void;
    removeAllStates(): void;
    private isFallThrough;
    private getFallThrough;
    private getState;
    changeState(name: string, props: TProps): this;
}
