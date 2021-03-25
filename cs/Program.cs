using System;
using System.Collections.Generic;
using Creational.Singleton;
using Creational.FactoryMethod;

namespace cs
{
    class Program
    {

        static void TestSingleton()
        {
            Singleton s1 = Singleton.getInstance();
            Singleton s2 = Singleton.getInstance();
            s1.Print();
            s2.Print();
            s1.IncCounter();
            s2.IncCounter();
            s1.IncCounter();
        }
        
        static void TestLogSystem()
        {
            var  log1 = LogSystem.getInstance();
            var  log2 = LogSystem.getInstance();
            log1.Log("Test");
            log2.Log("Hello world");
            log1.ShowLog();
            log2.ShowLog();
        }
        
        static void TestFabricMaethod()
        {
            Console.WriteLine("Enter products number");
            int count = int.Parse(Console.ReadLine());
            Console.WriteLine ("Select the product type A or B:");
            string choise = Console.ReadLine();
            ICreator productCreator;
            if (choise == "A")
                productCreator = new ProductACreator ();
            else 
                productCreator = new ProductBCreator();

            List <IProduct> productList = new List<IProduct>(count);
            for (int i=0; i<count; i++)
            {
                productList.Add( productCreator.CreateProduct());
                Console.WriteLine(productList[i].Operation());
            }

        }
        static void Main(string[] args)
        {
            //TestSingleton();
            //TestLogSystem();           
            TestFabricMaethod();
        }
    }
}
