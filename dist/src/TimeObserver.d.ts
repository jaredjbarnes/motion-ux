import Observer, { IEvent } from "./Observer";
export interface ITimeEvent extends IEvent {
    time: number;
    lastTime: number;
}
export default class TimeObserver<TEvent extends ITimeEvent> extends Observer<TEvent> {
    time: any;
    constructor(time: number, callback: (event: TEvent) => void, unbind: () => void);
    notify(event: TEvent): void;
}
