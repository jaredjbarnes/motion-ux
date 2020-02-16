import ValuesNodeAnimator from "./ValuesNodeAnimator.js";

const findArguments = node => node.name === "arguments";
const filterValues = node => node.name === "values";
const findMethodName = node => node.name === "name";
const findArgs = node => {
  return node.children.find(findArguments).children.filter(filterValues);
};

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
    this.args = this.options.controls.map(findArgs);
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
    return this.options.controls[0].children.find(findMethodName).value;
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
