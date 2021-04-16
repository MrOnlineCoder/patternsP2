import { RealSubject, MyProxy, ProxyFunction } from "./2_1_proxy";
import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB, DecoratorFunction } from "./2_2_decorator";
import { Adaptee, Adapter, adapt } from "./2_3_adapter";
import CultureFacade from "./2_4_facade";

export default {
    testFacade: function () {
        const music = new CultureFacade("music");
        console.log (music.get(3));        
        const movie = new CultureFacade("movie");
        console.log(movie.get(5));
    },
    testAdapter: function () {
        let oldLib = new Adaptee();
        console.log(oldLib.getSpecificRequest("Test", 4, true));
        let newLib = new Adapter(oldLib);
        console.log(newLib.getRequest("Test"));
        console.log("============================");
        let funcLib = adapt(oldLib);
        console.log(funcLib.getRequest("Test"));
    },
    testProxy: function () {
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
        console.log(subject.request());
        console.log(subject.request());
        console.log(subject.request());
    },
    testDecorator: function () {
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
}
