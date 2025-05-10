// // // pick 
// // // partial
// // // readonly 
// // //record n map


// // interface User {
// //     name:string,
// //     age:number,
// //     gender:string
// // }


// // type OptionUser = Pick<User,'name'|'age'>

// // type Uoption=Partial<OptionUser>

// // const user : Uoption ={
// //     name:'ebe',

// // }


// // interface People0 {
// //     firstname: string,
// //     address:string,
// //     phone:number
// // }

// // const Person : Readonly<People0> ={
// //     firstname:'ebe',
// //     address:'sfsddfsfsd',
// //     phone:43838948939
// // }

// // Person.address='champoa';


// interface Uor {
//     age:number,
//     address:string
// }

// // interface obj {
// //     [key:string]: Uor
// // }

// // type useOL=Record<string,Uor>


// // const Ramp : useOL = {
// //     'ebedsouza' : {age:4,address:'reoeero'},
// //     'ebedsouuza' : {age:4,address:'reoeero'},
// // } 

// // Ramp['ebedsouza'].age;


// const Byin=new Map<string,Uor>();

// Byin.set('ebe',{age:2,address:'eve'});

// const resu = Byin.get('ebe')?.age;

// console.log(resu);


// type EventO= 'click' | 'scroll' | 'move';

// type Exlo= Exclude<EventO,'click'|'move'>

// const haNDLE=(event:Exlo)=>{
//     console.log(event);
// }

// haNDLE('move')