class SomeType {
    constructor() {
        this.name = "Noname";
        this.count = 0;
    }
}

class ProductPrototype {
    constructor() {
        this.createdAt = new Date(Date.now());
        this.id = Math.random();
    }

    clone() {
        return Object.assign({}, this);
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
        return clone;
    }
}

export { SomeType, ProductPrototype, CustomProduct };