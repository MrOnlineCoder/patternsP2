import prompt from "prompt-sync";
const readLine = prompt()

//import Singleton from "./1_1_1_singleton";
//testSingleton();

//import LogSystem from "./1_1_2_LogSingleton";
//testLogSystem();

// import { ProductACreator, ProductBCreator } from "./1_2_1_factory_method";
// testFactoryMethod();

import CreateProduct from "./1_2_2_factory_mathod";
testFactoryMethod2();

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