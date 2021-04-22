using System;
using Structural.Proxy;
using Structural.Decorator;
using Structural.Game;
using Structural.Adapter;
using Structural.Bridge;
using Structural.Flyweight;

namespace Test
{
    class StructuralPaterns
    {
        public static void TestFlyweight()
        {
            // Клиентский код обычно создает кучу предварительно заполненных
            // легковесов на этапе инициализации приложения.
            var factory = new FlyweightFactory(
                new Car { Company = "Chevrolet", Model = "Camaro2018", Color = "pink" },
                new Car { Company = "Mercedes Benz", Model = "C300", Color = "black" },
                new Car { Company = "Mercedes Benz", Model = "C500", Color = "red" },
                new Car { Company = "BMW", Model = "M5", Color = "red" },
                new Car { Company = "BMW", Model = "X6", Color = "white" }
            );
            factory.listFlyweights();

            addCarToPoliceDatabase(factory, new Car
            {
                Number = "CL234IR",
                Owner = "James Doe",
                Company = "BMW",
                Model = "M5",
                Color = "red"
            });

            addCarToPoliceDatabase(factory, new Car
            {
                Number = "CL234IR",
                Owner = "James Doe",
                Company = "BMW",
                Model = "X1",
                Color = "red"
            });

            factory.listFlyweights();
        }

        public static void addCarToPoliceDatabase(FlyweightFactory factory, Car car)
        {
            Console.WriteLine("\nClient: Adding a car to database.");

            var flyweight = factory.GetFlyweight(new Car
            {
                Color = car.Color,
                Model = car.Model,
                Company = car.Company
            });

            // Клиентский код либо сохраняет, либо вычисляет внешнее состояние и
            // передает его методам легковеса.
            flyweight.Operation(car);
        }
        public static void TestBridge()
        {
            Abstraction abstractionA = new Abstraction(new ConcreteImplementationA());
            Abstraction abstractionB = new Abstraction(new ConcreteImplementationB());
            Abstraction exAbstractionA = new ExtendedAbstraction(new ConcreteImplementationA());
            Abstraction exAbstractionB = new ExtendedAbstraction(new ConcreteImplementationB());
            Console.WriteLine(abstractionA.Operation());
            Console.WriteLine(abstractionB.Operation());
            Console.WriteLine(exAbstractionA.Operation());
            Console.WriteLine(exAbstractionB.Operation());
        }
        public static void TestProxy()
        {
            ISubject subject = new RealSubject("8.8.8.8");
            Console.WriteLine(subject.Request());
            subject = new Proxy(subject as RealSubject);
            Console.WriteLine(subject.Request());
            Console.WriteLine(subject.Request());
            subject = new Proxy("127.0.0.1");
            Console.WriteLine(subject.Request());
        }

        public static void TestDecorator()
        {
            IComponent component = new ConcreteComponent();
            Console.WriteLine(component.Operation());
            Decorator decorator = new ConcreteDecoratorA(component);
            Console.WriteLine(decorator.Operation());
            decorator = new ConcreteDecoratorB(decorator);
            Console.WriteLine(decorator.Operation());
        }

        public static void TestGame()
        {
            IDamageActor humen = new Character("Humen", 300, 50);
            IDamageActor orc = new Character("Orc", 350, 75);
            humen = new DefenceBuff(new DefenceBuff(humen, 10), 30);

            while (!humen.IsDead() && !orc.IsDead())
            {
                humen.Hit(orc);
                orc.Hit(humen);
            }
        }

        public static void TestAdapter()
        {
            Adaptee oldLib = new Adaptee();
            Console.WriteLine(oldLib.GetSpecificRequest("Test", 4, true));
            Adapter newLib = new Adapter(oldLib);
            Console.WriteLine(newLib.GetRequest("Test"));
        }

        public static void TestAdapterWinApi()
        {
            Process process = new Process();
            AdaptedPocess adaptedPocess = new AdaptedPocess(process);
            adaptedPocess.Create("notepad.exe");
        }
    }
}