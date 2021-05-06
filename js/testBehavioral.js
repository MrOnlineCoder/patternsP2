import { Context, ConcreteStrategyA, ConcreteStrategyB } from "./3_1_1_strategy";
import { LogHandler, AuthorizeHandler, ResponceHandler } from "./3_2_1_chain";


export default {
 
    testCahinOfResposibility() {
        let chain = new LogHandler();
        chain
            .setNext(new AuthorizeHandler())
            .setNext(new ResponceHandler());
        console.log(chain.handle({ login: "admin", password: "admin" }));
        console.log(chain.handle({ login: "Noname", password: "No" }));
    },
    testStrategy() {
        const context = new Context();
        console.log("Client: Strategy is set to normal sorting.");
        context.strategy = new ConcreteStrategyA();
        context.doSomeBusinessLogic();

        console.log("Client: Strategy is set to reverse sorting.");
        context.strategy = new ConcreteStrategyB();
        context.doSomeBusinessLogic();
    }
}