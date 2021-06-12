import { LitElement } from "lit";
import Animation from "../src/Animation";
export declare class MuxPlayer extends LitElement {
    private _player;
    private _animated;
    private _animation;
    static styles: import("lit").CSSResultGroup;
    get animation(): Animation<any>;
    set animation(value: Animation<any>);
    private _animateMotion;
    private _renderDiv;
    private _updateAnimatedDiv;
    render(): import("lit-html").TemplateResult<1>;
    disconnectedCallback(): void;
}
