import Observer, { IEvent } from "./Observer";
import TimeObserver, { ITimeEvent } from "./TimeObserver";

export default class Observable {
  private observers: any;

  constructor() {
    this.observers = [];
  }

  observeTime<TEvent extends ITimeEvent>(
    time: number,
    callback: (event: TEvent) => void
  ) {
    const observer = new TimeObserver(time, callback, () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    });

    this.observers.push(observer);
    return observer;
  }

  observe<TEvent extends IEvent>(
    type: string,
    callback: (event: TEvent) => void
  ) {
    const observer = new Observer<TEvent>(type, callback, () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    });

    this.observers.push(observer);
    return observer;
  }

  notify<TEvent extends IEvent>(event: TEvent) {
    this.observers.forEach((observer: Observer<TEvent>) => {
      observer.notify(event);
    });
  }

  dispose() {
    this.observers = [];
  }
}
