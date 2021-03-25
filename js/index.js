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

import Factory from "./1_3_2_factory";
testFactory();

function testFactory(){
    console.log("Select category first or second:");
    let category = parseInt(readLine());
    let factory;
    if (category == 1)
        factory = new Factory("first");
    else
        factory = new Factory("second");
    console.log(factory);
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
    let productList = [];
    for (let i = 0; i < count; i++) {
        productList.push(productCreator.CreateProduct());
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