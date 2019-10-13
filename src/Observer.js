
const states = {
    ACTIVE: 1,
    STOPPED: 0,
    DISPOSED: -1
};

export default class Observer {
    constructor(type, callback, unbind){
        this.type = type;
        this.callback = callback;
        this.unbind = unbind;
        this.state = states.ACTIVE;
    }

    notify(event){
        if (event.type === this.type){
            this.callback(event);
        } 
    }

    stop(){
        if (this.state === states.ACTIVE){
            this.state = states.STOPPED;
        }
    }

    start(){
        if (this.state !== states.DISPOSED){
            this.state = states.ACTIVE;
        }
    }

    dispose(){
        this.state = states.DISPOSED;
        this.unbind();
    }
}