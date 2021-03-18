import prompt  from "prompt-sync";
const read = prompt()
import Example from "./class";

console.log ("Enter your name:");
let name = read();
console.log(`Hello world ${name}`);
let ex1 = new Example();
if (ex1.GetName)
    console.log(ex1.GetName());
