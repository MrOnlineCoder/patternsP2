using System;
namespace Strutural.Proxy
{
    public interface ISubject
    {
        string Request();
    }

    class RealSubject : ISubject
    {
        public string Request()
        {
            return "Real subject response";
        }
    }

    class Proxy : ISubject
    {
        private RealSubject _realSubject;
        public Proxy(RealSubject realSubject)
        {
            this._realSubject = realSubject;
        }
        public Proxy()
        {
            this._realSubject = new RealSubject();
        }

        public string Request()
        {
            if (this.CheckAccess())
            {
                string response = this._realSubject.Request();
                this.LogAccess(response);
                return response;
            }
            else
                return "Proxy response";
        }

        private Random rnd = new Random(2);
        public bool CheckAccess()
        {
            return rnd.NextDouble() < 0.5;
        }

        public void LogAccess(string message)
        {
            Console.WriteLine($"Request was proxied: {message}");
        }
    }
}