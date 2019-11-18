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
      let fromNode;
      let toNode;

      try {
        fromNode = values.parse(new Cursor(options.from));
        toNode = values.parse(new Cursor(options.to));
      } catch (error) {
        throw new Error(
          `Parse Error: could not parse css ${options.to}, or ${options.from}`
        );
      }

      return new ValuesNodeAnimator({
        ...options,
        fromNode,
        toNode
      });
    });
  }

  getAnimators() {
    return this.animators;
  }
}
