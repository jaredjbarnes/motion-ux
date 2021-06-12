import { IClock, TickCallback } from "./IClock";
export default class DefaultClock implements IClock {
    registeredCallbacks: Map<TickCallback, TickCallback>;
    animationFrame: any;
    constructor();
    _tick(): void;
    register(callback: TickCallback): void;
    unregister(callback: TickCallback): void;
    now(): number;
}
