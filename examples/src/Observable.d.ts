import Observer, { IEvent } from "./Observer";
import TimeObserver, { ITimeEvent } from "./TimeObserver";
export default class Observable {
    private observers;
    constructor();
    observeTimeOnce<TEvent extends ITimeEvent>(time: number, callback: (event: TEvent) => void): TimeObserver<TEvent>;
    observeTime<TEvent extends ITimeEvent>(time: number, callback: (event: TEvent) => void): TimeObserver<TEvent>;
    observeOnce<TEvent extends IEvent>(type: string, callback: (event: IEvent) => void): Observer<IEvent>;
    observe<TEvent extends IEvent>(type: string, callback: (event: TEvent) => void): Observer<TEvent>;
    notify<TEvent extends IEvent>(event: TEvent): void;
    clearObservers(): void;
    dispose(): void;
}
