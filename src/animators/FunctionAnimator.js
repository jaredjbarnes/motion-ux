import ColorAnimator from "./ColorAnimator.js";
import AnimationOptions from "../AnimationOptions.js";
import UnitAnimator from "./UnitAnimator.js";
import UnitArrayAnimator from "./UnitArrayAnimator.js";

const functionRegEx = /(.*?)\((.+?)\)/g;

export default class FunctionAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.functions = null;
    this.unit = null;
    this.change = null;
    this.fromFunctions = null;
    this.toFunctions = null;

    this.parseFromFunctions();
    this.parseToFunctions();
    this.assertValues();
    this.assignAnimator();
  }

  parseFromFunctions() {
    let result;
    this.functions = {};

    functionRegEx.lastIndex = 0;
    while ((result = functionRegEx.exec(this.options.from))) {
      const functionName = result[1].trim();

      this.functions[functionName] = {
        fromValues: null,
        toValues: null,
        animators: null,
        values: []
      };

      this.functions[functionName].fromValues = result[2]
        .split(",")
        .map(value => value.trim());
    }
  }

  parseToFunctions() {
    let result;

    functionRegEx.lastIndex = 0;
    while ((result = functionRegEx.exec(this.options.to))) {
      const functionName = result[1].trim();
      const functionData = this.functions[functionName];

      if (functionData == null) {
        throw new Error(
          `Couldn't find corresponding from function with name: "${functionName}"`
        );
      }

      functionData.toValues = result[2].split(",").map(value => value.trim());
    }
  }

  assertValues() {
    Object.keys(this.functions).forEach(functionName => {
      const { toValues, fromValues } = this.functions[functionName];

      if (toValues.length !== fromValues.length) {
        throw new Error(
          "The 'from' arguments have a different length than the 'to' arguments."
        );
      }
    });
  }

  assignAnimator() {
    Object.keys(this.functions).forEach(functionName => {
      const functionData = this.functions[functionName];

      functionData.animators = functionData.fromValues.map(
        (fromValue, index) => {
          const toValue = functionData.toValues[index];

          if (fromValue == null || fromValue === "") {
            throw new Error(
              `Invalid function arguments: ${this.options.from}.`
            );
          }

          if (toValue == null || toValue === "") {
            throw new Error(
              `Invalid function arguments: ${this.options.to}.`
            );
          }

          const animationOptions = new AnimationOptions({
            name: index.toString(),
            target: functionData.values,
            from: fromValue,
            to: toValue,
            startAt: this.options.startAt,
            endAt: this.options.endAt,
            easing: this.options.easing
          });

          if (
            ColorAnimator.isMatch(animationOptions) &&
            ColorAnimator.isMatch(animationOptions)
          ) {
            return new ColorAnimator(animationOptions);
          }

          if (
            UnitAnimator.isMatch(animationOptions) &&
            UnitAnimator.isMatch(animationOptions)
          ) {
            return new UnitAnimator(animationOptions);
          }

          if (
            UnitArrayAnimator.isMatch(animationOptions) &&
            UnitArrayAnimator.isMatch(animationOptions)
          ) {
            return new UnitArrayAnimator(animationOptions);
          }
        }
      );
    });
  }

  render(progress, duration) {
    const value = Object.keys(this.functions)
      .map(functionName => {
        const functionData = this.functions[functionName];

        functionData.animators.map((animator, index) => {
          animator.render(progress, duration);
        });

        return `${functionName}(${functionData.values.join(", ")})`;
      })
      .join(" ");

    this.target[this.options.name] = value;
  }

  toString() {
    return this.value;
  }

  static isMatch(options) {
    functionRegEx.lastIndex = 0;
    const isMatchWithFrom = functionRegEx.test(options.from);
    functionRegEx.lastIndex = 0;
    const isMatchWithTo = functionRegEx.test(options.to);

    return isMatchWithFrom && isMatchWithTo;
  }
}
