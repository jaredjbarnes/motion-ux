import ExtendedAnimation from "./ExtendedAnimation";
import IAnimation from "./IAnimation";
import Player, { PlayerState, RepeatDirection } from "./Player";
import BlendedAnimation from "./BlendedAnimation";
import { EasingFunction } from "./easings";

export default class Motion<T> {
    protected player = new Player();

    segueTo(animation: IAnimation<T>, easing?: EasingFunction) {
        this.player.repeat = 1;
        this.player.time = 0;

        if (this.player.animation == null || this.player.state != PlayerState.FORWARD) {
            this.player.animation = animation;
        } else {
            const currentAnimation = this.player.animation;
            const remainingDuration = animation.duration = currentAnimation.duration;

            let fromAnimation: IAnimation<T>;

            if (remainingDuration > 0) {
                fromAnimation = new ExtendedAnimation(currentAnimation, this.player.state, remainingDuration);
            } else {
                fromAnimation = currentAnimation;
            }

            this.player.animation = new BlendedAnimation(fromAnimation, animation, easing);

            this.player.observeTimeOnce(1, () => {
                this.player.animation = null;
            });
        }
        this.player.play();
    }

    segueToLoop(animation: IAnimation<T>, easing?: EasingFunction) {
        this.player.repeat = Infinity;
        this.player.repeatDirection = RepeatDirection.DEFAULT;

        if (this.player.animation == null || this.player.state != PlayerState.FORWARD) {
            this.player.animation = animation;
        } else {
            const currentAnimation = this.player.animation;
            const remainingDuration = animation.duration = currentAnimation.duration;

            let fromAnimation: IAnimation<T>;

            if (remainingDuration > 0) {
                fromAnimation = new ExtendedAnimation(currentAnimation, this.player.state, remainingDuration);
            } else {
                fromAnimation = currentAnimation;
            }

            this.player.animation = new BlendedAnimation(fromAnimation, animation, easing);

            this.player.observeTimeOnce(1, () => {
                this.player.animation = animation;
            });
        }
        this.player.play();
    }

    stop() {
        this.player.stop();
    }

    play() {
        this.player.play();
    }
}