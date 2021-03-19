using System;

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
        
        static void TestLogSystem(){
            var  log1 = LogSystem.getInstance();
            var  log2 = LogSystem.getInstance();
            log1.Log("Test");
            log2.Log("Hello world");
            log1.ShowLog();
            log2.ShowLog();
        }
        static void Main(string[] args)
        {
            //TestSingleton();
            TestLogSystem();

           
        }
    }
}
