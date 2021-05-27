const defaultPoints = [];
class BezierCurve {
    constructor(points) {
        this.points = defaultPoints;
        this.reducedPoints = defaultPoints;
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

const emptyArray = [];
class Animator {
    constructor(keyframe) {
        this.keyframe = keyframe;
        this.time = 0;
        this.bezierCurve = new BezierCurve([]);
    }
    getNumberValue(from, controls = emptyArray, to) {
        const elapsedTime = this.time - this.keyframe.startAt;
        const animationDuration = this.keyframe.endAt - this.keyframe.startAt;
        const timeWithEasing = this.keyframe.easing(elapsedTime / animationDuration);
        const points = [from, ...controls, to];
        this.bezierCurve.setPoints(points);
        return this.bezierCurve.valueAt(timeWithEasing);
    }
    getStringValue(from, to) {
        if (this.time >= this.keyframe.startAt) {
            return to;
        }
        else {
            return from;
        }
    }
    traverse(fromObject, controlsObject, toObject, resultObject) {
        Object.keys(fromObject).forEach((key) => {
            const from = fromObject[key];
            const to = toObject[key];
            const controls = controlsObject.map((c) => c[key]);
            if (typeof from === "number") {
                resultObject[key] = this.getNumberValue(from, controls, to);
            }
            else if (typeof from === "string") {
                resultObject[key] = this.getStringValue(from, to);
            }
            else if (typeof from === "object" && from != null) {
                this.traverse(fromObject[key], controlsObject[key], toObject[key], resultObject[key]);
            }
        });
    }
    update(time) {
        this.time = time;
        if (typeof this.keyframe.from === "string") {
            this.keyframe.result = this.getStringValue(this.keyframe.from, this.keyframe.to);
        }
        else if (typeof this.keyframe.from === "number") {
            this.keyframe.result = this.getNumberValue(this.keyframe.from, this.keyframe.controls, this.keyframe.to);
        }
        else if (typeof this.keyframe.from === "object" &&
            this.keyframe.from != null) {
            this.traverse(this.keyframe.from, this.keyframe.controls, this.keyframe.to, this.keyframe.result);
        }
        return this.keyframe.result;
    }
}

const sortAsc = (animatorA, animatorB) => {
    return animatorA.keyframe.startAt - animatorB.keyframe.startAt;
};
class Animation {
    constructor(name, keyframes) {
        this._time = 0;
        this.name = "";
        this.animators = [];
        this.initialize(keyframes);
    }
    initialize(keyframes) {
        this._currentValues = {};
        this.animators = keyframes.map((keyframe) => new Animator(keyframe));
        this._createCurrentValues();
        // Sort by time.
        this.animators.sort(sortAsc);
    }
    _createCurrentValues() {
        this._currentValues = this.animators.reduce((results, animator) => {
            const keyframe = animator.keyframe;
            const property = keyframe.property;
            results[property] = keyframe.result;
            return results;
        }, {});
    }
    _saveCurrentValues() {
        const visitedMap = new Map();
        const animators = this.animators;
        const length = animators.length;
        // Assign all values at least once.
        // This initials values beyond the time we are at.
        for (let x = 0; x < length; x++) {
            const keyframe = animators[x].keyframe;
            const key = keyframe.property;
            if (!visitedMap.has(key)) {
                visitedMap.set(key, true);
                this._currentValues[keyframe.property] = keyframe.result;
            }
        }
        // Assign if the value of the start at was before the time now.
        // Since we have it sorted, the most current will win.
        for (let x = 0; x < length; x++) {
            const keyframe = animators[x].keyframe;
            if (keyframe.startAt <= this._time) {
                this._currentValues[keyframe.property] = keyframe.result;
            }
        }
    }
    update(time) {
        this._time = time;
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

const complexFrameKeys = ["controlsIn", "controlsOut", "easeIn", "easeOut"];
class KeyframesGenerator {
    constructor() {
        this.transformValue = (value) => value;
        this.sortPercentages = (keyA, keyB) => {
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
            const keyAParts = keyA.split("%");
            const keyBParts = keyB.split("%");
            const keyANumber = parseFloat(keyAParts[0]);
            const keyBNumber = parseFloat(keyBParts[0]);
            if (keyANumber < keyBNumber) {
                return -1;
            }
            else if (keyANumber > keyBNumber) {
                return 1;
            }
            return 0;
        };
    }
    setTransformValue(transformValue) {
        this.transformValue = transformValue;
    }
    isComplexKeyframe(value) {
        const keys = Object.keys(value);
        return (keys.includes("value") && keys.some((k) => complexFrameKeys.includes(k)));
    }
    getDecimalFromPercentage(percentage) {
        if (percentage === "to") {
            return 1;
        }
        if (percentage === "from") {
            return 0;
        }
        const percentageParts = percentage.split("%");
        let decimal = parseFloat(percentageParts[0]) / 100;
        if (isNaN(decimal)) {
            throw new Error(`Unknown keyframe step: ${decimal}. Expected format 10% or 10.01% etc`);
        }
        decimal = Math.max(0, decimal);
        decimal = Math.min(1, decimal);
        return decimal;
    }
    getEaseIn(currentValue) {
        if (this.isComplexKeyframe(currentValue) && currentValue.easeOut != null) {
            return currentValue.easeOut || "linear";
        }
        else {
            return "linear";
        }
    }
    getEaseOut(nextValue) {
        if (this.isComplexKeyframe(nextValue) && nextValue.easeIn != null) {
            return nextValue.easeIn || "linear";
        }
        else {
            return "linear";
        }
    }
    getControlsIn(currentValue) {
        if (this.isComplexKeyframe(currentValue) &&
            Array.isArray(currentValue.controlsOut)) {
            return currentValue.controlsOut;
        }
        else {
            return [];
        }
    }
    getControlsOut(nextValue) {
        if (this.isComplexKeyframe(nextValue) &&
            Array.isArray(nextValue.controlsIn)) {
            return nextValue.controlsIn;
        }
        else {
            return [];
        }
    }
    getFrom(currentValue) {
        if (this.isComplexKeyframe(currentValue)) {
            return this.transformValue(currentValue.value);
        }
        else {
            return this.transformValue(currentValue);
        }
    }
    getTo(nextValue) {
        if (this.isComplexKeyframe(nextValue)) {
            return this.transformValue(nextValue.value);
        }
        else {
            return this.transformValue(nextValue);
        }
    }
    generate(animationKeyframes) {
        const timeKeys = Object.keys(animationKeyframes);
        const keyframes = [];
        let lastKeyFramePercentage = 0;
        timeKeys.sort(this.sortPercentages);
        for (let index = 0; index < timeKeys.length - 1; index++) {
            const key = timeKeys[index];
            const nextKey = timeKeys[index + 1];
            const currentAnimationKeyframe = animationKeyframes[key];
            const nextAnimationKeyframe = animationKeyframes[nextKey] || null;
            const startAt = lastKeyFramePercentage;
            const endAt = this.getDecimalFromPercentage(timeKeys[index + 1]);
            lastKeyFramePercentage = endAt;
            Object.keys(currentAnimationKeyframe).forEach((key) => {
                const currentValue = currentAnimationKeyframe[key];
                const nextValue = nextAnimationKeyframe[key];
                if (nextValue == null) {
                    throw new Error(`All keyframe declarations need to have the same properties. Missing: '${key}'`);
                }
                const easingIn = this.getEaseIn(currentValue);
                const easingOut = this.getEaseOut(nextValue);
                const easing = createDynamicEasing(easingIn, easingOut);
                const controlsIn = this.getControlsIn(currentValue);
                const controlsOut = this.getControlsOut(nextValue);
                const controls = [...controlsIn, ...controlsOut];
                const from = this.getFrom(currentValue);
                const to = this.getTo(nextValue);
                const keyframe = new Keyframe({
                    property: key,
                    from,
                    to,
                    controls,
                    easing,
                    startAt,
                    endAt,
                });
                keyframes.push(keyframe);
            });
        }
        return keyframes;
    }
}

const keyframesGenerator = new KeyframesGenerator();
class Keyframe {
    constructor(config) {
        this.property = config.property;
        this.to = config.to;
        this.from = config.from;
        this.result = JSON.parse(JSON.stringify(config.from));
        this.startAt = typeof config.startAt === "number" ? config.startAt : 0;
        this.endAt = typeof config.endAt === "number" ? config.endAt : 1;
        this.controls = Array.isArray(config.controls) ? config.controls : [];
        this.easing =
            typeof config.easing === "function" ? config.easing : easings.linear;
    }
    static createKeyframes(animationKeyframes) {
        return keyframesGenerator.generate(animationKeyframes);
    }
}

export { Animation, Animator, BezierCurve, Keyframe, Player, createDynamicEasing, easings };
//# sourceMappingURL=index.esm.js.map
