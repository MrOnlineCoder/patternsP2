class Iterable {
    constructor(array) {
        if (typeof array != "object")
            throw "Bad type";
        this.array = array;
        this.index = array.length-1;

    }

    *[Symbol.iterator]() {
        while (this.index >= 0)
            yield this.array[this.index--];
    }
}

export default Iterable;