// import { Context, ConcreteStrategyA, ConcreteStrategyB } from "./3_1_1_strategy";
// import { LogHandler, AuthorizeHandler, ResponceHandler } from "./3_2_1_chain";
// import { Originator, Caretaker } from "./3_3_memento";
import { File, Folder, SizeVizitor, PrintVisitor, FileRemoveVisitor, SortVisitor } from "./3_4_2_visitor";
// import { Subject, ConsoleLogObserver, EvenObserver, CounterObserver } from "./3_5_1_observer";
// import { EventSubject, EventHandlers, CounterEventObserver } from "./3_5_2_observer_event";
// import DefaultIterator from "./3_7_1_default_iterator";
// import Iterable from "./3_7_2_generator";
// import IterableComposite from "./3_7_3_iterable_composite";


export default {
    testIterableComposite(){
        let root = new Folder("project")
        .add(new File("package", "json", 512))
        .add(new Folder("node_modules")
            .add(new File("babel", "js", 1024))
            .add(new File("express", "js", 2048))
        )
        .add(new File("index", "js", 768))
        .add(new File("package-lock", "json", 2000));

        
        let iRoot = new IterableComposite(root);
        for (let el of iRoot)
            console.log(el);
    },
    testIterator() {
        let iterable = new DefaultIterator([1, 2, 3, 4]);
        let element = iterable.next();
        while (!element.done) {
            console.log(element.value);
            element = iterable.next();
        }

        iterable = new Iterable([1,2,3,4]);
        for (let el of iterable){
            console.log(el);
        }
    },
    testEventObserver() {
        let subject = new EventSubject();
        subject.addEventListener("change", EventHandlers.log);
        subject.addEventListener("change", EventHandlers.logEven);
        let counter = new CounterEventObserver(x => x < 5);
        counter.subscribe(subject);
        for (let i = 0; i < 1; i++)
            subject.generateRandomState();
        console.log("Detach even observer");
        subject.removeEventListener("change", EventHandlers.logEven);
        for (let i = 0; i < 5; i++)
            subject.generateRandomState();
    },
    testObserver() {
        let subject = new Subject();
        let Logger = new ConsoleLogObserver();
        let Even = new EvenObserver();
        let Counter = new CounterObserver(state => state < 5);
        subject.attach(Logger);
        subject.attach(Even);
        subject.attach(Counter);
        for (let i = 0; i < 5; i++)
            subject.generateRandomState();
        console.log("Detach even observer");
        subject.detach(Even);
        for (let i = 0; i < 5; i++)
            subject.generateRandomState();
    },
    testVisitor() {
        let root = new Folder("project")
            .add(new File("package", "json", 512))
            .add(new Folder("node_modules")
                .add(new File("babel", "js", 1024))
                .add(new File("express", "js", 2048))
                .add(new File("async", "js", 4096))
            )
            .add(new Folder("src")
                .add(new File("controllers", "js", 1024))
                .add(new File("services", "js", 2048))
                .add(new File("models", "js", 4096))
            )
            .add(new File("index", "js", 768))
            .add(new File("package-lock", "json", 2000));

        //???????????????????? ???????????? ?? ?????????????? ???????????????????? ?? ??????????????
        // console.log(root.toString());

        root.accept(new SortVisitor());

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