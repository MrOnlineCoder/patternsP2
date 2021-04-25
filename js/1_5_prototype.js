class Prototype{
    clone(){
        return Object.assign({}, this);
    }
}

class SomeType {
    constructor() {
        this.name = "Noname";
        this.count = 0;
    }
}

class ProductPrototype extends Prototype {
    constructor() {
        this.createdAt = new Date(Date.now());
        this.id = Math.random();
    }
}

class CustomProduct extends ProductPrototype {
    constructor(obj) {
        super();
        this.obj = obj;
    }
    clone() {
        let clone = super.clone();
        clone.obj = Object.assign({}, this.obj);
        clone.createdAt = new Date(Date.now());
        return clone;
    }
}

export { SomeType, ProductPrototype, CustomProduct };