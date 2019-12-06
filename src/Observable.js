import Observer from "./Observer.js";
import TimeObserver from "./TimeObserver.js";

export default class Observable {
    constructor(){
        this.observers = [];
    }

    observeTime(time, callback){
        const observer = new TimeObserver(time, callback, ()=>{
            const index = this.observers.indexOf(observer);
            if (index > -1){
                this.observers.splice(index, 1);
            }
        });

        this.observers.push(observer);
        return observer;
    }

    observe(type, callback){
        const observer = new Observer(type, callback, ()=>{
            const index = this.observers.indexOf(observer);
            if (index > -1){
                this.observers.splice(index, 1);
            }
        });

        this.observers.push(observer);
        return observer;
    }

    notify(event){
        this.observers.forEach((observer)=>{
            observer.notify(event);
        })
    }

    dispose(){
        this.observers = [];
    }
}