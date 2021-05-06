//import { Context, ConcreteStrategyA, ConcreteStrategyB } from "./3_1_strategy";
import { LogHandler, AuthorizeHandler, ResponceHandler } from "./3_2_1_chain";
import {Chain, LogHandlerFunction, AuthorizeHandlerFunction} from "./3_2_2_function_chain";

export default {
    testFunctionCahinOfResposibility() {
        let chain = new Chain();
        chain.use(LogHandlerFunction)//.use(AuthorizeHandlerFunction);
        console.log(chain);
        console.log(chain.handle({ Login: "admin", Password: "admin" }));
        console.log(chain.handle({ Login: "Noname", Password: "No" }));
    },
    testCahinOfResposibility() {
        let chain = new LogHandler();
        chain.SetNext(new AuthorizeHandler())
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