using System;
using System.Collections.Generic;
using Behavioral.Strategy;
using Behavioral.PaymentStrategy;
using Behavioral.ChainOfResponsibility;
using Behavioral.Memento;

namespace Test
{
    class BehavioralPatterns
    {

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