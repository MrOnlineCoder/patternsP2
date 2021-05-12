using System;
using System.Collections.Generic;
using Behavioral.Strategy;
using Behavioral.PaymentStrategy;
using Behavioral.ChainOfResponsibility;
using Behavioral.Memento;
using Behavioral.Visistor;
using Behavioral.PersonVisitor;
using Behavioral.Observer;

namespace Test
{
    class BehavioralPatterns
    {
        public static void TestObserverEvent()
        {
            EventSubject subject = new EventSubject();
            subject.CahngeStateEvent += EventHandlers.Log;
            subject.CahngeStateEvent += EventHandlers.LogEven;
            var Counter = new CounterEventObserver(state => state < 5);
            Counter.Subscibe(subject);
            for (int i = 0; i < 5; i++)
                subject.GenerateRandomState();
            Console.WriteLine("Detach even observer");
            subject.CahngeStateEvent -= EventHandlers.LogEven;
            for (int i = 0; i < 5; i++)
                subject.GenerateRandomState();
        }
        public static void TestObserverDefault()
        {
            DefaultSubject subject = new DefaultSubject();
            var Logger = new ConsoleLogDefaultObserver();
            subject.Subscribe(Logger);
            var Even = new EvenDefoultObserver();
            Even.Subscribe(subject);
            var Counter = new CounterDefaultObserver(x => x < 5);
            Counter.Subscribe(subject);
            for (int i = 0; i < 5; i++)
                subject.GenerateRandomState();
            Console.WriteLine("Detach even observer");
            subject.Unsuscribe(Even);
            for (int i = 0; i < 5; i++)
                subject.GenerateRandomState();
        }

        public static void TestObserver()
        {
            Subject subject = new Subject();
            ICusomObserver Logger = new ConsoleLogObserver();
            ICusomObserver Even = new EvenObserver();
            ICusomObserver Counter = new CounterObserver(state => state < 5);
            subject.Attach(Logger);
            subject.Attach(Even);
            subject.Attach(Counter);
            for (int i = 0; i < 5; i++)
                subject.GenerateRandomState();
            Console.WriteLine("Detach even observer");
            subject.Detach(Even);
            for (int i = 0; i < 5; i++)
                subject.GenerateRandomState();
        }
        public static void TestPersonVisitor()
        {
            Student student = new Student("Iван", "Iванов", 2);
            Printer printer = new Printer();
            Hi hi = new Hi();
            student.Accept(printer);
            student.Accept(hi);

            Professor professor = new Professor("Микола", "Маляр", "Миколайович", "Кiбернетики i прикладної математики");

            professor.Accept(printer);
            professor.Accept(hi);
        }
        public static void TestVisitor()
        {
            List<IComponent> components = new List<IComponent>
            {
                new ConcreteComponentA(),
                new ConcreteComponentB(),
                new ConcreteComponentA()
            };

            Console.WriteLine("The client code works with all visitors via the base Visitor interface:");
            var visitor1 = new ConcreteVisitor1();
            Client.ClientCode(components, visitor1);

            Console.WriteLine();

            Console.WriteLine("It allows the same client code to work with different types of visitors:");
            var visitor2 = new ConcreteVisitor2();
            Client.ClientCode(components, visitor2);
        }
        public static void TestMemento()
        {
            Originator originator = new Originator("Init state");
            Caretaker caretaker = new Caretaker(originator);

            caretaker.Backup();
            originator.DoSomething();

            caretaker.Backup();
            originator.DoSomething();

            caretaker.Backup();
            originator.DoSomething();

            Console.WriteLine();
            caretaker.ShowHistory();

            Console.WriteLine("\nClient: Now, let's rollback!\n");
            caretaker.Undo();

            Console.WriteLine("\n\nClient: Once more!\n");
            caretaker.Undo();

            Console.WriteLine("\n\nClient: Once more!\n");
            caretaker.Undo();

            Console.WriteLine("\n\nClient: Once more!\n");
            caretaker.Undo();

            Console.WriteLine();
        }
        public static void TestChainOfResponsibility()
        {
            var Chain = new LogHendler();
            Chain
                .SetNext(new AuthorizeHendler())
                .SetNext(new ResponceHendler());
            Console.WriteLine(Chain.Handle(new Request("Noname", "No")));
            Console.WriteLine(Chain.Handle(new Request("admin", "admin")));
        }

        public static void TestPaymentStrategy()
        {
            List<Card> Cards = new List<Card> {
                new Visa("1234 5678 9012 3456", new DateTime(2022,10,1), -1000),
                new MasterCard("2234 5678 9012 3477", new DateTime(2021,1,1), 5000),
                new MasterCard("3234 5678 9012 3000", new DateTime(2024,12,31), 500),
                new Visa("4234 5678 9012 3456", new DateTime(2022,10,1), 10000),
            };
            PaymentProcessor processor = new PaymentProcessor();
            processor.strategies = new Dictionary<string, IPayment>(){
                {"MASTER", new MasterCardPayment()},
                {"VISA", new VisaPayment()},
            };

            Bill bill = new Bill(600);

            foreach (var card in Cards)
            {
                if (processor.Checkout(bill, card))
                    Console.WriteLine($"Payd by {card.Number}");
                else
                    Console.WriteLine($"Not payd by {card.Number}");
            }

        }
        public static void TestStrategy()
        {
            var context = new Context();

            Console.WriteLine("Client: Strategy is set to normal sorting.");
            context.SetStrategy(new ConcreteStrategyA());
            context.DoSomeBusinessLogic();

            Console.WriteLine();

            Console.WriteLine("Client: Strategy is set to reverse sorting.");
            context.SetStrategy(new ConcreteStrategyB());
            context.DoSomeBusinessLogic();
        }
    }
}