import Observer from "./Observer.js";

export default class TimeObserver extends Observer {
    constructor(time, callback, unbind){
        super(null, callback, unbind);
        this.time = time;
    }

    notify(event){
        if (typeof event.lastTime === "number" && typeof event.time === "number"){
            const high = Math.max(event.time, event.lastTime);
            const low = Math.min(event.time, event.lastTime);

            if (this.time >= low && this.time <= high){
                this.callback(event);
            }
        }
    }
}