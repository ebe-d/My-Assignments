"use strict";
class Employee {
    constructor(name) {
        this.FirstName = name;
    }
}
class Man {
    constructor(name) {
        this.SecondName = name;
    }
    hello() {
        return 'hi' + this.SecondName;
    }
}
class Manager2 extends Man {
    constructor(name) {
        super(name);
        this.SecondName = name;
    }
    greetyo() {
        return 'hello' + this.SecondName;
    }
}
const An = new Manager2('dsouza');
console.log(An.SecondName, An.greetyo(), An.hello());
