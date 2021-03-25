class ProductAFirst {
    OperationA() {
        return "This is A of first class";
    }
}

class ProductASecond {
    OperationA() {
        return "This is A of second class";
    }
}

class ProductBFirst {
    OperationB() {
        return "This is B of first class";
    }

    OperationWithProductA(product) {
        return `${this.OperationB()} AND ${product.OperationA()}`;
    }
}

class ProductBSecond {
    OperationB() {
        return "This is B of second class";
    }

    OperationWithProductA(product) {
        return `${this.OperationB()} AND ${product.OperationA()}`;
    }
}

class Factory {
    constructor(type) {
        if (type == "first") {
            this.productA = ProductAFirst;
            this.productB = ProductBFirst;
        }
        else if (type == "second") {
            this.productA = ProductASecond;
            this.productB = ProductBSecond;
        }
        else
            throw `Wrong type of fabric. ${type} is not "first" or "second"`;
    }

    CreateProduct(product) {
        if (product == "A")
            return new this.productA();
        if (product == "B")
            return new  this.productB();
    }
}

export default Factory;