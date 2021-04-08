import prompt from "prompt-sync";
const readLine = prompt()

//import Singleton from "./1_1_1_singleton";
//testSingleton();

//import LogSystem from "./1_1_2_LogSingleton";
//testLogSystem();

// import { ProductACreator, ProductBCreator } from "./1_2_1_factory_method";
// testFactoryMethod();

// import CreateProduct from "./1_2_2_factory_method";
// testFactoryMethod2();

// import { FactoryFirstClass, FactorySecondClass } from "./1_3_1_abstract_factory";
// testAbstractFactory();

// import Factory from "./1_3_2_factory";
// testFactory();

// import { Builder, Director } from "./1_4_builder";
// testBuilder();

// import { SomeType, ProductPrototype, CustomProduct } from "./1_5_prototype";
// testPrototype();

// import { RealSubject, MyProxy, ProxyFunctionyFu, ProxyFunction } from "./2_1_proxy";
// testProxy();

import {ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB, DecoratorFunction} from "./2_2_decorator";
testDecorator();

function testDecorator(){
    let component = new ConcreteComponent();
    console.log(component.operation());
    component = new ConcreteDecoratorA(component);
    console.log(component.operation());
    component = new ConcreteDecoratorB(component);
    console.log(component.operation());

    let component2 = DecoratorFunction(new ConcreteComponent());
    console.log(component2.operation());
    console.log(component2.otherOperation());
}

function testProxy() {
    let subject = new RealSubject();
    console.log(subject.request());
    subject = new MyProxy(subject);
    console.log(subject.request());
    console.log(subject.request());
    console.log(subject.request());
    console.log(subject.request());
    subject = ProxyFunction(subject);
    console.log('===========================');
    subject = ProxyFunction(new RealSubject());
    console.log(subject.request());
    console.log(subject.request());
    console.log(subject.request());
}

function testPrototype() {
    var p = new SomeType();
    let product = new CustomProduct(p);
    let productClone = product.clone();
    productClone.obj.name = "x";
    console.log(product);
    console.log(productClone);
}

function testBuilder() {
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
}

function testFactory() {
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
}

function testAbstractFactory() {
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
}


function testFactoryMethod2() {
    console.log("Enter products number");
    let count = parseInt(readLine());
    console.log("Select the product type A or B:");
    let choise = readLine();
    let productList = [];
    for (let i = 0; i < count; i++) {
        productList.push(CreateProduct(choise));
        console.log(productList[i].Operation());
    }
}

function testFactoryMethod() {
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
}

function testLogSystem() {
    let log1 = new LogSystem();
    let log2 = new LogSystem();
    log1.Log("Test");
    log2.Log("Hello world");
    log1.ShowLog();
    log2.ShowLog();
}

function testSingleton() {
    let s1 = new Singleton();
    let s2 = new Singleton();
    s1.Print();
    s2.Print();
    s1.IncCounter();
    s2.IncCounter();
    s1.IncCounter();
}