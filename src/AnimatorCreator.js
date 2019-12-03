import ValuesNodeAnimator from "./animators/ValuesNodeAnimator.js";
import values from "./patterns/values.js";
import { Cursor } from "clarity-pattern-parser";
import TimelineOption from "./TimelineOption.js";

export default class AnimatorCreator {
  constructor(animationOptions) {
    this.animationOptions = animationOptions;

    this._assertAnimationOptions();
    this._convertAnimationsToTimelineOptions();
    this._sortTimelineOptions();
    this._createAnimators();
  }

  _assertAnimationOptions() {
    if (!Array.isArray(this.animationOptions)) {
      throw new Error("Expected animations to be an array.");
    }
  }

  _convertAnimationsToTimelineOptions() {
    this.timelineOptions = this.animationOptions.map(
      animationOption => new TimelineOption(animationOption)
    );
  }

  _sortTimelineOptions() {
    this.timelineOptions.sort((a, b) => {
      return a.startAt - b.startAt;
    });
  }

  _createAnimators() {
    this.animators = this.timelineOptions.map(options => {
      let points = [options.from, ...options.controls, options.to];
      let controls;

      controls = points.map(point => {
        const cursor = new Cursor(point);
        const node = values.parse(cursor);

        if (cursor.hasUnresolvedError()) {
          throw new Error(
            `Parse Error: could not parse css ${options.controls}`
          );
        }

        return node;
      });

      return new ValuesNodeAnimator({
        ...options,
        controls
      });
    });
  }

  getAnimators() {
    return this.animators;
  }
}
