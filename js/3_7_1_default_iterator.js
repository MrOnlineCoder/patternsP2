class DefaultIterator {
    constructor(array) {
        if (typeof array != "object")
            throw "Bad type";
        this.array = array;
        this.index = array.length-1;
    }

    next() {
        if (this.index >= 0)
            return {
                done: false,
                value: this.array[this.index--]
            }
        return {
            done: true
        }
    }
}

export default DefaultIterator;