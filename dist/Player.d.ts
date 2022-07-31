import Observable from "./Observable";
import { IClock } from "./IClock";
export declare enum PlayerState {
    REVERSE = -1,
    STOPPED = 0,
    FORWARD = 1
}
export declare enum RepeatDirection {
    DEFAULT = 0,
    ALTERNATE = 1
}
export default class Player<T = any> extends Observable {
    private _timeScale;
    private _time;
    private _step;
    private _duration;
    private _lastTimestamp;
    private _iterations;
    private _repeat;
    private _repeatDirection;
    private _clock;
    private _state;
    private _render;
    constructor(clock?: IClock);
    get time(): number;
    set time(value: number);
    get timeScale(): number;
    set timeScale(value: number);
    get duration(): number;
    set duration(value: number);
    get repeat(): number;
    set repeat(value: number);
    get repeatDirection(): RepeatDirection;
    set repeatDirection(value: RepeatDirection);
    get state(): PlayerState;
    get render(): (time: number) => void;
    set render(render: (time: number) => void);
    get iterations(): number;
    set iterations(value: number);
    get clock(): IClock;
    set clock(value: IClock);
    private tick;
    private stepForward;
    private stepBackward;
    seek(time: number): this;
    stop(): this;
    play(): this;
    reverse(): this;
    dispose(): void;
}
