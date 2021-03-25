import Observer, { IEvent } from "./Observer";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
export default class Observable {
    private observers;
    constructor();
    observeTime<TEvent extends ITimeEvent>(time: number, callback: (event: TEvent) => void): TimeObserver<TEvent>;
    observe<TEvent extends IEvent>(type: string, callback: (event: TEvent) => void): Observer<TEvent>;
    notify<TEvent extends IEvent>(event: TEvent): void;
    dispose(): void;
}
