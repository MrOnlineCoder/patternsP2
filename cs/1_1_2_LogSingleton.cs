using System;
using System.IO;

namespace cs
{
    /* 
    Система має
        0. файл має бути один для всієї системи
        1. Метод дописати в кінець текстовго файлу повідомленя 
        2. метод вивести все  з файлу в консоль
    */

    class LogSystem 
    {

        private static LogSystem instance = null;
        public static LogSystem getInstance()
        {
            if (instance == null)
            {
                instance = new LogSystem();
            }
            return instance;
        }
        private string fileName = "log.txt";
        private StreamWriter stream;

        private LogSystem(){
            this.stream = new StreamWriter(this.fileName, true);
        }

        public void Log(string message)
        {
            this.stream.WriteLine($"{DateTime.Now} : {message}");
            this.stream.Flush();
        }

        ~LogSystem(){
            this.stream.Close();
        }
    }
}