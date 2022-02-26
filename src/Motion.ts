import IAnimation from "./IAnimation";
import Player from "./Player";

export default class Motion<T> {
    animation: IAnimation<T>;
    player = new Player();

    segueTo() { }

    segueToLoop() { }
}