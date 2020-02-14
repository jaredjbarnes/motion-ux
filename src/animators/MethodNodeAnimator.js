import ValuesNodeAnimator from "./ValuesNodeAnimator.js";

export default class MethodNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createArgs();
    this.createAnimators();
    this.methodName = this.getMethodName();

    // The nodes become quite the memory hogs, so we need to remove references.
    this.options.controls.length = 0;
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

  getMethodName() {
    return this.options.controls[0].children.find(node => node.name === "name")
      .value;
  }

  render(progress) {
    const methodName = this.methodName;
    const args = this.getArgs(progress);

    return `${methodName}(${args})`;
  }

  getArgs(progress) {
    return this.animators.map(animator => animator.render(progress)).join(", ");
  }
}
