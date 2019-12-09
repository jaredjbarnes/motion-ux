import ValuesNodeAnimator from "./ValuesNodeAnimator.js";

export default class CssValueNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createAnimators();
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

      return new ValuesNodeAnimator(options);
    });
  }

  render(progress) {
    return this.animators.map(animator => animator.render(progress)).join(", ");
  }
}
