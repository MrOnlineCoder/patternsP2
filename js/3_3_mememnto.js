class Originator {
    constructor(state) {
        this._state = state;
        console.log("Originator: My initial state is: " + state);
    }
    doSomething() {
        console.log("Originator: I'm doing something important.");
        this._state = this.generateRandomString(30);
        console.log(`Originator: and my state has changed to: ${this._state}`);
    }

    generateRandomString(length = 10) {

        function IntRandom(from = 0, to = 10) {
            return Math.ceil((to - from) * Math.random() + from);
        }

        let allowedSymbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";

        while (length > 0) {
            result += allowedSymbols[IntRandom(0, allowedSymbols.length)];
            length--;
        }

        return result;
    }

    save() {
        return new ConcreteMemento(this._state);
    }

    restore(memento) {
        if (memento && memento.state) {
            this._state = memento.state;
            console.log(`Originator: My state has changed to: ${this._state}"`);
        }
        else
            throw "Unknown memento " + memento;
    }
}

class ConcreteMemento {
    constructor(state) {
        this._state = state;
        this._date = Date.now();
    }

    toString() {
        if (this._state.length <= 10)
            return `${new Date(this._date).toLocaleString()} / ${this._state}`;
        else
            return `${new Date(this._date).toLocaleString()} / ${this._state.substring(0, 9)}...`;
    }

    get state() {
        return this._state;
    }
}

class Caretaker {
    constructor(originator) {
        this._originator = originator;
        this._mementos = [];
    }
    backup() {
        console.log("\nCaretaker: Saving Originator's state...");
        this._mementos.push(this._originator.save());
    }
    undo() {
        if (this._mementos.length == 0) {
            console.log("Caretaker: Tere is no history to undo");
            return;
        }

        var memento = this._mementos.pop();

        console.log("Caretaker: Restoring state to: " + memento);

        this._originator.restore(memento);
    }
    showHistory() {
        console.log("Caretaker: Here's the list of mementos:");

        for (let memento of this._mementos) {
            console.log(memento);
        }
    }
}

export { Originator, Caretaker };