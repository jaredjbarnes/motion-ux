import IAnimation from "./IAnimation";
import Player from "./Player";

export default class Motion<T> {
    animation: IAnimation<T> | null;
    player = new Player();

    segueTo(animation: IAnimation<T>) {
        if (this.animation == null) {

        } else {

        }
    }

    segueToLoop() {

    }
}