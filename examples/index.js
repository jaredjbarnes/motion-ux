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
        this.animators = [];
        this.name = name;
        this.currentValues = {};
        this.keyframes = keyframes;
    }
    set keyframes(keyframes) {
        this.animators = keyframes.map((keyframe) => new Animator(keyframe));
        this._createCurrentValues();
        // Sort by time.
        this.animators.sort(sortAsc);
    }
    get keyframes() {
        return this.animators.map((a) => a.keyframe);
    }
    _createCurrentValues() {
        this.currentValues = this.animators.reduce((results, animator) => {
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
                this.currentValues[keyframe.property] = keyframe.result;
            }
        }
        // Assign if the value of the start at was before the time now.
        // Since we have it sorted, the most current will win.
        for (let x = 0; x < length; x++) {
            const keyframe = animators[x].keyframe;
            if (keyframe.startAt <= this._time) {
                this.currentValues[keyframe.property] = keyframe.result;
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
    clone() {
        const keyframes = this.animators.map((a) => a.keyframe.clone());
        return new Animation(this.name, keyframes);
    }
}

const states = {
    ACTIVE: 1,
    STOPPED: 0,
    DISPOSED: -1,
};
class Observer {
    constructor(type, callback, unbind) {
        this.type = type;
        this.callback = callback;
        this.unbind = unbind;
        this.state = states.ACTIVE;
    }
    notify(event) {
        if (event.type === this.type) {
            this.callback(event);
        }
    }
    stop() {
        if (this.state === states.ACTIVE) {
            this.state = states.STOPPED;
        }
    }
    start() {
        if (this.state !== states.DISPOSED) {
            this.state = states.ACTIVE;
        }
    }
    dispose() {
        this.state = states.DISPOSED;
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
    observeTimeOnce(time, callback) {
        const observer = this.observeTime(time, (event) => {
            callback(event);
            observer.dispose();
        });
        return observer;
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
    observeOnce(type, callback) {
        const observer = this.observe(type, (event) => {
            callback(event);
            observer.dispose();
        });
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
    clearObservers() {
        this.observers = [];
    }
    dispose() {
        this.clearObservers();
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
function defaultRender() { }
var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["REVERSE"] = -1] = "REVERSE";
    PlayerState[PlayerState["STOPPED"] = 0] = "STOPPED";
    PlayerState[PlayerState["FORWARD"] = 1] = "FORWARD";
})(PlayerState || (PlayerState = {}));
var RepeatDirection;
(function (RepeatDirection) {
    RepeatDirection[RepeatDirection["DEFAULT"] = 0] = "DEFAULT";
    RepeatDirection[RepeatDirection["ALTERNATE"] = 1] = "ALTERNATE";
})(RepeatDirection || (RepeatDirection = {}));
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
        this._repeatDirection = RepeatDirection.DEFAULT;
        this._clock = defaultClock;
        this._state = PlayerState.STOPPED;
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
    set iterations(value) {
        if (value >= 0) {
            this._iterations = value;
        }
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
        if (this._state === PlayerState.REVERSE) {
            this.stepBackward();
        }
        else if (this._state === PlayerState.FORWARD) {
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
            if (repeatDirection === RepeatDirection.ALTERNATE) {
                const adjustedTime = 1 - (time - 1);
                this._time = 1;
                this.seek(adjustedTime);
                this._state = PlayerState.REVERSE;
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
                this._state = PlayerState.FORWARD;
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
            if (repeatDirection === RepeatDirection.ALTERNATE) {
                const adjustedTime = time * -1;
                this._time = 0;
                this.seek(adjustedTime);
                this._state = PlayerState.FORWARD;
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
                this._state = PlayerState.REVERSE;
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
        if (this._state !== PlayerState.STOPPED) {
            this._state = PlayerState.STOPPED;
            this._clock.unregister(this.tick);
            this.notify({
                type: "STOPPED",
                animation: this._animation,
            });
        }
        return this;
    }
    play() {
        if (this._state !== PlayerState.FORWARD) {
            this._lastTimestamp = this._clock.now() + this._delay;
            this._state = PlayerState.FORWARD;
            this._clock.register(this.tick);
            this.notify({
                type: "PLAYED",
                animation: this._animation,
            });
        }
        return this;
    }
    reverse() {
        if (this._state !== PlayerState.REVERSE) {
            this._lastTimestamp = this._clock.now() + this._delay;
            this._state = PlayerState.REVERSE;
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
    return percentage * percentage * percentage;
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
    return percentage == 0 ? 0 : Math.pow(2, 10 * (percentage - 1));
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
    return -(Math.sqrt(1 - percentage * percentage) - 1);
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
    return percentage * percentage * ((s + 1) * percentage - s);
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
            return currentValue.controlsOut.map((v) => this.transformValue(v));
        }
        else {
            return [];
        }
    }
    getControlsOut(nextValue) {
        if (this.isComplexKeyframe(nextValue) &&
            Array.isArray(nextValue.controlsIn)) {
            return nextValue.controlsIn.map((v) => this.transformValue(v));
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
                    throw new Error(`All keyframe declarations need to have the same properties. Missing '${key}' from one of the keyframes. ${JSON.stringify(animationKeyframes)}`);
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

const keyframesGenerator$1 = new KeyframesGenerator();
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
        return keyframesGenerator$1.generate(animationKeyframes);
    }
    clone() {
        return new Keyframe({
            property: this.property,
            to: JSON.parse(JSON.stringify(this.to)),
            from: JSON.parse(JSON.stringify(this.from)),
            startAt: this.startAt,
            endAt: this.endAt,
            controls: this.controls.map((c) => JSON.parse(JSON.stringify(c))),
            easing: this.easing,
        });
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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

const visitor = new Visitor();
const keyframesGenerator = new KeyframesGenerator();
keyframesGenerator.setTransformValue((value) => {
    return convertToValue(value);
});
const convertToValue = (value) => {
    const node = cssValue.exec(value);
    if (node == null) {
        return [];
    }
    visitor
        .setRoot(node)
        .selectRoot()
        .flatten()
        .clear()
        .select((n) => n.name === "optional-spaces")
        .remove()
        .clear()
        .select((n) => n.name === "spaces")
        .transform((n) => {
        n.value = " ";
        return n;
    });
    return node.children.map((n) => {
        if (n.name === "number") {
            return parseFloat(n.value);
        }
        else {
            return n.value;
        }
    });
};
class CssKeyframe extends Keyframe {
    constructor(_a) {
        var { from, to, easing = "linear", controls = [] } = _a, config = __rest(_a, ["from", "to", "easing", "controls"]);
        const toValue = convertToValue(to);
        const fromValue = convertToValue(from);
        const controlsValues = controls.map((c) => convertToValue(c));
        const easingValue = easings[easing];
        super(Object.assign(Object.assign({}, config), { from: fromValue, to: toValue, controls: controlsValues, easing: easingValue }));
    }
    static createKeyframes(animationKeyframes) {
        return keyframesGenerator.generate(animationKeyframes);
    }
}

const emptyFn$1 = () => 0;
class ObjectVisitor {
    constructor(callback = emptyFn$1) {
        this.visitor = emptyFn$1;
        this.setVisitor(callback);
    }
    visit(object) {
        this.walk(object);
    }
    walk(object) {
        if (typeof object === "object" && object != null) {
            for (let key in object) {
                if (typeof object[key] === "number") {
                    object[key] = this.visitor(object[key]);
                }
                else if (typeof object[key] === "object") {
                    this.walk(object[key]);
                }
            }
        }
    }
    setVisitor(visitor) {
        if (typeof visitor === "function") {
            this.visitor = visitor;
        }
        else {
            this.visitor = emptyFn$1;
        }
        this.visitor = visitor;
    }
}

const emptyFn = () => 0;
class ObjectsVisitor {
    constructor(callback = emptyFn) {
        this.visitor = emptyFn;
        this.setVisitor(callback);
    }
    visit(left, right, output) {
        this.walk(left, right, output);
    }
    walk(left, right, output) {
        if (typeof left === "object" && left != null) {
            for (let key in left) {
                if (typeof left[key] === "number" &&
                    typeof right[key] === "number" &&
                    typeof output[key] === "number") {
                    output[key] = this.visitor(left[key], right[key]);
                }
                else if (typeof left[key] === "object") {
                    this.walk(left[key], right[key], output[key]);
                }
            }
        }
    }
    setVisitor(visitor) {
        if (typeof visitor === "function") {
            this.visitor = visitor;
        }
        else {
            this.visitor = emptyFn;
        }
        this.visitor = visitor;
    }
}

const add = (left, right) => {
    return left + right;
};
const subtract = (left, right) => {
    return left - right;
};
const multiply = (left, right) => {
    return left * right;
};
const divide = (left, right) => {
    return left / right;
};
class ObjectOperator {
    constructor() {
        this.objectsVisitor = new ObjectsVisitor();
        this.visitor = new ObjectVisitor();
    }
    assign(object, number) {
        this.visitor.setVisitor(() => {
            return number;
        });
        this.visitor.visit(object);
    }
    add(left, right, output) {
        this.objectsVisitor.setVisitor(add);
        this.objectsVisitor.visit(left, right, output);
    }
    subtract(left, right, output) {
        this.objectsVisitor.setVisitor(subtract);
        this.objectsVisitor.visit(left, right, output);
    }
    multiply(left, right, output) {
        this.objectsVisitor.setVisitor(multiply);
        this.objectsVisitor.visit(left, right, output);
    }
    divide(left, right, output) {
        this.objectsVisitor.setVisitor(divide);
        this.objectsVisitor.visit(left, right, output);
    }
}

new Animation("null", [
    new Keyframe({ from: 0, to: 0, property: "null" }),
]);
new ObjectOperator();

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol();class s$4{constructor(t,s){if(s!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t$2&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n$6=new Map,o$4=t=>{let o=n$6.get(t);return void 0===o&&n$6.set(t,o=new s$4(t,e$3)),o},r$3=t=>o$4("string"==typeof t?t:t+""),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,o)=>e+(t=>{if(t instanceof s$4)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1]),t[0]);return o$4(n)},S$1=(e,s)=>{t$2?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s);}));},u$1=t$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3,e$2,h$4,r$2;const o$3={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$5=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:o$3,reflect:!1,hasChanged:n$5};class a$2 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(u$1(i));}else void 0!==i&&s.push(u$1(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$3){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$3.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$3.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$5)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$2.finalized=!0,a$2.elementProperties=new Map,a$2.elementStyles=[],a$2.shadowRootOptions={mode:"open"},null===(e$2=(s$3=globalThis).reactiveElementPlatformSupport)||void 0===e$2||e$2.call(s$3,{ReactiveElement:a$2}),(null!==(h$4=(r$2=globalThis).reactiveElementVersions)&&void 0!==h$4?h$4:r$2.reactiveElementVersions=[]).push("1.0.0-rc.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1,i$3,s$2,e$1;const o$2=globalThis.trustedTypes,l$2=o$2?o$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$4=`lit$${(Math.random()+"").slice(9)}$`,h$3="?"+n$4,r$1=`<${h$3}>`,u=document,c$1=(t="")=>u.createComment(t),d$2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$1=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c$1(),t),t,void 0,s);}return n.I(t),n},E=u.createTreeWalker(u,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m?u=f:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$1:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$4+a):s+n$4+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$2?l$2.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$4)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$4),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$4),i=t.length-1;if(i>0){e.textContent=o$2?o$2.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c$1()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c$1());}}}else if(8===e.nodeType)if(e.data===h$3)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$4,t+1));)d.push({type:7,index:l}),t+=n$4.length-1;}l++;}}static createElement(t,i){const s=u.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d$2(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S(this,t,i),d$2(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$1(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c$1()),this.k(c$1()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S(this,t,i,0),l=!d$2(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d$2(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S(this,t);}}null===(i$3=(t$1=globalThis).litHtmlPlatformSupport)||void 0===i$3||i$3.call(t$1,N,C),(null!==(s$2=(e$1=globalThis).litHtmlVersions)&&void 0!==s$2?s$2:e$1.litHtmlVersions=[]).push("2.0.0-rc.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var i$2,l$1,o$1,s$1,n$3,a;(null!==(i$2=(a=globalThis).litElementVersions)&&void 0!==i$2?i$2:a.litElementVersions=[]).push("3.0.0-rc.2");class h$2 extends a$2{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h$2.finalized=!0,h$2._$litElement$=!0,null===(o$1=(l$1=globalThis).litElementHydrateSupport)||void 0===o$1||o$1.call(l$1,{LitElement:h$2}),null===(n$3=(s$1=globalThis).litElementPlatformSupport)||void 0===n$3||n$3.call(s$1,{LitElement:h$2});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i$1=t=>(...i)=>({_$litDirective$:t,values:i});class s{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d$1=o=>void 0===o.strings;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=(i,t)=>{var s,e;const o=i.N;if(void 0===o)return !1;for(const i of o)null===(e=(s=i).O)||void 0===e||e.call(s,t,!1),r(i,t);return !0},o=i=>{let t,s;do{if(void 0===(t=i.M))break;s=t.N,s.delete(i),i=t;}while(0===(null==s?void 0:s.size))},h$1=i=>{for(let t;t=i.M;i=t){let s=t.N;if(void 0===s)t.N=s=new Set;else if(s.has(i))break;s.add(i),d(t);}};function n$2(i){void 0!==this.N?(o(this),this.M=i,h$1(this)):this.M=i;}function l(i,t=!1,s=0){const e=this.H,h=this.N;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(e))for(let i=s;i<e.length;i++)r(e[i],!1),o(e[i]);else null!=e&&(r(e,!1),o(e));else r(this,i);}const d=i=>{var t$1,e,r,o;i.type==t.CHILD&&(null!==(t$1=(r=i).P)&&void 0!==t$1||(r.P=l),null!==(e=(o=i).Q)&&void 0!==e||(o.Q=n$2));};class c extends s{constructor(){super(...arguments),this.isConnected=!0,this.ut=w,this.N=void 0;}T(i,t,s){super.T(i,t,s),h$1(this);}O(i,t=!0){this.at(i),t&&(r(this,i),o(this));}at(t){var s,e;t!==this.isConnected&&(t?(this.isConnected=!0,this.ut!==w&&(this.setValue(this.ut),this.ut=w),null===(s=this.reconnected)||void 0===s||s.call(this)):(this.isConnected=!1,null===(e=this.disconnected)||void 0===e||e.call(this)));}S(i,t){if(!this.isConnected)throw Error(`AsyncDirective ${this.constructor.name} was rendered while its tree was disconnected.`);return super.S(i,t)}setValue(i){if(this.isConnected)if(d$1(this.Σdt))this.Σdt.I(i,this);else {const t=[...this.Σdt.H];t[this.Σct]=i,this.Σdt.I(t,this,0);}else this.ut=i;}disconnected(){}reconnected(){}}

const h=new WeakMap,n$1=i$1(class extends c{render(i){return A}update(i,[s]){var e;const o=s!==this.gt;return o&&void 0!==this.gt&&this.xt(void 0),(o||this.Tt!==this.Et)&&(this.gt=s,this.At=null===(e=i.options)||void 0===e?void 0:e.host,this.xt(this.Et=i.element)),A}xt(t){"function"==typeof this.gt?(void 0!==h.get(this.gt)&&this.gt.call(this.At,void 0),h.set(this.gt,t),void 0!==t&&this.gt.call(this.At,t)):this.gt.value=t;}get Tt(){var t;return "function"==typeof this.gt?h.get(this.gt):null===(t=this.gt)||void 0===t?void 0:t.value}disconnected(){this.Tt===this.Et&&this.xt(void 0);}reconnected(){this.xt(this.Et);}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i(e,n)}

const styles = i$4 `
  div#container {
    display: grid;
    place-items: center;
    position: relative;
    min-height: 100px;
    cursor: pointer;
    border: 1px solid #ccc;
  }
  div#animated {
    width: 50px;
    height: 50px;
    background-color: #00b7ff;
  }
`;
let MuxPlayer = class MuxPlayer extends h$2 {
    constructor() {
        super(...arguments);
        this._player = new Player();
        this._animated = null;
        this._animation = new Animation("mux-player", []);
        this._renderDiv = (animation) => {
            const values = animation.currentValues;
            const div = this._animated;
            if (div == null) {
                return;
            }
            Object.keys(values).forEach((key) => {
                div.style[key] = values[key].join("");
            });
        };
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = value;
        this._player.animation = value;
        this._player.render = this._renderDiv;
        this._player.seek(0);
    }
    _animateMotion() {
        this._player.animation = this.animation;
        this._player.duration = 1000;
        this._player.seek(0);
        this._player.play();
        this._player.render = this._renderDiv;
        this._player.iterations = Infinity;
    }
    _updateAnimatedDiv(div) {
        this._animated = div || null;
        if (div != null) {
            this._player.seek(0);
        }
    }
    render() {
        return T `
      <div id="container" @click="${this._animateMotion}">
        <div id="animated" ${n$1(this._updateAnimatedDiv)}></div>
      </div>
    `;
    }
    disconnectedCallback() {
        this._player.dispose();
    }
};
MuxPlayer.styles = styles;
__decorate([
    e(),
    __metadata("design:type", Animation),
    __metadata("design:paramtypes", [Animation])
], MuxPlayer.prototype, "animation", null);
MuxPlayer = __decorate([
    n("mux-player")
], MuxPlayer);

const player = new MuxPlayer();
const animation = new Animation("first", CssKeyframe.createKeyframes({
    from: {
        position: "absolute",
        left: {
            value: "25%",
            easeOut: "quad",
        },
        top: "0px"
    },
    to: {
        position: "absolute",
        left: {
            value: "75%",
            easeIn: "quad",
        },
    },
}));
player.animation = animation;
document.body.appendChild(player);
//# sourceMappingURL=index.js.map
