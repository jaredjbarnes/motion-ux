const states = {
  ACTIVE: 1,
  STOPPED: 0,
  DISPOSED: -1,
};

export interface IEvent {
  type: string;
}

export default class Observer<TEvent extends IEvent> {
  protected type: any;
  protected callback: any;
  protected unbind: any;
  protected state: any;

  constructor(
    type: string,
    callback: (event: TEvent) => void,
    unbind: () => void
  ) {
    this.type = type;
    this.callback = callback;
    this.unbind = unbind;
    this.state = states.ACTIVE;
  }

  notify(event: TEvent) {
    if (event.type === this.type) {
      this.callback(event);
    }
  }

  stop() {
    if (this.state === states.ACTIVE) {
      this.state = states.STOPPED;
    }
  }

  start() {
    if (this.state !== states.DISPOSED) {
      this.state = states.ACTIVE;
    }
  }

  dispose() {
    this.state = states.DISPOSED;
    this.unbind();
  }
}
