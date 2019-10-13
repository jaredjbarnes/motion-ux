const functionRegEx = /(.*?)\((.+?)\)/g;
const unitRegEx = /^(\d*)(.*?)$/;

export default class FunctionAnimator {
  constructor(options) {
    this.target = options.target;
    this.options = options;
    this.progress = null;
    this.value = null;
    this.duration = null;
    this.functionNames = null;
    this.unit = null;
    this.change = null;

    this.parseFunctionNames();
    this.parseFromValue();
    this.parseToValue();
    this.calculateChange();
  }

  parseFunctionNames() {
    if (this.functionNames == null) {
      let result;
      this.functionNames = {};

      functionRegEx.lastIndex = 0;
      while ((result = functionRegEx.exec(this.options.from))) {
        const functionName = result[1].trim();
        this.functionNames[functionName] = {
          change: null,
          fromValues: null,
          toValues: null,
          fromUnits: null,
          toUnits: null
        };
      }
    }
  }

  parseFromValue() {
    if (this.fromValue == null) {
      let result;

      functionRegEx.lastIndex = 0;
      while ((result = functionRegEx.exec(this.options.from))) {
        const functionName = result[1].trim();

        const fromValues = (this.functionNames[functionName].fromValues = []);
        const fromUnits = (this.functionNames[functionName].fromUnits = []);

        result[2].split(",").forEach(value => {
          const valueResult = unitRegEx.exec(value.trim());
          const numberValue = new Number(valueResult[1]).valueOf();
          const unitValue = valueResult[2];

          fromValues.push(numberValue);
          fromUnits.push(unitValue);
        });
      }
    }
  }

  parseToValue() {
    if (this.fromValue == null) {
      let result;

      functionRegEx.lastIndex = 0;
      while ((result = functionRegEx.exec(this.options.to))) {
        const functionName = result[1].trim();

        const toValues = (this.functionNames[functionName].toValues = []);
        const toUnits = (this.functionNames[functionName].toUnits = []);

        result[2].split(",").forEach(value => {
          unitRegEx.lastIndex = 0;
          const valueResult = unitRegEx.exec(value.trim());
          const numberValue = new Number(valueResult[1]).valueOf();
          const unitValue = valueResult[2];

          toValues.push(numberValue);
          toUnits.push(unitValue);
        });
      }
    }
  }

  calculateChange() {
    if (this.change == null) {
      Object.keys(this.functionNames).forEach(key => {
        const functionData = this.functionNames[key];

        if (functionData.fromValues.length !== functionData.toValues.length) {
          throw new Error(
            "Invalid Arguments: The from values length don't match the to values length."
          );
        }

        functionData.change = functionData.toValues.map((to, index) => {
          return to - functionData.fromValues[index];
        });
      });
    }
  }

  render(progress, duration) {
    this.progress = progress;
    this.duration = duration;

    if (progress <= this.options.startAt) {
      this.target[this.options.name] = this.options.from;
      return;
    }

    if (progress >= this.options.endAt) {
      this.target[this.options.name] = this.options.to;
      return;
    }

    this.calculateProgress();
    const value = this.toString();
    this.target[this.options.name] = value;
  }

  calculateProgress() {
    const progress = this.progress - this.options.startAt;
    const duration = this.options.endAt - this.options.startAt;

    const easingProgress = this.options.easing(progress, 0, 1, duration);

    this.value = Object.keys(this.functionNames)
      .map(key => {
        const functionData = this.functionNames[key];

        if (functionData.fromValues.length !== functionData.toValues.length) {
          throw new Error(
            "Invalid Arguments: The from values length don't match the to values length."
          );
        }

        const values = functionData.fromValues
          .map((from, index) => {
            return `${from + easingProgress * functionData.change[index]}${
              functionData.fromUnits[index]
            }`;
          })
          .join(", ");

        return `${key}(${values})`;
      })
      .join(" ");
  }

  toString() {
    return this.value;
  }

  static isMatch(options) {
    return functionRegEx.test(options.to) && functionRegEx.test(options.from);
  }
}
