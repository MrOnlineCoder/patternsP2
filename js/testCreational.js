import Singleton from "./1_1_1_singleton";
import LogSystem from "./1_1_2_log_singleton";
import { ProductACreator, ProductBCreator } from "./1_2_1_factory_method";
import CreateProduct from "./1_2_2_factory_method";
import { FactoryFirstClass, FactorySecondClass } from "./1_3_1_abstract_factory";
import Factory from "./1_3_2_factory";
import { Builder, Director } from "./1_4_builder";
import { SomeType, ProductPrototype, CustomProduct } from "./1_5_prototype";

export default {
    testPrototype: function () {
        var p = new SomeType();
        let product = new CustomProduct(p);
        setTimeout(() => {
            let productClone = product.clone();
            let productClone2 = product.clone();
            productClone.obj.name = "Clone";
            console.log(product);
            console.log(productClone);
            console.log(productClone2);
        }, 5000);
    },

    testBuilder: function () {
        const builder = new Builder();
        let product = builder
            .SetName("Custom product")
            .SetDateStemp()
            .AddPart("Part One")
            .SetDateStemp()
            .AddPart("Part Two")
            .SetDateStemp()
            .AddPart("Part Three")
            .GetProduct();
        console.log(product.toString());
        const director = new Director(builder);
        console.log(director.Empty().toString());
        console.log(director.Example().toString());
        const parts = ["One", "Two", "Tree"];
        console.log(director.BuildFromParts(parts).toString());
    },

    testFactory: function () {
        console.log("Select category first or second:");
        let category = parseInt(readLine());
        let factory;
        if (category == 1)
            factory = new Factory("first");
        else
            factory = new Factory("second");
        let productA = factory.CreateProduct("A");
        let productB = factory.CreateProduct("B");
        console.log(productA.OperationA());
        console.log(productB.OperationB());
        console.log(productB.OperationWithProductA(productA));
    },

    testAbstractFactory: function () {
        console.log("Select category first or second:");
        let category = parseInt(readLine());
        let factory;
        if (category == 1)
            factory = new FactoryFirstClass();
        else
            factory = new FactorySecondClass();
        let productA = factory.CreateProductA();
        let productB = factory.CreateProductB();
        console.log(productA.OperationA());
        console.log(productB.OperationB());
        console.log(productB.OperationWithProductA(productA));
    },

    testFactoryMethod2: function () {
        console.log("Enter products number");
        let count = parseInt(readLine());
        console.log("Select the product type A or B:");
        let choise = readLine();
        let productList = [];
        for (let i = 0; i < count; i++) {
            productList.push(CreateProduct(choise));
            console.log(productList[i].Operation());
        }
    },

    testFactoryMethod: function () {
        console.log("Enter products number");
        let count = parseInt(readLine());
        console.log("Select the product type A or B:");
        let choise = readLine();
        let productCreator;
        if (choise == "A")
            productCreator = new ProductACreator();
        else
            productCreator = new ProductBCreator();
        let productList = productCreator.CreateProductList(count);
        for (let i = 0; i < count; i++) {
            console.log(productList[i].Operation());
        }
    },

    testLogSystem: function () {
        let log1 = new LogSystem();
        let log2 = new LogSystem();
        log1.Log("Test");
        log2.Log("Hello world");
        log1.ShowLog();
        log2.ShowLog();
    },

    testSingleton: function () {
        let s1 = new Singleton();
        let s2 = new Singleton();
        s1.Print();
        s2.Print();
        s1.IncCounter();
        s2.IncCounter();
        s1.IncCounter();
    }
}