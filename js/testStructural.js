import { RealSubject, MyProxy, ProxyFunction } from "./2_1_proxy";
import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB, DecoratorFunction } from "./2_2_decorator";
import { Adaptee, Adapter, adapt } from "./2_3_adapter";
import CultureFacade from "./2_4_facade";
import { SongSmallWidget, SongMiddleWidget, SongBigWidget, BookSmallWidget, BookMiddleWidget, BookBigWidget, Book, Song } from "./2_5_0_no_bridge";
import { SmallWidgetAbstraction, MiddleWidgetAbstraction, BigWidgetAbstraction, SongWidgetData, BookWidgetData } from "./2_5_1_bridge";
import { SongSmallWidgetWithMixin, SongMiddleWidgetWithMixin, SongBigWidgetWithMixin, BookBigWidgetWithMixin, BookMiddleWidgetWithMixin, BookSmallWidgetWithMixin } from "./2_5_2_mixins";

export default {
    testNoBridge: function () {
        const song = new Song("Вставай!", "Вставай! Пий чай з молоком, Молися на теплий душ!");
        const book = new Book("Шаблони проєктування: Елементи повторно використовуваного об'єктно-орієнтованого програмного забезпечення",
            "книга 1994 року з програмної інженерії, в якій запропоновані і описані архітектурні рішення деяких частих проблем у проєктуванні ПЗ");
        const widgets = [
            new BookSmallWidget(book),
            new BookMiddleWidget(book),
            new BookBigWidget(book),
            new SongSmallWidget(song),
            new SongMiddleWidget(song),
            new SongBigWidget(song)
        ];
        for (let widget of widgets)
            console.log(widget.render());
    },
    testMixin: function(){
        const song = new Song("Вставай!", "Вставай! Пий чай з молоком, Молися на теплий душ!");
        const book = new Book("Шаблони проєктування: Елементи повторно використовуваного об'єктно-орієнтованого програмного забезпечення",
            "книга 1994 року з програмної інженерії, в якій запропоновані і описані архітектурні рішення деяких частих проблем у проєктуванні ПЗ");
        const widgets = [
            new BookSmallWidgetWithMixin(book),
            new BookMiddleWidgetWithMixin(book),
            new BookBigWidgetWithMixin(book),
            new SongSmallWidgetWithMixin(song),
            new SongMiddleWidgetWithMixin(song),
            new SongBigWidgetWithMixin(song)
        ];
        for (let widget of widgets)
            console.log(widget.render());
    },
    testBridge: function () {
        const widgets = [
            new SmallWidgetAbstraction(),
            new MiddleWidgetAbstraction(),
            new BigWidgetAbstraction()
        ];
        const song = new Song("Вставай!", "Вставай! Пий чай з молоком, Молися на теплий душ!");
        const book = new Book("Шаблони проєктування: Елементи повторно використовуваного об'єктно-орієнтованого програмного забезпечення",
            "книга 1994 року з програмної інженерії, в якій запропоновані і описані архітектурні рішення деяких частих проблем у проєктуванні ПЗ");
        const widgetData = [
            new SongWidgetData(song),
            new BookWidgetData(book)
        ];
        for (let widget of widgets)
            for (let data of widgetData)
                console.log(widget.render(data));
    },
    testFacade: function () {
        const music = new CultureFacade("music");
        console.log(music.get(3));
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
