class Context{
    constructor(strategy){
        this._strategy = strategy;
    }
        
    set strategy(value){
        if (!value || !value.doAlgorithm)
            throw "Bad strategy";
        this._strategy = value;
    }

    doSomeBusinessLogic(){
        console.log("Context: Sorting data using the strategy (not sure how it'll do it)");
        let data = [ "a", "b", "e", "c", "d", ];
        let result = this._strategy.doAlgorithm(data);

        let resultStr = result.join(",");

        console.log(resultStr);
    }
}

class ConcreteStrategyA {
    doAlgorithm(data){
        return data.sort();
    }
}

class ConcreteStrategyB{
    doAlgorithm(data){
        return data.sort().reverse();
    }
}
    
export { Context, ConcreteStrategyA, ConcreteStrategyB }; 