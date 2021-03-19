let singleton = Symbol();
let singletonEnforcer = Symbol();

class Singleton {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer)
            throw "Instantiation failed: use Singleton.getInstance() instead of new.";
    }

    static get _instance() {
        if (!this[singleton])
            this[singleton] = new Singleton(singletonEnforcer);
        return this[singleton];
    }

    static set _instance(v) { throw "Can't change constant property!" }

    static getInstance() { return this._instance; }

    someBusinessLogic() {
        console.log("Singleton")
    }

}

export default Singleton;