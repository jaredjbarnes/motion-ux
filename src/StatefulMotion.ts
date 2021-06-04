import Player from "./Player";
import IAnimation from "./IAnimation";
import easings from "./easings";
import ExtendedAnimation from "./ExtendedAnimation";
import BlendedAnimation from "./BlendedAnimation";
import TimeObserver, { ITimeEvent } from "./TimeObserver";


export interface IState<T> {
  animation: IAnimation<T>;
  duration: number;
  iterationCount: number; // Defaults to 1
  transitionDuration: number; // Defaults to the duration of the animation
  transitionEasing: keyof typeof easings; // Defaults to linear
}

export default class StatefulMotion<T> {
  private states: { [key: string]: IState<T> };
  private observer: TimeObserver<ITimeEvent>;

  public player: Player = new Player();

  registerState(name: string, state: IState<T>) {
    this.states[name] = state;
  }

  registerStates(states: { [key: string]: IState<T> }) {
    Object.keys(states).forEach((name) =>
      this.registerState(name, states[name])
    );
  }

  changeState(name: string) {
    const state = this.states[name];

    if (state == null) {
      return this;
    }

    if (this.player.animation == null) {
      this.player.animation = state.animation;
    } else {
      this.observer.dispose();

      const previousAnimation = this.player.animation;
      const remainingTime = 1 - this.player.time;
      const difference = state.transitionDuration - remainingTime;
      let from: IAnimation<T>;

      if (difference > 0) {
        from = new ExtendedAnimation(this.player, difference);
      } else {
        from = previousAnimation;
      }

      this.player.animation = new BlendedAnimation(
        from,
        state.animation,
        easings[state.transitionEasing]
      );
    }

    this.observer = this.player.observeTimeOnce(1, ()=>{
      this.player.animation = state.animation;
      this.player.duration = state.duration;
      this.player.repeat = state.iterationCount;
      this.player.iterations = 1;
    });

    this.player.seek(0);
    this.player.play();

    return this;
  }
}
