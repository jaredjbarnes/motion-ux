import Observer, { IEvent } from "./Observer";

export interface ITimeEvent extends IEvent {
    time: number;
    lastTime: number;
}

export default class TimeObserver<
  TEvent extends ITimeEvent
> extends Observer<TEvent> {
  public time: any;

  constructor(
    time: number,
    callback: (event: TEvent) => void,
    unbind: () => void
  ) {
    super("TIME_OBSERVER", callback, unbind);
    this.time = time;
  }

  notify(event: TEvent) {
    if (typeof event.lastTime === "number" && typeof event.time === "number") {
      const high = Math.max(event.time, event.lastTime);
      const low = Math.min(event.time, event.lastTime);

      if (this.time >= low && this.time <= high) {
        this.callback(event);
      }
    }
  }
}
