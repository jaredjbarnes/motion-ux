import ExtendedAnimation from "./ExtendedAnimation";
import IAnimation from "./IAnimation";
import Player, { RepeatDirection } from "./Player";
import BlendedAnimation from "./BlendedAnimation";
import { EasingFunction } from "./easings";

export default class Motion<T> {
    protected player = new Player();

    constructor(render: (animation: IAnimation<T>) => void) {
        this.player.render = render;
    }

    segueTo(animation: IAnimation<T>, easing?: EasingFunction) {
        this.player.repeat = 1;

        if (this.player.animation == null) {
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
                this.player.stop();
                this.player.animation = animation;
            });

            this.player.time = 0;
            this.player.play();
        }
    }

    segueToLoop(animation: IAnimation<T>, easing?: EasingFunction) {
        this.player.repeat = Infinity;
        this.player.repeatDirection = RepeatDirection.DEFAULT;

        if (this.player.animation == null) {
            this.player.animation = animation;
        } else {
            const currentAnimation = this.player.animation;
            const extendDurationBy = animation.duration - (currentAnimation.duration - this.player.time);

            let fromAnimation: IAnimation<T>;

            if (extendDurationBy > 0) {
                fromAnimation = new ExtendedAnimation(currentAnimation, this.player.state, extendDurationBy);
            } else {
                fromAnimation = currentAnimation;
            }

            this.player.animation = new BlendedAnimation(fromAnimation, animation, easing);

            this.player.observeTimeOnce(1, () => {
                this.player.animation = animation;
            });
        }
        this.player.time = 0;
        this.player.play();
    }

    stop() {
        this.player.stop();
    }

    play() {
        this.player.play();
    }
}