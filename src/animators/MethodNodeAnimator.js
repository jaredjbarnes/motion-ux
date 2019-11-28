import ValuesNodeAnimator from "./ValuesNodeAnimator.js";

export default class MethodNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createArgs();
    this.createAnimators();
  }

  createArgs() {
    this.args = this.options.controls.map(node => {
      return node.children
        .find(node => node.name === "arguments")
        .children.filter(node => node.name === "values");
    });
  }

  createAnimators() {
    this.animators = this.args[0].map((_, index) => {
      const controls = this.args.map(arg => {
        return arg[index];
      });

      return new ValuesNodeAnimator({
        ...this.options,
        controls: controls
      });
    });
  }

  render(progress) {
    const methodName = this.getMethodName();
    const args = this.getArgs(progress);

    return `${methodName}(${args})`;
  }

  getArgs(progress) {
    return this.animators.map(animator => animator.render(progress)).join(", ");
  }

  getMethodName() {
    return this.options.controls[0].children.find(node => node.name === "name")
      .value;
  }
}
