import Timeline from "./Timeline.js";
import Animation from "./Animation.js";
import easings from "./easings.js";

export default class BlendedTimeline extends Timeline {
  constructor(fromTimeline, toTimeline, easing) {
    const fromAnimations = fromTimeline.getCurrentValues();
    const toAnimations = toTimeline.getCurrentValues();

    // TODO: transform the to animations using controls.

    const animations = Object.keys(fromAnimations)
      .map((name) => {
        const fromAnimation = fromAnimations[name];
        const toAnimation = toAnimations[name];

        return Object.keys(fromAnimation).map((property) => {
          const from = fromAnimation[property];
          const to = toAnimation[property];

          return new Animation({
            name,
            property,
            startAt: 0,
            endAt: 1,
            from,
            to,
            controls: [],
            easing: easing || easings.linear,
          });
        });
      })
      .flat();

    super(animations);

    this.fromTimeline = fromTimeline;
    this.toTimeline = toTimeline;
  }

  update(time) {
    this.fromTimeline.update(time);
    this.toTimeline.update(time);

    super.update(time);

  }
}
