import { Context, ConcreteStrategyA, ConcreteStrategyB } from "./3_1_1_strategy";
import { LogHandler, AuthorizeHandler, ResponceHandler } from "./3_2_1_chain";
import { Originator, Caretaker } from "./3_3_memento";
import { File, Folder, SizeVizitor, PrintVisitor, FileRemoveVisitor } from "./3_4_2_visitor";

export default {
    testVisitor() {
        let root = new Folder("project")
            .add(new File("package", "json", 512))
            .add(new Folder("node_modules")
                .add(new File("babel", "js", 1024))
                .add(new File("express", "js", 2048))
            )
            .add(new File("index", "js", 768))
            .add(new File("package-lock","json",2000));

        //функціонал виводу в консоль перенесено у візитер
        // console.log(root.toString());

        console.log(root.accept(new PrintVisitor));

        console.log(`Total size is ${root.accept(new SizeVizitor())}\n`);

        root.accept(new FileRemoveVisitor("js"));

        console.log(root.accept(new PrintVisitor));
        
    },
    testMemento() {

        let originator = new Originator("Init state");
        let caretaker = new Caretaker(originator);

        caretaker.backup();
        originator.doSomething();

        caretaker.backup();
        originator.doSomething();

        caretaker.backup();
        originator.doSomething();

        console.log();
        caretaker.showHistory();

        console.log("\nClient: Now, let's rollback!\n");
        caretaker.undo();

        console.log("\n\nClient: Once more!\n");
        caretaker.undo();

        console.log("\n\nClient: Once more!\n");
        caretaker.undo();

        console.log("\n\nClient: Once more!\n");
        caretaker.undo();
    },

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