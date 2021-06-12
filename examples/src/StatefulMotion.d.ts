import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
export interface IState<T> {
    animation: IAnimation<T>;
    duration: number;
    iterationCount: number;
    transitionDuration: number;
    transitionEasing: keyof typeof easings;
    segueTo?: string;
}
export default class StatefulMotion<T> {
    private currentState;
    private states;
    private observer;
    private segueObserver;
    player: Player;
    registerState(name: string, state: IState<T>): void;
    registerStates(states: {
        [key: string]: IState<T>;
    }): void;
    private isFallThrough;
    private getFallThrough;
    changeState(name: string): this;
}
