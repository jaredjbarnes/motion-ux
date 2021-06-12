export interface IEvent {
    type: string;
}
export default class Observer<TEvent extends IEvent> {
    protected type: any;
    protected callback: any;
    protected unbind: any;
    protected state: any;
    constructor(type: string, callback: (event: TEvent) => void, unbind: () => void);
    notify(event: TEvent): void;
    stop(): void;
    start(): void;
    dispose(): void;
}
