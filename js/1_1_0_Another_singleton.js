let singleton = Symbol();
let singletonEnforcer = Symbol();

class Singleton {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer)
            throw "Instantiation failed: use Singleton.getInstance() instead of new.";
        this.randomNumber = Math.random();
        this.counter = 0;
    }

    static get _instance() {
        if (!this[singleton])
            this[singleton] = new Singleton(singletonEnforcer);
        return this[singleton];
    }

    static set _instance(v) { throw "Can't change constant property!" }

    static getInstance() { return this._instance; }

    print() {
        console.log(`My random number = ${this.randomNumber}`);
    }

    incCounter() {
        console.log(`Counter =${++this.counter}`);
    }

}

export default Singleton;