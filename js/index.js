import prompt from "prompt-sync";
const read = prompt()

import Singleton from "./1_1_1_singleton";
import LogSystem from "./1_1_2_LogSingleton";

function testSingleton() {
    let s1 = new Singleton();
    let s2 = new Singleton();
    s1.Print();
    s2.Print();
    s1.IncCounter();
    s2.IncCounter();
    s1.IncCounter();
}
//testSingleton();

function TestLogSystem() {
    let log1 = new LogSystem();
    let log2 = new LogSystem();
    log1.Log("Test");
    log2.Log("Hello world");
    log1.ShowLog();
    log2.ShowLog();
}

TestLogSystem();