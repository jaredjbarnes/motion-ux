import ValuesNodeAnimator from "./ValuesNodeAnimator.js";

export default class MethodNodeAnimator {
  constructor(options) {
    this.options = options;
    this.createArgs();
    this.createAnimators();
  }

  createArgs() {
    this.fromArgs = this.options.fromNode.children
      .find(node => node.name === "arguments")
      .children.filter(node => node.name === "values");

    this.toArgs = this.options.toNode.children
      .find(node => node.name === "arguments")
      .children.filter(node => node.name === "values");
  }

  createAnimators() {
    this.animators = this.fromArgs.map((node, index) => {
      return new ValuesNodeAnimator({
        ...this.options,
        fromNode: node,
        toNode: this.toArgs[index]
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
    return this.options.fromNode.children.find(node => node.name === "name")
      .value;
  }
}
