import { IClock, TickCallback } from "./IClock";
export default class MockClock implements IClock {
    private requests;
    private time;
    constructor();
    register(callback: TickCallback): void;
    unregister(callback: TickCallback): void;
    now(): any;
    setTime(time: number): void;
    tick(time: number): void;
}
