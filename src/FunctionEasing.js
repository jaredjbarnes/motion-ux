export default class FunctionEasing {
  constructor(func) {
    this.func = func;
    this.validateFunction();
  }

  valueAt(percentage) {
    return this.func(percentage);
  }

  validateFunction() {
    if (typeof this.func !== "function") {
      throw new Error("Function easing needs a function to work properly.");
    }
  }
}
