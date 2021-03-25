class Product {
    constructor() {
        this.parts = [];
        this.Name = "No name";
    }

    Add(part) {
        this.parts.push(part);
    }

    toString() {
        let str = "";
        for (let part of this.parts) {
            str += `\t${part},\n `;
        }
        return `Product <${this.Name}> parts: \n ${str}`;
    }
}

class Builder {
    constructor() {
        this.product = new Product();
    }

    Reset() {
        this.product = new Product();
    }

    SetName(name) {
        this.product.Name = name;
        return this;
    }

    AddPart(part) {
        this.product.Add(part);
        return this;
    }

    SetDateStemp() {
        this.product.Add(`Date stemp: ${new Date(Date.now())}`);
        return this;
    }

    GetProduct() {
        let result = this.product;
        this.Reset();
        return result;
    }
}

class Director {

    constructor(builder) {
        this.builder = builder;
    }

    Empty() {
        return this.builder.GetProduct();
    }

    BuildFromParts(parts) {
        for (let part of parts) {
            this.builder.AddPart(part);
        }
        return this.builder.GetProduct();
    }

    Example() {
        return this.builder
            .SetName("Example")
            .AddPart("Part One")
            .AddPart("Part Two")
            .SetDateStemp()
            .AddPart("Part Three")
            .GetProduct();
    }
}


export { Builder, Director};