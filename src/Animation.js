import easings from "./easings.js";
import cssValue from "./patterns/cssValue.js";
import TreeNormalizer from "./TreeNormalizer.js";
import TreeUtility from "./TreeUtility.js";
import { Cursor } from "clarity-pattern-parser";

const treeUtility = new TreeUtility();
const treeNormalizer = new TreeNormalizer();

export default class Animation {
  constructor(config) {
    this.config = config;
    this.name = config.name;
    this.property = config.property;
    this.to = config.to;
    this.from = config.from;
    this.startAt = config.startAt;
    this.endAt = config.endAt;
    this.controls = Array.isArray(config.controls) ? config.controls : [];
    this.value = this.from;

    this.normalizeEasing();
    this.createNodeTrees();
    this.validate();
  }

  normalizeEasing() {
    const config = this.config;

    this.easing =
      typeof config.easing === "string"
        ? easings[config.easing]
        : config.easing;
        
    this.easing = config.easing || easings.linear;
  }

  createNodeTrees() {
    this.controlNodes = this.controls.map((c) =>
      treeNormalizer.normalize(cssValue.parse(new Cursor(c)))
    );

    this.toNode = treeNormalizer.normalize(cssValue.parse(new Cursor(this.to)));

    this.fromNode = treeNormalizer.normalize(
      cssValue.parse(new Cursor(this.from))
    );

    // This needs to be the to node so that all non number nodes
    // result in the to value. The non number nodes would be words,
    // Like display: none and display: block. It changes on the first
    // tick.
    this.resultNode = this.fromNode.clone();
  }

  validate() {
    if (typeof this.property !== "string") {
      throw new Error(`The "property" property needs to be a string.`);
    }

    if (typeof this.to !== "string") {
      throw new Error(
        `The "to" property needs to be a string, but found ${this.to}.`
      );
    }

    if (typeof this.from !== "string") {
      throw new Error(
        `The "from" property needs to be a string, but found ${this.from}.`
      );
    }

    if (typeof this.name !== "string") {
      throw new Error(
        `Invalid Arguments: The "name" property needs to be an string.`
      );
    }

    if (
      typeof this.startAt !== "number" ||
      this.startAt < 0 ||
      this.startAt > 1
    ) {
      throw new Error(
        `The "startAt" property must be a number between 0 and 1.`
      );
    }

    if (typeof this.endAt !== "number" || this.endAt < 0 || this.endAt > 1) {
      throw new Error(`The "endAt" property must be a number between 0 and 1.`);
    }

    if (typeof this.easing !== "function") {
      throw new Error(`The "easing" property must be a function.`);
    }

    this.validateNodes();
  }

  validateNodes() {
    const allTrees = [this.fromNode, ...this.controlNodes, this.toNode];
    const fromNode = this.fromNode;

    const allStructuresAreEqual = allTrees.every((node) => {
      return treeUtility.areTreeStructuresEqual(fromNode, node);
    });

    if (!allStructuresAreEqual) {
      throw new Error(
        `Invalid Animation: The value types that are being animated do not match. From: ${JSON.stringify(
          this.from
        )}, To:${JSON.stringify(this.to)}, Controls: ${JSON.stringify(
          this.controls
        )}`
      );
    }
  }
}
