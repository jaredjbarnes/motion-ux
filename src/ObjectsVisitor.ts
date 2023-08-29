const emptyFn = () => 0;

type Visitor = (left: number, right: number) => number;

export default class ObjectsVisitor {
  private visitor: Visitor = emptyFn;

  constructor(callback: Visitor = emptyFn) {
    this.setVisitor(callback);
  }

  visit(left: any, right: any, output: any) {
    this.walk(left, right, output);
  }

  private walk(left: any, right: any, output: any) {
    if (typeof left === "object" && left != null) {
      for (let key in left) {
        const leftKey = typeof left[key];
        const rightKey = typeof right[key];

        if (leftKey === "number" && rightKey === "number") {
          output[key] = this.visitor(left[key], right[key]);
        } else if (leftKey === "string" && rightKey === "string") {
          output[key] = right[key];
        } else if (leftKey === "object" && rightKey === "object") {
          this.walk(left[key], right[key], output[key]);
        }
      }
    }
  }

  setVisitor(visitor: Visitor) {
    if (typeof visitor === "function") {
      this.visitor = visitor;
    } else {
      this.visitor = emptyFn;
    }

    this.visitor = visitor;
  }
}
