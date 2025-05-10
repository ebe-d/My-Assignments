interface People2 {
    name : String,
    age: number
}


class Employee {
    FirstName:String

    constructor (name:String){
        this.FirstName=name;
    }
}

abstract class Man {
    SecondName:string

    constructor (name:string){
        this.SecondName=name
    }

    abstract greetyo():string

    hello(){
        return 'hi' + this.SecondName;
    }
}

class Manager2 extends Man {
    SecondName: string;
    constructor (name:string){
        super(name);
        this.SecondName=name
    }
    greetyo(): string {
        return 'hello' + this.SecondName ;
    }

}

const An=new Manager2('gooo');

console.log(An.SecondName,An.greetyo(),An.hello());
