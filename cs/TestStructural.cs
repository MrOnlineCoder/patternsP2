using System;
using Structural.Proxy;
using Structural.Decorator;
using Structural.Game;
using Structural.Adapter;
using Structural.Bridge;

namespace Test
{
    class StructuralPaterns
    {
        public static void TestBridge()
        {
            Abstraction abstractionA = new Abstraction(new ConcreteImplementationA());
            Abstraction abstractionB = new Abstraction(new ConcreteImplementationB());
            Abstraction exAbstractionA = new ExtendedAbstraction( new ConcreteImplementationA());
            Abstraction exAbstractionB = new ExtendedAbstraction( new ConcreteImplementationB());
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