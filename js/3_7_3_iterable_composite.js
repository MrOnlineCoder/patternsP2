class IterableComposite {
    constructor(root) {
        this.root = root;
    }

    *[Symbol.iterator]() {
        yield this.root;
        if (this.root.isComposite)
            for (let element of this.root.elements)
                yield* new IterableComposite(element);
    }
}

export default IterableComposite;