//let instance = null;

class Singleton {
    constructor (){
        if (Singleton.instance instanceof Singleton){
            return Singleton.instance;
        }
  
        this.randomNumber = Math.random();
        this.counter = 0;
        Singleton.instance = this;
    }

    Print (){
        console.log(`My random number = ${this.randomNumber}`);
    }

    IncCounter(){
        console.log(`Counter =${++this.counter}`);
    }
}

export default Singleton;