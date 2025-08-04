

// // function Anon (arg:string) :string{
// //     return arg;
// // }

// function Anon<T>(arg: T): T {
//     return arg
// }

// interface Bunker {
//     name:string,
//     age:number
// }

// Anon<Bunker>({name:'ebe',age:32})

// function Anon2 <T> (arg:T[]):T{
//     return arg[];
// }

// const Anon3 = <T>(args:T[]):T=>{
//     return args[];
// }


// const Anon4 = <T>(args:T):T=>{
//     return args
// }

// function Anon5 <T> (args:T) : T {
//     return args;
// }

// const Anon6=<T>(args:T):T=>{
//     return args
// }


enum Direction {
    Up=2,
    Down,
    Right,
    Left
}

console.log(Direction.Down);


enum ResponseStatus {
    Error=500,
    Ok=200
}

console.log(ResponseStatus.Error);

