import Observable from "./Observable";
import { IClock } from "./IClock";
import Animation from "./Animation";
export declare type RepeatDirection = 0 | 1;
export declare type PlayerState = 1 | -1 | 0;
export default class Player extends Observable {
    private _timeScale;
    private _time;
    private _step;
    private _duration;
    private _lastTimestamp;
    private _iterations;
    private _repeat;
    private _repeatDirection;
    private _animation;
    private _clock;
    private _state;
    private _render;
    private _delay;
    constructor();
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
    get animation(): Animation<any> | null;
    set animation(animation: Animation<any> | null);
    get render(): (animation: Animation<any>) => void;
    set render(render: (animation: Animation<any>) => void);
    get iterations(): number;
    get clock(): IClock;
    set clock(value: IClock);
    get delay(): number;
    set delay(value: number);
    private tick;
    private stepForward;
    private stepBackward;
    seek(time: number): this | undefined;
    stop(): this;
    play(): this;
    reverse(): this;
    dispose(): void;
    static get repeatDirections(): {
        DEFAULT: number;
        ALTERNATE: number;
    };
    static get states(): {
        FORWARD: number;
        REVERSE: number;
        STOPPED: number;
    };
}
