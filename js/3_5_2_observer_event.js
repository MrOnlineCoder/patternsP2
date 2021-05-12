/**
 * @extends EventTarget
 */
class EventSubject extends EventTarget {

    constructor() {
        super();
        this._state = 0;
    }

    /**
     * повертає стан субєкта
     * @returns{number} 
     */
    get state() {
        return this._state;
    }

    /**
     * сетер значення повідомляє всіх підписників про зміну 
     * @param{number}
     */
    set state(value) {
        if (Number(value).isNaN)
            throw `${value} is not a number`;
        this._state = value;
        let changeEvent = new Event("change");
        changeEvent.detail = { value };
        this.dispatchEvent(changeEvent);
    }

    /**
     * Змінює стан обєкту на випадкове ціле число від 0 до 9
     */
    generateRandomState() {
        this.state = Math.floor(Math.random() * 10);
    }
}

class EventHandlers {
    static log(event) {
        console.log(`Нове значення стану: ${event?.detail?.value}`);
    }
    static logEven(event) {
        if (event?.detail?.value % 2 == 0) {
            console.log("Парне значення стану");
        }
    }
}

/**
 * Підраховує кількість станів, що задовільняють певній умові
*/
class CounterEventObserver {
    /**
     * @param {function} condition предикат
     */

    constructor(condition) {
        if (typeof condition != "function")
            throw `${condition} is not a predicate`;
        this.condition = condition;
        this.count = 0;
        this.handler = (event) => {
            if (this.condition(event?.detail?.value)) {
                this.count++;
                console.log(`Стан задовільнив умову ${this.count} разів`);
            }
        }
    }

    subscribe(subject) {
        subject.addEventListener("change", this.handler);
    }

    unsubscribe(subject) {
        subject.removeEventListener("change", this.handler);
    }
}

export { EventSubject, EventHandlers, CounterEventObserver }