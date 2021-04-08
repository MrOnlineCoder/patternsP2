class ConcreteComponent {
  operation() {
    return "ConcreteComponent";
  }
}

class Decorator {
  constructor(component) {
    this._component = component;
  }

  operation() {
    if (this._component) {
      return this._component.operation();
    }
    else {
      return "";
    }
  }
}

class ConcreteDecoratorA extends Decorator {
  operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }

  otherOperation() {
    return super.operation().length;
  }
}

class ConcreteDecoratorB extends Decorator {
  operation() {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}


function DecoratorFunction(component){
  function decorateMethod(method){
    return function(){
      return `function decorator ${method.apply(component)}`;
    }
  }
  component.operation = decorateMethod(component.operation);
  component.otherOperation = function() { 
    return this.operation().length;
  }
  return component;
}

export {ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB, DecoratorFunction}