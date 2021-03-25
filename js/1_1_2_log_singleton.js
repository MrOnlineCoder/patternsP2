import {writeFileSync, readFileSync} from "fs";

class LogSystem{
    constructor(){
        this.fileName = "log.txt";
    }

    Log(message){
        writeFileSync(this.fileName, `${new Date(Date.now())} : ${message}\n`, {flag:"a"});
    }

    ShowLog(){
        const log = readFileSync(this.fileName, "utf-8");
        console.log(log);
    }
}

export default LogSystem;