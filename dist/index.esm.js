class BezierCurve {
    constructor(points) {
        this.setPoints(points);
    }
    setPoints(points) {
        this.points = points;
        this.reducedPoints = new Array(points.length);
        Object.freeze(this.points);
    }
    valueAt(percentage) {
        const points = this.points;
        const reducedPoints = this.reducedPoints;
        const length = points.length;
        for (let x = 0; x < length; x++) {
            reducedPoints[x] = points[x];
        }
        for (let x = 0; x < length; x++) {
            const innerLength = length - x - 1;
            for (let y = 0; y < innerLength; y++) {
                const nextPoint = reducedPoints[y + 1];
                const point = reducedPoints[y];
                reducedPoints[y] = (nextPoint - point) * percentage + point;
            }
        }
        return reducedPoints[0];
    }
    clone() {
        return new BezierCurve(this.points.slice());
    }
}

const emptyFn$1 = () => { };
class Visitor$1 {
    constructor(callback = emptyFn$1) {
        this.setCallback(callback);
        this.visitDown = this.visitDown.bind(this);
        this.visitUp = this.visitUp.bind(this);
    }
    walkUp(node) {
        if (node.isComposite) {
            node.children.forEach(this.visitUp);
        }
        this.callback(node);
    }
    visitUp(node) {
        this.walkUp(node);
    }
    walkDown(node) {
        this.callback(node);
        if (node.isComposite) {
            node.children.forEach(this.visitDown);
        }
    }
    visitDown(node) {
        this.walkDown(node);
    }
    setCallback(callback) {
        if (typeof callback === "function") {
            this.callback = callback;
        }
        else {
            this.callback = emptyFn$1;
        }
        this.callback = callback;
    }
}

const visitor$1 = new Visitor$1();
function convertNumberNode(node) {
    if (node.name === "number") {
        node.value = Number(node.value);
    }
}
// Hashing function, this may not be the best. So this may need to be replaced.
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
            Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
            Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
class TreeUtility {
    areTreeStructuresEqual(nodeA, nodeB) {
        const nodeASequence = this.sequence(nodeA);
        const nodeBSequence = this.sequence(nodeB);
        return nodeASequence === nodeBSequence;
    }
    sequence(node) {
        const sequence = [];
        visitor$1.setCallback((node) => {
            sequence.push(node.name);
        });
        visitor$1.visitDown(node);
        return sequence.join("|");
    }
    sequenceHash(node) {
        return hash(this.sequence(node));
    }
    convertNumberNodesToNumberValues(node) {
        visitor$1.setCallback(convertNumberNode);
        visitor$1.visitDown(node);
    }
}

const emptyFn = () => { };
const treeUtility$1 = new TreeUtility();
class GraphsVisitor {
    constructor(callback = emptyFn) {
        this.visitor = emptyFn;
        this.setCallback(callback);
        this.visitDown = this.visitDown.bind(this);
        this.visitUp = this.visitUp.bind(this);
    }
    visitUp(graphs, optimized = false) {
        if (!Array.isArray(graphs)) {
            return;
        }
        const siblings = graphs.slice(1);
        const node = graphs[0];
        if (!optimized) {
            const areEqual = siblings.every((sibling) => treeUtility$1.areTreeStructuresEqual(node, sibling));
            if (!areEqual) {
                throw new Error("The nodes structures need to be the same.");
            }
        }
        this.walkUp(graphs);
    }
    walkUp(graphs) {
        if (!Array.isArray(graphs)) {
            return;
        }
        const node = graphs[0];
        if (node.isComposite) {
            for (let index = 0; index < node.children.length; index++) {
                const childGraphs = graphs.map((node) => {
                    return node.children[index];
                });
                this.walkUp(childGraphs);
            }
        }
        this.visitor(graphs);
    }
    visitDown(graphs, optimized = false) {
        if (!Array.isArray(graphs)) {
            return;
        }
        const siblings = graphs.slice(1);
        const node = graphs[0];
        if (!optimized) {
            const areEqual = siblings.every((sibling) => treeUtility$1.areTreeStructuresEqual(node, sibling));
            if (!areEqual) {
                throw new Error("The nodes structures need to be the same.");
            }
        }
        this.walkDown(graphs);
    }
    walkDown(graphs) {
        if (!Array.isArray(graphs)) {
            return;
        }
        this.visitor(graphs);
        const node = graphs[0];
        if (node.isComposite) {
            for (let index = 0; index < node.children.length; index++) {
                const childGraphs = graphs.map((node) => {
                    return node.children[index];
                });
                this.walkDown(childGraphs);
            }
        }
    }
    setCallback(visitor) {
        if (typeof visitor === "function") {
            this.visitor = visitor;
        }
        else {
            this.visitor = emptyFn;
        }
        this.visitor = visitor;
    }
}

const visitor = new GraphsVisitor();
class Animator {
    constructor(keyframe) {
        this.keyframe = keyframe;
        this.visit = this.visit.bind(this);
        this.time = 0;
        this.bezierCurve = new BezierCurve([]);
        this.keyframeGraphs = [];
        this.updateKeyframeGraphs();
    }
    updateKeyframeGraphs() {
        this.keyframeGraphs.length = 0;
        this.keyframeGraphs.push(this.keyframe.from.graph);
        for (let x = 0; x < this.keyframe.controls.length; x++) {
            this.keyframeGraphs.push(this.keyframe.controls[x].graph);
        }
        this.keyframeGraphs.push(this.keyframe.to.graph);
        this.keyframeGraphs.push(this.keyframe.result.graph);
    }
    visit(nodes) {
        const cloneNodes = nodes.slice();
        const resultNode = cloneNodes.pop();
        const time = this.time;
        if (resultNode == null) {
            return;
        }
        if (cloneNodes[0].name === "number") {
            const elapsedTime = time - this.keyframe.startAt;
            const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
            const timeWithEasing = this.keyframe.easing(elapsedTime / animationDuration);
            const points = cloneNodes.map((node) => Number(node.value));
            this.bezierCurve.setPoints(points);
            resultNode.value = this.bezierCurve.valueAt(timeWithEasing);
        }
        else {
            if (!resultNode.isComposite) {
                if (time >= this.keyframe.startAt) {
                    resultNode.value = cloneNodes[cloneNodes.length - 1].value;
                }
                else {
                    resultNode.value = cloneNodes[0].value;
                }
            }
        }
    }
    update(time) {
        this.updateKeyframeGraphs();
        this.time = time;
        visitor.setCallback(this.visit);
        visitor.visitDown(this.keyframeGraphs, true);
        const value = this.keyframe.result.graph.toString();
        this.keyframe.result.value = value;
        return this.keyframe.result;
    }
}

var easeInQuad = (percentage) => {
    return percentage * percentage;
};

var easeOutQuad = (percentage) => {
    return -percentage * (percentage - 2);
};

var easeInOutQuad = (percentage) => {
    if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * percentage * percentage;
    return (-1 / 2) * (--percentage * (percentage - 2) - 1);
};

var easeInElastic = (percentage) => {
    const p = 0.3 / 1;
    const s = p / 4;
    const a = 1;
    if (percentage <= 0)
        return 0;
    if (percentage >= 1)
        return 1;
    return -(a *
        Math.pow(2, 10 * (percentage -= 1)) *
        Math.sin(((percentage - s) * (2 * Math.PI)) / p));
};

var easeInOutElastic = (t) => {
    var b = 0;
    var c = 1;
    var d = 1;
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)
        return b;
    if ((t /= d / 2) == 2)
        return b + c;
    if (!p)
        p = d * (0.3 / 1);
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else
        var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    if (t < 1)
        return (-0.5 *
            (a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
            b);
    return (a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
        c +
        b);
};

var easeOutElastic = (percentage) => {
    const p = 0.3 / 1;
    const s = p / 4;
    const a = 1;
    if (percentage <= 0)
        return 0;
    if (percentage >= 1)
        return 1;
    return (a *
        Math.pow(2, -10 * percentage) *
        Math.sin(((percentage - s) * (2 * Math.PI)) / p) +
        1);
};

var easeInOutBack = (percentage) => {
    const s = 1.70158 * 1.525;
    if ((percentage /= 1 / 2) < 1) {
        return (1 / 2) * (percentage * percentage * ((s + 1) * percentage - s));
    }
    return ((1 / 2) * ((percentage -= 2) * percentage * ((s + 1) * percentage + s) + 2));
};

var easeOutBounce = (percentage) => {
    let t = percentage;
    if ((t /= 1) < 1 / 2.75) {
        return 7.5625 * t * t;
    }
    else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    }
    else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    }
    else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
};

var easeInBounce = (percentage) => {
    return 1 - easeOutBounce(1 - percentage);
};

var easeInOutBounce = (percentage) => {
    if (percentage < 0.5) {
        return easeInBounce(percentage * 2) * 0.5;
    }
    else {
        return easeOutBounce(percentage * 2 - 1) * 0.5 + 0.5;
    }
};

var easeInCubic = (percentage) => {
    return 1 * (percentage /= 1) * percentage * percentage;
};

var easeOutCubic = (percentage) => {
    return 1 * ((percentage = percentage / 1 - 1) * percentage * percentage + 1);
};

var easeInOutCubic = (percentage) => {
    if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * percentage * percentage * percentage;
    return (1 / 2) * ((percentage -= 2) * percentage * percentage + 2);
};

var easeInQuart = (percentage) => {
    return 1 * (percentage /= 1) * percentage * percentage * percentage;
};

var easeOutQuart = (percentage) => {
    return (-1 *
        ((percentage = percentage / 1 - 1) * percentage * percentage * percentage -
            1));
};

var easeInOutQuart = (percentage) => {
    if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * percentage * percentage * percentage * percentage;
    return ((-1 / 2) * ((percentage -= 2) * percentage * percentage * percentage - 2));
};

var easeInQuint = (percentage) => {
    return (1 * (percentage /= 1) * percentage * percentage * percentage * percentage);
};

var easeOutQuint = (percentage) => {
    return (1 *
        ((percentage = percentage / 1 - 1) *
            percentage *
            percentage *
            percentage *
            percentage +
            1));
};

var easeInOutQuint = (percentage) => {
    if ((percentage /= 1 / 2) < 1)
        return ((1 / 2) * percentage * percentage * percentage * percentage * percentage);
    return ((1 / 2) *
        ((percentage -= 2) * percentage * percentage * percentage * percentage + 2));
};

var easeInSine = (percentage) => {
    return -Math.cos(percentage * (Math.PI / 2)) + 1;
};

var easeOutSine = (percentage) => {
    return 1 * Math.sin((percentage / 1) * (Math.PI / 2));
};

var easeInOutSine = (percentage) => {
    return (-1 / 2) * (Math.cos((Math.PI * percentage) / 1) - 1);
};

var easeInExpo = (percentage) => {
    return percentage == 0 ? 0 : 1 * Math.pow(2, 10 * (percentage / 1 - 1));
};

var easeOutExpo = (percentage) => {
    return percentage == 1 ? 1 : 1 * (-Math.pow(2, (-10 * percentage) / 1) + 1);
};

var easeInOutExpo = (percentage) => {
    if (percentage == 0)
        return 0;
    if (percentage == 1)
        return 1;
    if ((percentage /= 1 / 2) < 1)
        return (1 / 2) * Math.pow(2, 10 * (percentage - 1));
    return (1 / 2) * (-Math.pow(2, -10 * --percentage) + 2);
};

var easeInCirc = (percentage) => {
    return -1 * (Math.sqrt(1 - (percentage /= 1) * percentage) - 1);
};

var easeOutCirc = (percentage) => {
    return 1 * Math.sqrt(1 - (percentage = percentage / 1 - 1) * percentage);
};

var easeInOutCirc = (percentage) => {
    if ((percentage /= 1 / 2) < 1)
        return (-1 / 2) * (Math.sqrt(1 - percentage * percentage) - 1);
    return (1 / 2) * (Math.sqrt(1 - (percentage -= 2) * percentage) + 1);
};

var easeInBack = (percentage) => {
    const s = 1.70158;
    return 1 * (percentage /= 1) * percentage * ((s + 1) * percentage - s);
};

var easeOutBack = (percentage) => {
    const s = 1.70158;
    return (1 *
        ((percentage = percentage / 1 - 1) *
            percentage *
            ((s + 1) * percentage + s) +
            1));
};

var easeLinear = (percentage) => {
    return percentage;
};

const easings = {
    easeInQuad: easeInQuad,
    easeOutQuad: easeOutQuad,
    easeInOutQuad: easeInOutQuad,
    easeInCubic: easeInCubic,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    easeInQuart: easeInQuart,
    easeOutQuart: easeOutQuart,
    easeInOutQuart: easeInOutQuart,
    easeInQuint: easeInQuint,
    easeOutQuint: easeOutQuint,
    easeInOutQuint: easeInOutQuint,
    easeInSine: easeInSine,
    easeOutSine: easeOutSine,
    easeInOutSine: easeInOutSine,
    easeInExpo: easeInExpo,
    easeOutExpo: easeOutExpo,
    easeInOutExpo: easeInOutExpo,
    easeInCirc: easeInCirc,
    easeOutCirc: easeOutCirc,
    easeInOutCirc: easeInOutCirc,
    easeInElastic: easeInElastic,
    easeOutElastic: easeOutElastic,
    easeInOutElastic: easeInOutElastic,
    easeInBack: easeInBack,
    easeOutBack: easeOutBack,
    easeInOutBack: easeInOutBack,
    easeInBounce: easeInBounce,
    easeOutBounce: easeOutBounce,
    easeInOutBounce: easeInOutBounce,
    linear: easeLinear,
};

class Node {
    constructor(type, name, startIndex, endIndex, isComposite = false) {
        this.children = [];
        this.value = "";
        this.type = type;
        this.name = name;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.isComposite = isComposite;
        if (typeof this.startIndex !== "number" ||
            typeof this.endIndex !== "number") {
            throw new Error("Invalid Arguments: startIndex and endIndex need to be number.");
        }
    }
}

class CompositeNode extends Node {
    constructor(type, name, startIndex = 0, endIndex = 0) {
        super(type, name, startIndex, endIndex, true);
    }
    clone() {
        const node = new CompositeNode(this.type, this.name, this.startIndex, this.endIndex);
        node.children = this.children.map((child) => {
            return child.clone();
        });
        return node;
    }
    toString() {
        return this.children.map((child) => child.toString()).join("");
    }
}

class ValueNode extends Node {
    constructor(type, name, value, startIndex = 0, endIndex = 0) {
        super(type, name, startIndex, endIndex);
        this.value = value;
    }
    clone() {
        return new ValueNode(this.type, this.name, this.value, this.startIndex, this.endIndex);
    }
    toString() {
        return this.value;
    }
}

class CursorHistory {
    constructor() {
        this.isRecording = false;
        this.furthestMatch = {
            pattern: null,
            astNode: null,
        };
        this.furthestError = null;
        this.patterns = [];
        this.astNodes = [];
        this.errors = [];
    }
    addMatch(pattern, astNode) {
        if (this.isRecording) {
            this.patterns.push(pattern);
            this.astNodes.push(astNode);
        }
        if (this.furthestMatch.astNode == null ||
            astNode.endIndex >= this.furthestMatch.astNode.endIndex) {
            this.furthestMatch.pattern = pattern;
            this.furthestMatch.astNode = astNode;
        }
    }
    addError(error) {
        if (this.isRecording) {
            this.errors.push(error);
        }
        if (this.furthestError == null || error.index >= this.furthestError.index) {
            this.furthestError = error;
        }
    }
    startRecording() {
        this.isRecording = true;
    }
    stopRecording() {
        this.isRecording = false;
        this.clear();
    }
    clear() {
        this.patterns.length = 0;
        this.astNodes.length = 0;
        this.errors.length = 0;
    }
    getFurthestError() {
        return this.furthestError;
    }
    getFurthestMatch() {
        return this.furthestMatch;
    }
    getLastMatch() {
        if (this.isRecording) {
            return {
                pattern: this.patterns[this.patterns.length - 1] || null,
                astNode: this.astNodes[this.astNodes.length - 1] || null,
            };
        }
        else {
            return this.furthestMatch;
        }
    }
    getLastError() {
        return this.errors[this.errors.length - 1] || null;
    }
    getAllParseStacks() {
        const stacks = this.astNodes.reduce((acc, node) => {
            let container = acc[acc.length - 1];
            if (node.startIndex === 0) {
                container = [];
                acc.push(container);
            }
            container.push(node);
            return acc;
        }, []);
        // There are times when the matching will fail and hit again on the same node.
        // This filters them out.
        // We simply check to see if there is any overlap with the previous one,
        // and if there is we don't add it. This is why we move backwards.
        const cleanedStack = stacks.map((stack) => {
            const cleanedStack = [];
            for (let x = stack.length - 1; x >= 0; x--) {
                const currentNode = stack[x];
                const previousNode = stack[x + 1];
                if (previousNode == null) {
                    cleanedStack.unshift(currentNode);
                }
                else {
                    const left = Math.max(currentNode.startIndex, previousNode.startIndex);
                    const right = Math.min(currentNode.endIndex, previousNode.endIndex);
                    const isOverlapping = left <= right;
                    if (!isOverlapping) {
                        cleanedStack.unshift(currentNode);
                    }
                }
            }
            return cleanedStack;
        });
        return cleanedStack;
    }
    getLastParseStack() {
        const stacks = this.getAllParseStacks();
        return stacks[stacks.length - 1] || [];
    }
}

class Cursor {
    constructor(text) {
        this.text = text;
        this.assertValidity();
        this.index = 0;
        this.length = text.length;
        this.history = new CursorHistory();
        this.isInErrorState = false;
    }
    assertValidity() {
        if (this.isNullOrEmpty(this.text)) {
            throw new Error("Illegal Argument: Cursor needs to have a string that has a length greater than 0.");
        }
    }
    startRecording() {
        this.history.startRecording();
    }
    stopRecording() {
        this.history.stopRecording();
    }
    get parseError() {
        return this.history.getFurthestError();
    }
    get lastMatch() {
        return this.history.getFurthestMatch();
    }
    throwError(parseError) {
        this.isInErrorState = true;
        this.history.addError(parseError);
    }
    addMatch(pattern, astNode) {
        this.history.addMatch(pattern, astNode);
    }
    resolveError() {
        this.isInErrorState = false;
    }
    hasUnresolvedError() {
        return this.isInErrorState;
    }
    isNullOrEmpty(value) {
        return value == null || (typeof value === "string" && value.length === 0);
    }
    hasNext() {
        return this.index + 1 < this.text.length;
    }
    hasPrevious() {
        return this.index - 1 >= 0;
    }
    next() {
        if (this.hasNext()) {
            this.index++;
        }
        else {
            throw new Error("Cursor: Out of Bounds Exception.");
        }
    }
    previous() {
        if (this.hasPrevious()) {
            this.index--;
        }
        else {
            throw new Error("Cursor: Out of Bounds Exception.");
        }
    }
    mark() {
        return this.index;
    }
    moveToMark(mark) {
        this.index = mark;
    }
    moveToBeginning() {
        this.index = 0;
    }
    moveToEnd() {
        this.index = this.text.length - 1;
    }
    getChar() {
        return this.text.charAt(this.index);
    }
    getIndex() {
        return this.index;
    }
    setIndex(index) {
        if (typeof index === "number") {
            if (index < 0 || index > this.lastIndex()) {
                throw new Error("Cursor: Out of Bounds Exception.");
            }
            this.index = index;
        }
    }
    isAtBeginning() {
        return this.index === 0;
    }
    isAtEnd() {
        return this.index === this.text.length - 1;
    }
    lastIndex() {
        return this.length - 1;
    }
    didSuccessfullyParse() {
        return !this.hasUnresolvedError() && this.isAtEnd();
    }
}

class ParseError {
    constructor(message, index, pattern) {
        this.name = "ParseError";
        this.message = message;
        this.index = index;
        this.pattern = pattern;
    }
}

class Pattern {
    constructor(type = "", name, children = []) {
        this._type = type;
        this._name = name;
        this._children = [];
        this._parent = null;
        this.isSequence = false;
        this._assertName();
        this.children = children;
    }
    _assertName() {
        if (typeof this.name !== "string") {
            throw new Error("Invalid Argument: Patterns needs to have a name that's a string.");
        }
    }
    exec(text) {
        const cursor = new Cursor(text);
        const node = this.parse(cursor);
        if (cursor.didSuccessfullyParse()) {
            return node;
        }
        else {
            return null;
        }
    }
    test(text) {
        return this.exec(text) != null;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        if (value instanceof Pattern) {
            this._parent = value;
        }
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
        this._cloneChildren();
        this._assertChildren();
        this._assignAsParent();
    }
    _assertChildren() {
        // Empty,can be overridden by subclasses.
    }
    _cloneChildren() {
        // We need to clone the patterns so nested patterns can be parsed.
        this._children = this._children.map((pattern) => {
            if (!(pattern instanceof Pattern)) {
                throw new Error(`The ${this.name} pattern has an invalid child pattern.`);
            }
            return pattern.clone();
        });
        // We need to freeze the children so they aren't modified.
        Object.freeze(this._children);
    }
    _assignAsParent() {
        this._children.forEach((child) => (child.parent = this));
    }
    getNextTokens() {
        var _a, _b, _c;
        const parent = this._parent;
        if (parent != null) {
            const siblings = parent.children;
            const index = siblings.findIndex((c) => c === this);
            const nextSibling = siblings[index + 1];
            // I don't like this, so I think we need to rethink this.
            if (parent.type.indexOf("repeat") === 0) {
                const tokens = parent.getNextTokens();
                if (index === 0 && siblings.length > 1) {
                    return nextSibling.getTokens().concat(tokens);
                }
                else if (index === 1) {
                    return siblings[0].getTokens().concat(tokens);
                }
                else {
                    return this.getTokens().concat(tokens);
                }
            }
            // Another thing I don't like.
            if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.indexOf("and")) === 0 &&
                nextSibling != null &&
                ((_c = nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.type) === null || _c === void 0 ? void 0 : _c.indexOf("optional")) === 0) {
                let tokens = [];
                for (let x = index + 1; x < siblings.length; x++) {
                    const child = siblings[x];
                    if (child.type.indexOf("optional") === 0) {
                        tokens = tokens.concat(child.getTokens());
                    }
                    else {
                        tokens = tokens.concat(child.getTokens());
                        break;
                    }
                    if (x === siblings.length - 1) {
                        tokens = tokens.concat(this._parent.getNextTokens());
                    }
                }
                return tokens;
            }
            // If you are an or you have already qualified.
            if (parent.type.indexOf("or") === 0) {
                return parent.getNextTokens();
            }
            if (nextSibling != null) {
                return nextSibling.getTokens();
            }
            else {
                return parent.getNextTokens();
            }
        }
        return [];
    }
    getTokenValue() {
        return null;
    }
}

class ValuePattern extends Pattern {
    constructor(type, name, children = []) {
        super(type, name, children);
    }
}

class RegexValue extends ValuePattern {
    constructor(name, regex) {
        super("regex-value", name);
        this.node = null;
        this.substring = "";
        this.regexString = regex;
        this.regex = new RegExp(`^${regex}`, "g");
        this._assertArguments();
    }
    _assertArguments() {
        if (typeof this.regexString !== "string") {
            throw new Error("Invalid Arguments: The regex argument needs to be a string of regex.");
        }
        if (this.regexString.length < 1) {
            throw new Error("Invalid Arguments: The regex string argument needs to be at least one character long.");
        }
        if (this.regexString.charAt(0) === "^") {
            throw new Error("Invalid Arguments: The regex string cannot start with a '^' because it is expected to be in the middle of a string.");
        }
        if (this.regexString.charAt(this.regexString.length - 1) === "$") {
            throw new Error("Invalid Arguments: The regex string cannot end with a '$' because it is expected to be in the middle of a string.");
        }
    }
    parse(cursor) {
        this._reset(cursor);
        this._tryPattern();
        return this.node;
    }
    _reset(cursor) {
        this.cursor = cursor;
        this.regex.lastIndex = 0;
        this.substring = this.cursor.text.substr(this.cursor.getIndex());
        this.node = null;
    }
    _tryPattern() {
        const result = this.regex.exec(this.substring);
        if (result != null && result.index === 0) {
            const currentIndex = this.cursor.getIndex();
            const newIndex = currentIndex + result[0].length - 1;
            this.node = new ValueNode("regex-value", this.name, result[0], currentIndex, newIndex);
            this.cursor.index = newIndex;
            this.cursor.addMatch(this, this.node);
        }
        else {
            this._processError();
        }
    }
    _processError() {
        const message = `ParseError: Expected regex pattern of '${this.regexString}' but found '${this.substring}'.`;
        const parseError = new ParseError(message, this.cursor.getIndex(), this);
        this.cursor.throwError(parseError);
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new RegexValue(name, this.regexString);
    }
    getTokenValue() {
        return this.name;
    }
    getTokens() {
        return [this.name];
    }
}

class OptionalValue extends ValuePattern {
    constructor(pattern) {
        super("optional-value", "optional-value", [pattern]);
        this._assertArguments();
    }
    _assertArguments() {
        if (!(this.children[0] instanceof ValuePattern)) {
            throw new Error("Invalid Arguments: Expected a ValuePattern.");
        }
    }
    parse(cursor) {
        const mark = cursor.mark();
        const node = this.children[0].parse(cursor);
        if (cursor.hasUnresolvedError() || node == null) {
            cursor.resolveError();
            cursor.moveToMark(mark);
            return null;
        }
        else {
            cursor.addMatch(this, node);
            return node;
        }
    }
    clone() {
        return new OptionalValue(this.children[0]);
    }
    getTokens() {
        return this._children[0].getTokens();
    }
}

class Literal extends ValuePattern {
    constructor(name, literal) {
        super("literal", name);
        this.node = null;
        this.mark = 0;
        this.substring = "";
        this.literal = literal;
        this._assertArguments();
    }
    _assertArguments() {
        if (typeof this.literal !== "string") {
            throw new Error("Invalid Arguments: The literal argument needs to be a string of characters.");
        }
        if (this.literal.length < 1) {
            throw new Error("Invalid Arguments: The literalString argument needs to be at least one character long.");
        }
    }
    parse(cursor) {
        this._reset(cursor);
        this._tryPattern();
        return this.node;
    }
    _reset(cursor) {
        this.cursor = cursor;
        this.mark = this.cursor.mark();
        this.substring = this.cursor.text.substring(this.mark, this.mark + this.literal.length);
        this.node = null;
    }
    _tryPattern() {
        if (this.substring === this.literal) {
            this._processMatch();
        }
        else {
            this._processError();
        }
    }
    _processError() {
        const message = `ParseError: Expected '${this.literal}' but found '${this.substring}'.`;
        const parseError = new ParseError(message, this.cursor.getIndex(), this);
        this.cursor.throwError(parseError);
    }
    _processMatch() {
        this.node = new ValueNode("literal", this.name, this.substring, this.mark, this.mark + this.literal.length - 1);
        this.cursor.index = this.node.endIndex;
        this.cursor.addMatch(this, this.node);
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new Literal(name, this.literal);
    }
    getTokenValue() {
        return this.literal;
    }
    getTokens() {
        return [this.getTokenValue()];
    }
}

class RepeatValue extends ValuePattern {
    constructor(name, pattern, divider) {
        super("repeat-value", name, divider != null ? [pattern, divider] : [pattern]);
        this.nodes = [];
        this.mark = 0;
        this.node = null;
        this._pattern = this.children[0];
        this._divider = this.children[1];
        this._assertArguments();
    }
    _assertArguments() {
        if (this._pattern instanceof OptionalValue) {
            throw new Error("Invalid Arguments: The pattern cannot be a optional pattern.");
        }
    }
    _reset(cursor) {
        this.nodes = [];
        this.cursor = cursor;
        this.mark = this.cursor.mark();
    }
    parse(cursor) {
        this._reset(cursor);
        this._tryPattern();
        return this.node;
    }
    _tryPattern() {
        while (true) {
            const node = this._pattern.parse(this.cursor);
            if (this.cursor.hasUnresolvedError()) {
                this._processMatch();
                break;
            }
            else {
                this.nodes.push(node);
                if (node.endIndex === this.cursor.lastIndex()) {
                    this._processMatch();
                    break;
                }
                this.cursor.next();
                if (this._divider != null) {
                    const mark = this.cursor.mark();
                    const node = this._divider.parse(this.cursor);
                    if (this.cursor.hasUnresolvedError()) {
                        this.cursor.moveToMark(mark);
                        this._processMatch();
                        break;
                    }
                    else {
                        this.nodes.push(node);
                        this.cursor.next();
                    }
                }
            }
        }
    }
    _processMatch() {
        this.cursor.resolveError();
        if (this.nodes.length === 0) {
            const parseError = new ParseError(`Did not find a repeating match of ${this.name}.`, this.mark, this);
            this.cursor.throwError(parseError);
            this.node = null;
        }
        else {
            const value = this.nodes.map((node) => node.value).join("");
            this.node = new ValueNode("repeat-value", this.name, value, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
            this.cursor.index = this.node.endIndex;
            this.cursor.addMatch(this, this.node);
        }
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new RepeatValue(name, this._pattern, this._divider);
    }
    getTokens() {
        return this._pattern.getTokens();
    }
}

class CompositePattern extends Pattern {
    constructor(type, name, children = []) {
        super(type, name, children);
    }
}

class OptionalComposite extends CompositePattern {
    constructor(pattern) {
        super("optional-composite", "optional-composite", [pattern]);
    }
    parse(cursor) {
        const mark = cursor.mark();
        this.mark = mark;
        const node = this.children[0].parse(cursor);
        if (cursor.hasUnresolvedError()) {
            cursor.resolveError();
            cursor.moveToMark(mark);
            return null;
        }
        else {
            if (node != null) {
                cursor.addMatch(this, node);
            }
            return node;
        }
    }
    clone() {
        return new OptionalComposite(this.children[0]);
    }
    getTokens() {
        return this._children[0].getTokens();
    }
}

class AndComposite extends CompositePattern {
    constructor(name, patterns = []) {
        super("and-composite", name, patterns);
        this._assertArguments();
    }
    _assertArguments() {
        if (this._children.length < 2) {
            throw new Error("Invalid Argument: AndValue needs to have more than one value pattern.");
        }
    }
    _reset(cursor) {
        this.index = 0;
        this.nodes = [];
        this.node = null;
        this.cursor = cursor;
        this.mark = this.cursor.mark();
    }
    parse(cursor) {
        this._reset(cursor);
        this._tryPatterns();
        return this.node;
    }
    _tryPatterns() {
        while (true) {
            const pattern = this._children[this.index];
            const node = pattern.parse(this.cursor);
            if (this.cursor.hasUnresolvedError()) {
                this.cursor.moveToMark(this.mark);
                break;
            }
            else {
                this.nodes.push(node);
            }
            if (!this._next()) {
                this._processValue();
                break;
            }
        }
    }
    _next() {
        if (this._hasMorePatterns()) {
            if (this.cursor.hasNext()) {
                // If the last result was a failed optional, then don't increment the cursor.
                if (this.nodes[this.nodes.length - 1] != null) {
                    this.cursor.next();
                }
                this.index++;
                return true;
            }
            else if (this.nodes[this.nodes.length - 1] == null) {
                this.index++;
                return true;
            }
            this._assertRestOfPatternsAreOptional();
            return false;
        }
        else {
            return false;
        }
    }
    _hasMorePatterns() {
        return this.index + 1 < this._children.length;
    }
    _assertRestOfPatternsAreOptional() {
        const areTheRestOptional = this.children.every((pattern, index) => {
            return (index <= this.index ||
                pattern instanceof OptionalValue ||
                pattern instanceof OptionalComposite);
        });
        if (!areTheRestOptional) {
            const parseError = new ParseError(`Could not match ${this.name} before string ran out.`, this.index, this);
            this.cursor.throwError(parseError);
        }
    }
    _processValue() {
        if (!this.cursor.hasUnresolvedError()) {
            this.nodes = this.nodes.filter((node) => node != null);
            const lastNode = this.nodes[this.nodes.length - 1];
            const startIndex = this.mark;
            const endIndex = lastNode.endIndex;
            this.node = new CompositeNode("and-composite", this.name, startIndex, endIndex);
            this.node.children = this.nodes;
            this.cursor.index = this.node.endIndex;
            this.cursor.addMatch(this, this.node);
        }
        else {
            this.node = null;
        }
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new AndComposite(name, this._children);
    }
    getTokens() {
        let tokens = [];
        for (let x = 0; x < this._children.length; x++) {
            const child = this._children[x];
            if (child instanceof OptionalValue ||
                child instanceof OptionalComposite) {
                tokens = tokens.concat(child.getTokens());
            }
            else {
                tokens = tokens.concat(child.getTokens());
                break;
            }
        }
        return tokens;
    }
}

class OrComposite extends CompositePattern {
    constructor(name, patterns) {
        super("or-composite", name, patterns);
        this._assertArguments();
    }
    _assertArguments() {
        if (this._children.length < 2) {
            throw new Error("Invalid Argument: OrValue needs to have more than one value pattern.");
        }
        const hasOptionalChildren = this._children.some((pattern) => pattern instanceof OptionalValue || pattern instanceof OptionalComposite);
        if (hasOptionalChildren) {
            throw new Error("OrComposite cannot have optional values.");
        }
    }
    _reset(cursor) {
        this.cursor = cursor;
        this.mark = null;
        this.index = 0;
        this.node = null;
        this.mark = cursor.mark();
    }
    parse(cursor) {
        this._reset(cursor);
        this._tryPattern();
        if (this.node != null) {
            this.cursor.addMatch(this, this.node);
        }
        return this.node;
    }
    _tryPattern() {
        while (true) {
            const pattern = this._children[this.index];
            this.node = pattern.parse(this.cursor);
            if (this.cursor.hasUnresolvedError()) {
                if (this.index + 1 < this._children.length) {
                    this.cursor.resolveError();
                    this.index++;
                    this.cursor.moveToMark(this.mark);
                }
                else {
                    this.node = null;
                    break;
                }
            }
            else {
                this.cursor.index = this.node.endIndex;
                break;
            }
        }
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new OrComposite(name, this._children);
    }
    getTokens() {
        const tokens = this._children.map((c) => c.getTokens());
        const hasPrimitiveTokens = tokens.every((t) => t.every((value) => typeof value === "string"));
        if (hasPrimitiveTokens && tokens.length > 0) {
            return tokens.reduce((acc, t) => acc.concat(t), []);
        }
        return this._children[0].getTokens();
    }
}

class RepeatComposite extends CompositePattern {
    constructor(name, pattern, divider) {
        super("repeat-composite", name, divider != null ? [pattern, divider] : [pattern]);
        this.nodes = [];
        this.mark = 0;
        this.node = null;
        this._pattern = this.children[0];
        this._divider = this.children[1];
        this._assertArguments();
    }
    _assertArguments() {
        if (this._pattern instanceof OptionalComposite) {
            throw new Error("Invalid Arguments: The pattern cannot be a optional pattern.");
        }
    }
    _reset(cursor) {
        this.nodes = [];
        this.cursor = cursor;
        this.mark = this.cursor.mark();
    }
    parse(cursor) {
        this._reset(cursor);
        this._tryPattern();
        return this.node;
    }
    _tryPattern() {
        while (true) {
            const node = this._pattern.parse(this.cursor);
            if (this.cursor.hasUnresolvedError() || node == null) {
                this._processMatch();
                break;
            }
            else {
                this.nodes.push(node);
                if (node.endIndex === this.cursor.lastIndex()) {
                    this._processMatch();
                    break;
                }
                this.cursor.next();
                if (this._divider != null) {
                    const mark = this.cursor.mark();
                    const node = this._divider.parse(this.cursor);
                    if (this.cursor.hasUnresolvedError() || node == null) {
                        this.cursor.moveToMark(mark);
                        this._processMatch();
                        break;
                    }
                    else {
                        this.nodes.push(node);
                        this.cursor.next();
                    }
                }
            }
        }
    }
    _processMatch() {
        this.cursor.resolveError();
        if (this.nodes.length === 0) {
            this.cursor.throwError(new ParseError(`Did not find a repeating match of ${this.name}.`, this.mark, this));
            this.node = null;
        }
        else {
            this.node = new CompositeNode("repeat-composite", this.name, this.nodes[0].startIndex, this.nodes[this.nodes.length - 1].endIndex);
            this.node.children = this.nodes;
            this.cursor.index = this.node.endIndex;
            this.cursor.addMatch(this, this.node);
        }
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new RepeatComposite(name, this._pattern, this._divider);
    }
    getTokens() {
        return this._pattern.getTokens();
    }
}

class RecursivePattern extends Pattern {
    constructor(name) {
        super("recursive", name);
        this.pattern = null;
        this.isRecursing = false;
    }
    getPattern() {
        return this._climb(this.parent, (pattern) => {
            if (pattern == null) {
                return false;
            }
            return pattern.name === this.name;
        });
    }
    _climb(pattern, isMatch) {
        if (isMatch(pattern)) {
            return pattern;
        }
        else {
            if (pattern && pattern.parent != null) {
                return this._climb(pattern.parent, isMatch);
            }
            return null;
        }
    }
    parse(cursor) {
        if (this.pattern == null) {
            const pattern = this.getPattern();
            if (pattern == null) {
                cursor.throwError(new ParseError(`Couldn't find parent pattern to recursively parse, with the name ${this.name}.`, cursor.index, this));
                return null;
            }
            this.pattern = pattern.clone();
            this.pattern.parent = this;
        }
        const node = this.pattern.parse(cursor);
        if (!cursor.hasUnresolvedError() && node != null) {
            cursor.addMatch(this, node);
        }
        return node;
    }
    clone(name) {
        if (typeof name !== "string") {
            name = this.name;
        }
        return new RecursivePattern(name);
    }
    getTokenValue() {
        var _a;
        return ((_a = this.getPattern()) === null || _a === void 0 ? void 0 : _a.getTokenValue()) || null;
    }
    getTokens() {
        var _a;
        if (!this.isRecursing) {
            this.isRecursing = true;
            const tokens = ((_a = this.getPattern()) === null || _a === void 0 ? void 0 : _a.getTokens()) || [];
            this.isRecursing = false;
            return tokens;
        }
        return [];
    }
}

class Visitor {
    constructor(root = null, selectedNodes = []) {
        this.root = root;
        this.selectedNodes = selectedNodes;
    }
    flatten() {
        this.selectedNodes.forEach((node) => {
            if (node.isComposite) {
                const children = [];
                Visitor.walkUp(node, (descendant) => {
                    if (!descendant.isComposite) {
                        children.push(descendant);
                    }
                });
                node.children = children;
            }
        });
        return this;
    }
    remove() {
        if (this.root == null) {
            return this;
        }
        this.recursiveRemove(this.root);
        return this;
    }
    recursiveRemove(node) {
        const nodesToRemove = this.selectedNodes;
        if (node.isComposite && Array.isArray(node.children)) {
            for (let x = 0; x < node.children.length; x++) {
                if (nodesToRemove.indexOf(node.children[x]) > -1) {
                    node.children.splice(x, 1);
                    x--;
                }
                else {
                    this.recursiveRemove(node.children[x]);
                }
            }
        }
    }
    wrap(callback) {
        const visitor = new Visitor(this.root);
        visitor.selectRoot().transform((node) => {
            if (this.selectedNodes.includes(node)) {
                return callback(node);
            }
            return node;
        });
        return this;
    }
    unwrap() {
        if (this.root == null) {
            return this;
        }
        Visitor.walkDown(this.root, (node, stack) => {
            if (this.selectedNodes.includes(node)) {
                const parent = stack[stack.length - 1];
                const grandParent = stack[stack.length - 2];
                if (parent != null && grandParent != null) {
                    const index = grandParent.children.indexOf(parent);
                    if (index > -1) {
                        grandParent.children.splice(index, 1, ...parent.children);
                    }
                }
            }
        });
        return this;
    }
    prepend(callback) {
        if (this.root == null) {
            return this;
        }
        Visitor.walkUp(this.root, (node, stack) => {
            if (this.selectedNodes.includes(node)) {
                const parent = stack[stack.length - 1];
                if (parent != null) {
                    const index = parent.children.indexOf(node);
                    if (index > -1) {
                        parent.children.splice(index, 0, callback(node));
                    }
                }
            }
        });
        return this;
    }
    append(callback) {
        if (this.root == null) {
            return this;
        }
        Visitor.walkDown(this.root, (node, stack) => {
            if (this.selectedNodes.includes(node)) {
                const parent = stack[stack.length - 1];
                if (parent != null) {
                    const index = parent.children.indexOf(node);
                    if (index > -1) {
                        parent.children.splice(index + 1, 0, callback(node));
                    }
                }
            }
        });
        return this;
    }
    transform(callback) {
        this.selectedNodes.forEach((node) => {
            return this.recursiveTransform(node, callback);
        });
        return this;
    }
    recursiveTransform(node, callback) {
        if (node.isComposite && Array.isArray(node.children)) {
            const length = node.children.length;
            for (let x = 0; x < length; x++) {
                node.children[x] = this.recursiveTransform(node.children[x], callback);
            }
        }
        return callback(node);
    }
    selectAll() {
        return this.select((n) => true);
    }
    selectNode(node) {
        return new Visitor(this.root, [...this.selectedNodes, node]);
    }
    deselectNode(node) {
        const visitor = new Visitor(this.root, this.selectedNodes.slice());
        return visitor.filter((n) => n !== node);
    }
    select(callback) {
        if (this.root == null) {
            return this;
        }
        const node = this.root;
        const selectedNodes = [];
        if (node.isComposite) {
            Visitor.walkDown(node, (descendant) => {
                if (callback(descendant)) {
                    selectedNodes.push(descendant);
                }
            });
        }
        return new Visitor(this.root, selectedNodes);
    }
    forEach(callback) {
        this.selectedNodes.forEach(callback);
        return this;
    }
    filter(callback) {
        return new Visitor(this.root, this.selectedNodes.filter(callback));
    }
    map(callback) {
        return new Visitor(this.root, this.selectedNodes.map(callback));
    }
    selectRoot() {
        if (this.root == null) {
            return this;
        }
        return new Visitor(this.root, [this.root]);
    }
    first() {
        return this.get(0);
    }
    last() {
        return this.get(this.selectedNodes.length - 1);
    }
    get(index) {
        const node = this.selectedNodes[index];
        if (node == null) {
            throw new Error(`Couldn't find node at index: ${index}, out of ${this.selectedNodes.length}.`);
        }
        return new Visitor(node, []);
    }
    clear() {
        this.selectedNodes = [];
        return this;
    }
    setRoot(root) {
        this.root = root;
        return this;
    }
    static select(root, callback) {
        if (callback != null) {
            return new Visitor(root).select(callback);
        }
        else {
            return new Visitor(root);
        }
    }
    static walkUp(node, callback, ancestors = []) {
        ancestors.push(node);
        if (node.isComposite && Array.isArray(node.children)) {
            const children = node.children.slice();
            children.forEach((c) => this.walkUp(c, callback, ancestors));
        }
        ancestors.pop();
        callback(node, ancestors);
        return this;
    }
    static walkDown(node, callback, ancestors = []) {
        callback(node, ancestors);
        ancestors.push(node);
        if (node.isComposite && Array.isArray(node.children)) {
            const children = node.children.slice();
            children.forEach((c) => this.walkDown(c, callback, ancestors));
        }
        ancestors.pop();
        return this;
    }
}

const divider = new RegexValue("divider", "\\s*[,]\\s*");

const number = new RegexValue("number", "[-+]?[0-9]*[.]?[0-9]+([eE][-+]?[0-9]+)?");

const unitType = new RegexValue("unit-type", "[a-zA-Z%]+");
const unit = new AndComposite("unit", [number, unitType]);

const hex = new RegexValue("hex", "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}");

const name = new RegexValue("name", "[a-zA-Z]+[a-zA-Z0-9_-]*");

const space$1 = new Literal("optional-space", " ");
const spaces$1 = new RepeatValue("optional-spaces", space$1);
const optionalSpaces = new OptionalValue(spaces$1);

const openParen = new Literal("open-paren", "(");
const closeParen = new Literal("close-paren", ")");
const values$1 = new RecursivePattern("values");
const args = new RepeatComposite("arguments", values$1, divider);
const optionalArgs = new OptionalComposite(args);
const method = new AndComposite("method", [
    name,
    openParen,
    optionalSpaces,
    optionalArgs,
    optionalSpaces,
    closeParen
]);

const openBracket = new Literal("open-square-bracket", "[");
const closeBracket = new Literal("close-square-bracket", "]");
const items = new RepeatComposite("items", number, divider);
const array = new AndComposite("array", [
    openBracket,
    optionalSpaces,
    items,
    optionalSpaces,
    closeBracket,
]);

const value = new OrComposite("value", [
    array,
    hex,
    method,
    unit,
    number,
    name,
]);

const space = new Literal("space", " ");
const spaces = new RepeatValue("spaces", space);

const values = new RepeatComposite("values", value, spaces);

const cssValue = new RepeatComposite("css-value", values, divider);

const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
class HexColor {
    constructor(hexString) {
        this.setHex(hexString);
    }
    setHex(hexString) {
        this.hexString = hexString;
        this.normalizeHex();
        this.saveRgba();
    }
    saveRgba() {
        const hex = this.hexString;
        hexRegEx.lastIndex = 0;
        const result = hexRegEx.exec(hex);
        this.rgba = result
            ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                1,
            ]
            : [0, 0, 0, 1];
    }
    toComplexNode() {
        const children = this.rgba
            .map((number) => {
            const valuesNode = new CompositeNode("repeat-composite", "values");
            valuesNode.children.push(new ValueNode("regex-value", "number", number.toString()));
            return valuesNode;
        })
            .reduce((acc, valueNode) => {
            acc.push(valueNode);
            acc.push(new ValueNode("regex-value", "divider", ", "));
            return acc;
        }, []);
        const node = new CompositeNode("and-composite", "method");
        const name = new ValueNode("regex-value", "name", "rgba");
        const openParen = new ValueNode("literal", "open-paren", "(");
        const args = new CompositeNode("repeat-composite", "arguments");
        const closeParen = new ValueNode("literal", "close-paren", ")");
        args.children = children;
        node.children.push(name, openParen, args, closeParen);
        return node;
    }
    toValueNode() {
        return new ValueNode("literal", "hex", this.hexString);
    }
    toRgbString() {
        return `rgb(${this.rgba[0]},${this.rgba[1]},${this.rgba[2]})`;
    }
    normalizeHex() {
        if (this.hexString.length === 4) {
            this.hexString = this.hexString + this.hexString.substring(1);
        }
    }
    numberToHex(number) {
        if (number > 255) {
            number = 255;
        }
        if (number < 0) {
            number = 0;
        }
        let hex = number.toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }
    toHexString() {
        const rgbArray = this.rgba;
        const red = this.numberToHex(rgbArray[0]);
        const green = this.numberToHex(rgbArray[1]);
        const blue = this.numberToHex(rgbArray[2]);
        return `#${red}${green}${blue}`;
    }
}

const filterOutSpaces = (child) => child.name !== "optional-spaces";
class TreeNormalizer {
    constructor() {
        this.visitNode = this.visitNode.bind(this);
    }
    visitNode(node) {
        if (node.isComposite) {
            this.removeOptionalSpaces(node);
            this.replaceHex(node);
            this.removeUnnecessaryDividers(node);
            this.removeUnnecessaryValuesSpaces(node);
        }
        this.collapseWhiteSpace(node);
        this.removeSpacesAroundDividers(node);
    }
    collapseWhiteSpace(node) {
        if (node.name === "spaces") {
            node.value = " ";
        }
    }
    removeSpacesAroundDividers(node) {
        if (node.name === "divider") {
            node.value = node.value.trim();
        }
    }
    removeUnnecessaryDividers(node) {
        const children = node.children;
        while (children.length > 0 &&
            children[children.length - 1].name === "divider") {
            children.pop();
        }
    }
    removeUnnecessaryValuesSpaces(node) {
        const children = node.children;
        while (node.name === "values" &&
            children.length > 0 &&
            children[children.length - 1].name === "spaces") {
            children.pop();
        }
    }
    removeOptionalSpaces(node) {
        node.children = node.children.filter(filterOutSpaces);
    }
    replaceHex(node) {
        node.children = node.children.map((child) => {
            if (child.name === "hex") {
                const hexColor = new HexColor(child.value);
                return hexColor.toComplexNode();
            }
            return child;
        });
    }
    normalize(node) {
        new Visitor(node, [node]).flatten();
        Visitor.walkDown(node, this.visitNode);
        return node;
    }
}

const treeUtility = new TreeUtility();
const treeNormalizer = new TreeNormalizer();
class ParsedValue {
    constructor(value, graph, graphHash) {
        this.value = value;
        if (typeof graph === "undefined") {
            const node = cssValue.parse(new Cursor(value));
            if (node == null) {
                throw new Error("Couldn't parse css value.");
            }
            this.graph = treeNormalizer.normalize(node);
            treeUtility.convertNumberNodesToNumberValues(this.graph);
        }
        else {
            this.graph = graph;
        }
        if (typeof graphHash === "undefined") {
            this.graphHash = treeUtility.sequenceHash(this.graph).toString();
        }
        else {
            this.graphHash = graphHash;
        }
    }
    clone() {
        return new ParsedValue(this.value, this.graph.clone(), this.graphHash);
    }
}

class KeyframeConfigValidator {
    constructor() {
        this.config = null;
    }
    setConfig(config) {
        this.config = config;
    }
    isSimpleConfig() {
        return this.hasValidToAsString();
    }
    validateConfig() {
        if (this.config == null) {
            throw new Error(`Invalid Arguments: The "config" cannot be null or undefined.`);
        }
    }
    validate(config) {
        this.setConfig(config);
        this.validateName();
        this.validateProperty();
        this.validateToAsParsedValue();
        this.validateControlsAsParsedValues();
        this.validateFromAsParsedValue();
        this.validateStartAt();
        this.validateEndAt();
        this.validateEasingFunction();
        this.validateNodes();
    }
    validateName() {
        this.validateConfig();
        if (!this.hasValidName()) {
            throw new Error(`Invalid Arguments: The "name" property needs to be an string.`);
        }
    }
    hasValidName() {
        return typeof this.config.name === "string";
    }
    validateProperty() {
        this.validateConfig();
        if (!this.hasValidProperty()) {
            throw new Error(`The "property" property needs to be a string.`);
        }
    }
    hasValidProperty() {
        return typeof this.config.property === "string";
    }
    validateToAsString() {
        this.validateConfig();
        if (!this.hasValidToAsString()) {
            throw new Error(`The "to" property needs to be a string, but found ${this.config.to}.`);
        }
    }
    hasValidToAsString() {
        return typeof this.config.to === "string";
    }
    validateToAsParsedValue() {
        this.validateConfig();
        if (!this.hasValidToAsParsedValue()) {
            throw new Error(`The "to" property needs to be a ParsedValue, but found ${this.config.to}.`);
        }
    }
    hasValidToAsParsedValue() {
        return this.config.to instanceof ParsedValue;
    }
    validateFromAsString() {
        this.validateConfig();
        if (typeof this.config.from !== "string") {
            throw new Error(`The "from" property needs to be a string, but found ${this.config.from}.`);
        }
    }
    hasValidFromAsString() {
        return typeof this.config.from === "string";
    }
    validateFromAsParsedValue() {
        this.validateConfig();
        if (!this.hasValidFromAsParsedValue()) {
            throw new Error(`The "from" property needs to be a ParsedValue, but found ${this.config.from}.`);
        }
    }
    hasValidFromAsParsedValue() {
        return this.config.from instanceof ParsedValue;
    }
    validateControlsAsStrings() {
        this.validateConfig();
        if (!this.hasValidControlsAsStrings()) {
            throw new Error(`The "controls" property needs to be made of strings, but found ${this.config.controls}.`);
        }
    }
    hasValidControlsAsStrings() {
        return (Array.isArray(this.config.controls) &&
            this.config.controls.every((control) => typeof control === "string"));
    }
    validateControlsAsParsedValues() {
        this.validateConfig();
        if (!this.hasValidControlsAsParsedValues()) {
            throw new Error(`The "controls" property needs to be made of ParsedValues, but found ${this.config.controls}.`);
        }
    }
    hasValidControlsAsParsedValues() {
        return this.config.controls.every((control) => control instanceof ParsedValue);
    }
    validateStartAt() {
        this.validateConfig();
        if (!this.hasValidStartAt) {
            throw new Error(`The "startAt" property must be a number between 0 and 1.`);
        }
    }
    hasValidStartAt() {
        return (typeof this.config.startAt === "number" &&
            this.config.startAt >= 0 &&
            this.config.startAt <= 1);
    }
    validateEndAt() {
        this.validateConfig();
        if (!this.hasValidEndAt()) {
            throw new Error(`The "endAt" property must be a number between 0 and 1.`);
        }
    }
    hasValidEndAt() {
        return (typeof this.config.endAt === "number" &&
            this.config.endAt >= 0 &&
            this.config.endAt <= 1);
    }
    validateEasingString() {
        this.validateConfig();
        if (!this.hasValidEasingString()) {
            throw new Error(`The "easing" property must be a string.`);
        }
    }
    hasValidEasingString() {
        return typeof this.config.easing === "string";
    }
    validateEasingFunction() {
        this.validateConfig();
        if (!this.hasValidEasingFunction()) {
            throw new Error(`The "easing" property must be a function.`);
        }
    }
    hasValidEasingFunction() {
        return typeof this.config.easing === "function";
    }
    validateNodes() {
        this.validateConfig();
        const config = this.config;
        if (!this.areGraphStructuresEqual()) {
            throw new Error(`Invalid Keyframe: The value types that are being animated do not match. From: ${JSON.stringify(config.from.value)}, To:${JSON.stringify(config.to.value)}, Controls: ${JSON.stringify(config.controls.map((v) => v.value))}`);
        }
    }
    areGraphStructuresEqual() {
        let allStructuresAreEqual = true;
        const config = this.config;
        if (config.to.graphHash !== config.from.graphHash) {
            allStructuresAreEqual = false;
        }
        for (let x = 0; x < config.controls.length; x++) {
            const value = config.controls[x];
            if (value.graphHash !== config.from.graphHash) {
                allStructuresAreEqual = false;
                break;
            }
        }
        return allStructuresAreEqual;
    }
}

const validator$1 = new KeyframeConfigValidator();
class KeyframeUtility {
    _setConfig(config) {
        this.config = config;
        this.result = {};
        validator$1.setConfig(config);
    }
    normalizeConfig(config) {
        this._setConfig(config);
        this._normalizeName();
        this._normalizeProperty();
        this._normalizeValue();
        this._normalizeFrom();
        this._normalizeControls();
        this._normalizeTo();
        this._normalizeStartAt();
        this._normalizeEndAt();
        this._normalizeEasing();
        return this.result;
    }
    _normalizeName() {
        this.result.name = this.config.name;
    }
    _normalizeProperty() {
        this.result.property = this.config.property;
    }
    _normalizeValue() {
        if (this.config.value != null) {
            this.config.to = this.config.value;
            this.config.from = this.config.value;
        }
    }
    _normalizeFrom() {
        if (validator$1.hasValidFromAsString()) {
            this.result.from = new ParsedValue(this.config.from);
        }
        else {
            validator$1.validateFromAsString();
        }
    }
    _normalizeControls() {
        if (!Array.isArray(this.config.controls)) {
            this.config.controls = [];
        }
        if (validator$1.hasValidControlsAsStrings()) {
            this.result.controls = this.config.controls.map((control) => new ParsedValue(control));
        }
        else {
            validator$1.validateControlsAsStrings();
        }
    }
    _normalizeTo() {
        if (validator$1.hasValidToAsString()) {
            this.result.to = new ParsedValue(this.config.to);
        }
        else {
            validator$1.validateToAsString();
        }
    }
    _normalizeStartAt() {
        if (validator$1.hasValidStartAt()) {
            this.result.startAt = this.config.startAt;
        }
        else {
            this.result.startAt = 0;
        }
    }
    _normalizeEndAt() {
        if (validator$1.hasValidEndAt()) {
            this.result.endAt = this.config.endAt;
        }
        else {
            this.result.endAt = 1;
        }
    }
    _normalizeEasing() {
        if (!validator$1.hasValidEasingString() &&
            !validator$1.hasValidEasingFunction()) {
            this.result.easing = easings.linear;
        }
        else if (validator$1.hasValidEasingString()) {
            this.result.easing =
                easings[this.config.easing] ||
                    easings.linear;
        }
        else if (validator$1.hasValidEasingFunction()) {
            this.result.easing = this.config.easing;
        }
    }
}

const validator = new KeyframeConfigValidator();
const utility = new KeyframeUtility();
class Keyframe {
    constructor(config) {
        validator.setConfig(config);
        validator.validate(config);
        this.name = config.name;
        this.property = config.property;
        this.to = config.to;
        this.from = config.from;
        this.result = config.from.clone();
        this.startAt = config.startAt;
        this.endAt = config.endAt;
        this.controls = config.controls || [];
        this.easing = config.easing || easings.linear;
    }
    static fromSimpleConfig(config) {
        return new Keyframe(utility.normalizeConfig(config));
    }
}

const easingOutMap = {
    linear: [1],
    quad: [1, 1],
    cubic: [1, 1, 1],
    quart: [1, 1, 1, 1],
    back: [0, 0, -0.5],
    quint: [1, 1, 1, 1, 1],
    expo: [1, 1, 1, 1, 1, 1],
    circ: [0.65, 0.75, 0.85, 0.95, 1, 1, 1, 1],
    elastic: [2, 2, -1, 1.5, 1.5, 0.75, 1.25, 0.85, 1, 1, 1],
};
const easingInMap = {
    linear: [0],
    quad: [0, 0],
    cubic: [0, 0, 0],
    quart: [0, 0, 0, 0],
    back: [1.5, 1, 1],
    quint: [0, 0, 0, 0, 0],
    expo: [0, 0, 0, 0, 0, 0],
    circ: [0, 0, 0, 0, 0.05, 0.15, 0.25, 0.35],
    elastic: [0, 0, 0, 0.15, -0.25, 0.25, -0.5, -0.5, 2, -1, -1],
};
function createDynamicEasing(easingIn, easingOut) {
    const points = [...easingInMap[easingIn], ...easingOutMap[easingOut]];
    const bezierCurve = new BezierCurve(points);
    return (percentage) => {
        return bezierCurve.valueAt(percentage);
    };
}

const sortAsc = (animatorA, animatorB) => {
    return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};
const sortPercentages = (keyA, keyB) => {
    if (keyA === "from") {
        return -1;
    }
    if (keyB === "from") {
        return 1;
    }
    if (keyA === "to") {
        return 1;
    }
    if (keyB === "to") {
        return -1;
    }
    const keyANumber = parseInt(keyA, 10);
    const keyBNumber = parseInt(keyB, 10);
    if (keyANumber < keyBNumber) {
        return -1;
    }
    else if (keyANumber > keyBNumber) {
        return 1;
    }
    return 0;
};
function getDecimalFromPercentage(percentage) {
    let decimal = parseInt(percentage, 10) / 100;
    decimal = Math.max(0, decimal);
    decimal = Math.min(1, decimal);
    return decimal;
}
class Animation {
    constructor(keyframes) {
        this.animators = [];
        this._time = 0;
        this.initialize(keyframes);
    }
    initialize(keyframes) {
        this._currentValues = {};
        this.animators = keyframes
            .map((keyframe) => {
            if (keyframe instanceof Keyframe) {
                return keyframe;
            }
            else {
                return Keyframe.fromSimpleConfig(keyframe);
            }
        })
            .map((keyframe) => new Animator(keyframe));
        this._createCurrentValues();
        // Sort by time.
        this.animators.sort(sortAsc);
    }
    _createCurrentValues() {
        this._currentValues = this.animators.reduce((results, animator) => {
            const name = animator.keyframe.name;
            const property = animator.keyframe.property;
            let keyframe = results[name];
            if (keyframe == null) {
                keyframe = results[name] = {};
            }
            if (keyframe[property] == null) {
                keyframe[property] = animator.keyframe.result.clone();
            }
            return results;
        }, {});
    }
    _assignValue(keyframe) {
        const currentValue = this._currentValues[keyframe.name][keyframe.property];
        currentValue.value = keyframe.result.value;
        currentValue.graph = keyframe.result.graph;
        currentValue.graphHash = keyframe.result.graphHash;
    }
    _saveCurrentValues() {
        const visitedMap = new Map();
        const animators = this.animators;
        const length = animators.length;
        // Assign all values at least once.
        // This initials values beyond the time we are at.
        for (let x = 0; x < length; x++) {
            const keyframe = animators[x].keyframe;
            const key = `${keyframe.name}|${keyframe.property}`;
            if (!visitedMap.has(key)) {
                visitedMap.set(key, true);
                this._assignValue(keyframe);
            }
        }
        // Assign if the value of the start at was before the time now.
        // Since we have it sorted, the most current will win.
        for (let x = 0; x < length; x++) {
            const keyframe = animators[x].keyframe;
            if (keyframe.startAt <= this._time) {
                this._assignValue(keyframe);
            }
        }
    }
    update(time) {
        this._time = time;
        // Update all keyframes
        this.animators.forEach((animator) => {
            animator.update(time);
        });
        this._saveCurrentValues();
        return this;
    }
    getCurrentValues() {
        return this._currentValues;
    }
    merge(animation) {
        const oldKeyframes = this.animators.map((a) => a.keyframe);
        const newKeyframes = animation.animators.map((a) => a.keyframe);
        this.initialize([...oldKeyframes, ...newKeyframes]);
        return this;
    }
    static fromKeyframes(name, config) {
        const timeKeys = Object.keys(config);
        const keyframes = [];
        let lastKeyFramePercentage = 0;
        timeKeys.sort(sortPercentages);
        for (let index = 0; index < timeKeys.length - 1; index++) {
            const key = timeKeys[index];
            const nextKey = timeKeys[index + 1];
            const currentAnimationKeyframe = config[key];
            const nextAnimationKeyframe = config[nextKey] || null;
            const startAt = lastKeyFramePercentage;
            const endAt = getDecimalFromPercentage(timeKeys[index + 1]);
            lastKeyFramePercentage = endAt;
            Object.keys(currentAnimationKeyframe).forEach((key) => {
                const currentValue = currentAnimationKeyframe[key];
                const nextValue = nextAnimationKeyframe[key];
                if (nextValue == null) {
                    throw new Error(`All keyframe declarations need to have the same properties. Missing: '${key}'`);
                }
                const easingIn = typeof currentValue === "string"
                    ? "linear"
                    : currentValue.easeOut || "linear";
                const easingOut = typeof nextValue === "string"
                    ? "linear"
                    : nextValue.easeIn || "linear";
                const easing = createDynamicEasing(easingIn, easingOut);
                const controlsIn = typeof currentValue === "string" ? [] : currentValue.controlsIn || [];
                const controlsOut = typeof nextValue === "string" ? [] : nextValue.controlsOut || [];
                const controls = [...controlsIn, ...controlsOut];
                const from = typeof currentValue === "string" ? currentValue : currentValue.value;
                const to = typeof nextValue === "string" ? nextValue : nextValue.value;
                const keyframeConfig = {
                    name,
                    property: key,
                    from,
                    to,
                    controls,
                    easing,
                    startAt,
                    endAt,
                };
                keyframes.push(Keyframe.fromSimpleConfig(keyframeConfig));
            });
        }
        return new Animation(keyframes);
    }
}

const states$1 = {
    ACTIVE: 1,
    STOPPED: 0,
    DISPOSED: -1,
};
class Observer {
    constructor(type, callback, unbind) {
        this.type = type;
        this.callback = callback;
        this.unbind = unbind;
        this.state = states$1.ACTIVE;
    }
    notify(event) {
        if (event.type === this.type) {
            this.callback(event);
        }
    }
    stop() {
        if (this.state === states$1.ACTIVE) {
            this.state = states$1.STOPPED;
        }
    }
    start() {
        if (this.state !== states$1.DISPOSED) {
            this.state = states$1.ACTIVE;
        }
    }
    dispose() {
        this.state = states$1.DISPOSED;
        this.unbind();
    }
}

class TimeObserver extends Observer {
    constructor(time, callback, unbind) {
        super("TIME_OBSERVER", callback, unbind);
        this.time = time;
    }
    notify(event) {
        if (typeof event.lastTime === "number" && typeof event.time === "number") {
            const high = Math.max(event.time, event.lastTime);
            const low = Math.min(event.time, event.lastTime);
            if (this.time >= low && this.time <= high) {
                this.callback(event);
            }
        }
    }
}

class Observable {
    constructor() {
        this.observers = [];
    }
    observeTime(time, callback) {
        const observer = new TimeObserver(time, callback, () => {
            const index = this.observers.indexOf(observer);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        });
        this.observers.push(observer);
        return observer;
    }
    observe(type, callback) {
        const observer = new Observer(type, callback, () => {
            const index = this.observers.indexOf(observer);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        });
        this.observers.push(observer);
        return observer;
    }
    notify(event) {
        this.observers.forEach((observer) => {
            observer.notify(event);
        });
    }
    dispose() {
        this.observers = [];
    }
}

class DefaultClock {
    constructor() {
        this.registeredCallbacks = new Map();
        this._tick = this._tick.bind(this);
        this.animationFrame = null;
    }
    _tick() {
        this.registeredCallbacks.forEach((callback) => {
            callback();
        });
        if (this.registeredCallbacks.size > 0) {
            this.animationFrame = window.requestAnimationFrame(this._tick);
        }
        else {
            this.animationFrame = null;
        }
    }
    register(callback) {
        this.registeredCallbacks.set(callback, callback);
        if (this.animationFrame == null) {
            this._tick();
        }
    }
    unregister(callback) {
        this.registeredCallbacks.delete(callback);
    }
    now() {
        return performance.now();
    }
}

class GraphOperations {
    constructor() {
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
        this.multiply = this.multiply.bind(this);
        this.divide = this.divide.bind(this);
    }
    add(nodes) {
        if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
            const leftNode = nodes[0];
            const rightNode = nodes[1];
            const resultNode = nodes[2];
            resultNode.value = leftNode.value + rightNode.value;
        }
    }
    subtract(nodes) {
        if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
            const leftNode = nodes[0];
            const rightNode = nodes[1];
            const resultNode = nodes[2];
            resultNode.value =
                leftNode.value - rightNode.value;
        }
    }
    multiply(nodes) {
        if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
            const leftNode = nodes[0];
            const rightNode = nodes[1];
            const resultNode = nodes[2];
            resultNode.value =
                leftNode.value * rightNode.value;
        }
    }
    divide(nodes) {
        if (this.canOperate(nodes) && this.isNumberNode(nodes)) {
            const leftNode = nodes[0];
            const rightNode = nodes[1];
            const resultNode = nodes[2];
            resultNode.value =
                leftNode.value / rightNode.value;
        }
    }
    isNumberNode(nodes) {
        return nodes[0].name === "number";
    }
    canOperate(nodes) {
        return nodes.length === 3;
    }
}

class GraphOperator {
    constructor() {
        this.graphsVisitor = new GraphsVisitor();
        this.visitor = new Visitor$1();
        this.graphOperations = new GraphOperations();
    }
    assign(graph, number) {
        this.visitor.setCallback((node) => {
            if (node.name === "number") {
                node.value = number;
            }
        });
        this.visitor.visitDown(graph);
    }
    add(graphs) {
        this.graphsVisitor.setCallback(this.graphOperations.add);
        this.graphsVisitor.visitDown(graphs);
    }
    subtract(graphs) {
        this.graphsVisitor.setCallback(this.graphOperations.subtract);
        this.graphsVisitor.visitDown(graphs);
    }
    multiply(graphs) {
        this.graphsVisitor.setCallback(this.graphOperations.multiply);
        this.graphsVisitor.visitDown(graphs);
    }
    divide(graphs) {
        this.graphsVisitor.setCallback(this.graphOperations.divide);
        this.graphsVisitor.visitDown(graphs);
    }
    invert(graph) {
        const negativeOne = graph.clone();
        this.assign(negativeOne, -1);
        const graphs = [graph, negativeOne, graph];
        this.graphsVisitor.setCallback(this.graphOperations.multiply);
        this.graphsVisitor.visitDown(graphs);
    }
}

const FORWARD$1 = 1;
const BACKWARD = -1;
class SlopeAnimationBuilder {
    constructor() {
        this.animation = null;
        this.slopeAnimation = null;
        this.direction = 0;
        this.newDuration = 0;
        this.duration = 0;
        this.offset = 0;
        this.delta = 0.0001;
        this.deltaStepValues = null;
        this.scaledValues = null;
        this.deltaValues = null;
        this.nowValues = null;
        this.diffValues = null;
        this.derivativeValues = null;
        this.scaledValues = null;
        this.toValues = null;
        this.graphOperator = new GraphOperator();
    }
    cloneValues(values) {
        return Object.keys(values).reduce((clone, name) => {
            clone[name] = Object.keys(values[name]).reduce((clone, property) => {
                clone[property] = values[name][property].clone();
                return clone;
            }, {});
            return clone;
        }, {});
    }
    build(animation, offset, duration, newDuration, direction) {
        this.animation = animation;
        this.offset = offset;
        this.duration = duration;
        this.newDuration = newDuration;
        this.direction = direction;
        this.cacheValues();
        this.calculate();
        this.createSlopeTimeline();
        return this.slopeAnimation;
    }
    cacheValues() {
        this.animation.update(this.offset);
        this.nowValues = this.cloneValues(this.animation.getCurrentValues());
        this.deltaStepValues = this.cloneValues(this.nowValues);
        this.scaleValues = this.cloneValues(this.nowValues);
        this.diffValues = this.cloneValues(this.nowValues);
        this.derivativeValues = this.cloneValues(this.nowValues);
        this.scaledValues = this.cloneValues(this.nowValues);
        this.toValues = this.cloneValues(this.nowValues);
        this.cacheDeltaStepValues();
        this.cacheScaleValues();
        if (this.direction === FORWARD$1) {
            this.cacheDeltaValueForward();
        }
        else if (this.direction === BACKWARD) {
            this.cacheDeltaValueBackward();
        }
        else {
            this.cacheDeltaValueStopped();
        }
    }
    cacheDeltaStepValues() {
        Object.keys(this.deltaStepValues).forEach((name) => {
            Object.keys(this.deltaStepValues[name]).forEach((property) => {
                this.graphOperator.assign(this.deltaStepValues[name][property].graph, this.delta);
            });
        });
    }
    cacheScaleValues() {
        const scale = this.newDuration / this.duration;
        Object.keys(this.scaleValues).forEach((name) => {
            Object.keys(this.scaleValues[name]).forEach((property) => {
                this.graphOperator.assign(this.scaleValues[name][property].graph, scale);
            });
        });
    }
    cacheDeltaValueForward() {
        this.animation.update(this.offset + this.delta);
        this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
    }
    cacheDeltaValueBackward() {
        this.animation.update(this.offset - this.delta);
        this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
    }
    cacheDeltaValueStopped() {
        this.animation.update(this.offset);
        this.deltaValues = this.cloneValues(this.animation.getCurrentValues());
    }
    calculate() {
        Object.keys(this.nowValues).forEach((name) => {
            Object.keys(this.nowValues[name]).forEach((property) => {
                const now = this.nowValues[name][property].graph;
                const delta = this.deltaValues[name][property].graph;
                const diff = this.diffValues[name][property].graph;
                const deltaStep = this.deltaStepValues[name][property].graph;
                const derivative = this.derivativeValues[name][property].graph;
                const scale = this.scaleValues[name][property].graph;
                const scaled = this.scaledValues[name][property].graph;
                const to = this.toValues[name][property].graph;
                this.graphOperator.subtract([delta, now, diff]);
                this.graphOperator.divide([diff, deltaStep, derivative]);
                this.graphOperator.multiply([derivative, scale, scaled]);
                this.graphOperator.add([now, scaled, to]);
                // Lets update the ParsedValue.value.
                this.toValues[name][property].value = to.toString();
            });
        });
    }
    createSlopeTimeline() {
        const keyframes = Object.keys(this.nowValues)
            .map((name) => {
            return Object.keys(this.nowValues[name]).map((property) => {
                return new Keyframe({
                    name,
                    property,
                    from: this.nowValues[name][property],
                    controls: [],
                    to: this.toValues[name][property],
                    startAt: 0,
                    endAt: 1,
                    easing: easings.linear,
                });
            });
        })
            .flat();
        this.slopeAnimation = new Animation(keyframes);
    }
}

const defaultClock = new DefaultClock();
const DEFAULT = 0;
const ALTERNATE = 1;
const FORWARD = 1;
const REVERSE = -1;
const STOPPED = 0;
const repeatDirections = {
    DEFAULT,
    ALTERNATE,
};
const states = {
    FORWARD,
    REVERSE,
    STOPPED,
};
function defaultRender() { }
class Player extends Observable {
    constructor() {
        super();
        this._animation = null;
        this._timeScale = 1;
        this._time = 0;
        this._step = 0;
        this._duration = 0;
        this._lastTimestamp = 0;
        this._iterations = 0;
        this._repeat = 1;
        this._repeatDirection = DEFAULT;
        this._clock = defaultClock;
        this._state = STOPPED;
        this._render = defaultRender;
        this._slopeAnimationBuilder = new SlopeAnimationBuilder();
        this._delay = 0;
        this.tick = this.tick.bind(this);
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
    }
    get timeScale() {
        return this._timeScale;
    }
    set timeScale(value) {
        if (value > 0) {
            this._timeScale = value;
        }
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        if (typeof value !== "number") {
            value = 0;
        }
        // Virtually Nothing. All Math blows up if the duration is "0".
        if (value <= 0) {
            value = 0.00001;
        }
        this._duration = value;
    }
    get repeat() {
        return this._repeat;
    }
    set repeat(value) {
        if (typeof value !== "number" && value > 0) {
            return;
        }
        this._repeat = value;
    }
    get repeatDirection() {
        return this._repeatDirection;
    }
    set repeatDirection(value) {
        if (value !== 0 && value !== 1) {
            return;
        }
        this._repeatDirection = value;
    }
    get state() {
        return this._state;
    }
    get animation() {
        return this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    get render() {
        return this._render;
    }
    set render(render) {
        this._render = render;
    }
    get iterations() {
        return this._iterations;
    }
    get clock() {
        return this._clock;
    }
    set clock(value) {
        this._clock = value;
    }
    get delay() {
        return this._delay;
    }
    set delay(value) {
        this._delay = value;
    }
    tick() {
        const timestamp = this._clock.now();
        const deltaTime = timestamp - this._lastTimestamp;
        this._step = (deltaTime / this._duration) * this._timeScale;
        if (this._step > 1) {
            this._step = 1;
        }
        // This helps with unneeded renders as well as delays.
        if (deltaTime <= 0) {
            return;
        }
        if (this._state === REVERSE) {
            this.stepBackward();
        }
        else if (this._state === FORWARD) {
            this.stepForward();
        }
        this._lastTimestamp = timestamp;
    }
    stepForward() {
        let time = this._time + this._step;
        let lastTime = this._time;
        const repeatDirection = this._repeatDirection;
        if (time >= 1) {
            this._iterations++;
            this.notify({
                type: "TICK",
                time: 1,
                lastTime,
                animation: this._animation,
            });
            if (this._iterations >= this._repeat) {
                this.seek(1);
                this.stop();
                return;
            }
            if (repeatDirection === ALTERNATE) {
                const adjustedTime = 1 - (time - 1);
                this._time = 1;
                this.seek(adjustedTime);
                this._state = REVERSE;
            }
            else {
                const adjustedTime = time - 1;
                this.notify({
                    type: "TICK",
                    time: 0,
                    lastTime,
                    animation: this._animation,
                });
                this._time = 0;
                this.seek(adjustedTime);
                this._state = FORWARD;
            }
        }
        else {
            this.seek(time);
        }
    }
    stepBackward() {
        let time = this._time - this._step;
        let lastTime = this._time;
        const repeatDirection = this._repeatDirection;
        if (time <= 0) {
            this._iterations++;
            this.notify({
                type: "TICK",
                time: 0,
                lastTime,
                animation: this._animation,
            });
            if (this._iterations >= this._repeat) {
                this.seek(0);
                this.stop();
                return;
            }
            if (repeatDirection === ALTERNATE) {
                const adjustedTime = time * -1;
                this._time = 0;
                this.seek(adjustedTime);
                this._state = FORWARD;
            }
            else {
                const adjustedTime = 1 + time;
                this.notify({
                    type: "TICK",
                    time: 1,
                    lastTime,
                    animation: this._animation,
                });
                this._time = 1;
                this.seek(adjustedTime);
                this._state = REVERSE;
            }
        }
        else {
            this.seek(time);
        }
    }
    seek(time) {
        const lastTime = this._time;
        this._time = time;
        if (this._animation == null) {
            return;
        }
        this._animation.update(this._time);
        this._render(this._animation);
        this.notify({
            type: "TICK",
            time,
            lastTime,
            animation: this._animation,
        });
        return this;
    }
    stop() {
        if (this._state !== STOPPED) {
            this._state = STOPPED;
            this._clock.unregister(this.tick);
            this.notify({
                type: "STOPPED",
                animation: this._animation,
            });
        }
        return this;
    }
    play() {
        if (this._state !== FORWARD) {
            this._lastTimestamp = this._clock.now() + this._delay;
            this._state = FORWARD;
            this._clock.register(this.tick);
            this.notify({
                type: "PLAYED",
                animation: this._animation,
            });
        }
        return this;
    }
    reverse() {
        if (this._state !== REVERSE) {
            this._lastTimestamp = this._clock.now() + this._delay;
            this._state = REVERSE;
            this._clock.register(this.tick);
            this.notify({
                type: "REVERSED",
                animation: this._animation,
            });
        }
        return this;
    }
    dispose() {
        this.stop();
        super.dispose();
    }
    static get repeatDirections() {
        return repeatDirections;
    }
    static get states() {
        return states;
    }
}

export { Animation, Animator, BezierCurve, Keyframe, Player, createDynamicEasing, easings };
//# sourceMappingURL=index.esm.js.map
