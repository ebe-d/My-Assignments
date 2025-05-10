"use strict";
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
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 2] = "Up";
    Direction[Direction["Down"] = 3] = "Down";
    Direction[Direction["Right"] = 4] = "Right";
    Direction[Direction["Left"] = 5] = "Left";
})(Direction || (Direction = {}));
console.log(Direction.Down);
