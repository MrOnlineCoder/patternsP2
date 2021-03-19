import prompt  from "prompt-sync";
const read = prompt()

import Singleton from "./1_1_1_singleton";

function testSingleton(){
    let s1 = new Singleton();
    let s2 = new Singleton();
    s1.Print();
    s2.Print();
    s1.IncCounter();
    s2.IncCounter();
    s1.IncCounter();
}


testSingleton();