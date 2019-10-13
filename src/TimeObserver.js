import Observer from "./Observer.js";

export default class TimeObserver extends Observer {
    constructor(time, callback, unbind){
        super(null, callback, unbind);
        this.time = time;
    }

    notify(event){
        if (typeof event.lastProgress === "number" && typeof event.progress === "number"){
            const high = Math.max(event.progress, event.lastProgress);
            const low = Math.min(event.progress, event.lastProgress);

            if (this.time >= low && this.time <= high){
                this.callback(event);
            }
        }
    }
}