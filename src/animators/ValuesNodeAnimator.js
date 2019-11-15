import NumberNodeAnimator from "./NumberNodeAnimator.js";
import HexNodeAnimator from "./HexNodeAnimator.js";
import UnitNodeAnimator from "./UnitNodeAnimator.js";
import MethodNodeAnimator from "./MethodNodeAnimator.js";
import NameNodeAnimator from "./NameNodeAnimator.js";

export default class ValuesNodeAnimator {
  constructor(options) {
    this.options = options;

    this.nameToAnimatorMap = {
      number: NumberNodeAnimator,
      unit: UnitNodeAnimator,
      method: MethodNodeAnimator,
      name: NameNodeAnimator,
      hex: HexNodeAnimator
    };

    this.normalizeNodes();
    this.createAnimators();
  }

  createAnimators() {
    const fromNode = this.options.fromNode;
    const toNode = this.options.toNode;

    this.animators = fromNode.children.map((from, index) => {
      const to = toNode.children[index];

      const options = {
        startAt: this.options.startAt,
        endAt: this.options.endAt,
        fromNode: from,
        toNode: to,
        easing: this.options.easing
      };
      
      return new this.nameToAnimatorMap[from.name](options);
    });
  }

  normalizeNodes() {
    this.options.fromNode.children = this.options.fromNode.children.filter(
      node => node.name != "spaces"
    );

    this.options.toNode.children = this.options.toNode.children.filter(
      node => node.name != "spaces"
    );
  }

  render(progress) {
    return this.animators.map(animator => animator.render(progress)).join(" ");
  }
}
