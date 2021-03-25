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

class FactoryFirstClass {
    CreateProductA() {
        return new ProductAFirst();
    }

    CreateProductB() {
        return new ProductBFirst();
    }
}

class FactorySecondClass {
    CreateProductA() {
        return new ProductASecond();
    }

    CreateProductB() {
        return new ProductBSecond();
    }
}
export {FactoryFirstClass, FactorySecondClass};