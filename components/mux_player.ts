import { LitElement, css, html } from "lit";
import { ref } from "lit/directives/ref.js";
import { customElement, property } from "lit/decorators.js";
import { Player } from "../src";
import IAnimation from "../src/IAnimation";
import Animation from "../src/Animation";

const styles = css`
  div#container {
    display: grid;
    place-items: center;
    position: relative;
    min-height: 100px;
    cursor: pointer;
    border: 1px solid #ccc;
  }
  div#animated {
    width: 50px;
    height: 50px;
    background-color: #00b7ff;
  }
`;

@customElement("mux-player")
export class MuxPlayer extends LitElement {
  private _player = new Player();
  private _animated: HTMLDivElement | null = null;
  private _animation = new Animation("mux-player", []);

  static styles = styles;

  @property()
  get animation() {
    return this._animation;
  }

  set animation(value: Animation<any>) {
    this._animation = value;
    this._player.animation = value;
    this._player.render = this._renderDiv;
    this._player.seek(0);
  }

  private _animateMotion() {
    this._player.animation = this.animation;
    this._player.duration = 1000;
    this._player.seek(0);
    this._player.play();
    this._player.render = this._renderDiv;
    this._player.iterations = Infinity;
  }

  private _renderDiv = (animation: IAnimation<any>) => {
    const values = animation.currentValues;
    const div = this._animated;
    if (div == null) {
      return;
    }

    Object.keys(values).forEach((key) => {
      (div.style as any)[key] = values[key].join("");
    });
  };

  private _updateAnimatedDiv(div?: Element) {
    this._animated = (div as HTMLDivElement) || null;
    if (div != null) {
      this._player.seek(0);
    }
  }

  render() {
    return html`
      <div id="container" @click="${this._animateMotion}">
        <div id="animated" ${ref(this._updateAnimatedDiv)}></div>
      </div>
    `;
  }

  disconnectedCallback() {
    this._player.dispose();
  }
}
