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
      hex: HexNodeAnimator,
      values: ValuesNodeAnimator
    };

    this.createAnimators();
    
    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
  }

  createAnimators() {
    this.animators = this.options.controls[0].children.map((node, index) => {
      const controls = this.options.controls.map(node => {
        return node.children[index];
      });

      const options = {
        ...this.options,
        controls
      };

      return new this.nameToAnimatorMap[node.name](options);
    });
  }

  render(progress) {
    return this.animators.map(animator => animator.render(progress)).join(" ");
  }
}
