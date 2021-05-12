/**
 * Базовий клас для субєктів, за якими ведеться спостереження
 */
class Observeable {
    constructor() {
        this._observers = [];
    }
    /**
     * підписати спостерігача
     * @param {object} observer  повинен містити метод update
     */
    attach(observer) {
        if (!observer && !observer.update)
            throw "Observer error";
        this._observers.push(observer);
    }
    /**
    * відписати  спостерігача
    * @param {object} observer 
    */
    detach(observer) {
        this._observers = this._observers.filter(o => o !== observer);
    }
    /**
    * повідомити всіх підписаних спостерігачів
    */
    notify() {
        this._observers.forEach(observer => observer.update(this));
    }
}

/**
 * клас зі станом за яким можна вести спостереження
 * @extends{Observeable}
 */
class Subject extends Observeable {
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
        this.notify();
    }

    /**
     * Змінює стан обєкту на випадкове ціле число від 0 до 9
     */
    generateRandomState() {
        this.state = Math.floor(Math.random() * 10);
    }
}

/**
 * Спостерігач виводить в консоль кожну зміну стану
*/
class ConsoleLogObserver {
    update(subject) {
        console.log(`Нове значення стану: ${subject?.state}`);
    }
}

/**
 * Спостерігач, який виводить повідомлення про парний стан
*/
class EvenObserver {
    update(subject) {
        if (subject?.state % 2 == 0) {
            console.log("Парне значення стану");
        }
    }
}

/**
 * Підраховує кількість станів, що задовільняють певній умові
*/
class CounterObserver {
    /**
     * @param {function} condition предикат
     */

    constructor(condition) {
        if (typeof condition != "function")
            throw `${condition} is not a predicate`;
        this.condition = condition;
        this.count = 0;
    }

    update(subject) {
        if (this.condition(subject?.state)) {
            this.count++;
            console.log(`Стан задовільнив умову ${this.count} разів`);
        }
    }
}


export { Subject, ConsoleLogObserver, EvenObserver, CounterObserver }