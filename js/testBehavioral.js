import { Context, ConcreteStrategyA, ConcreteStrategyB } from "./3_1_1_strategy";
import { LogHandler, AuthorizeHandler, ResponceHandler } from "./3_2_1_chain";


export default {
 
    testCahinOfResposibility() {
        let chain = new LogHandler();
        chain
            .SetNext(new AuthorizeHandler())
            .SetNext(new ResponceHandler());
        console.log(chain.Handle({ Login: "admin", Password: "admin" }));
        console.log(chain.Handle({ Login: "Noname", Password: "No" }));
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