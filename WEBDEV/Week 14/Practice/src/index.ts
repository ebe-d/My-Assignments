
// function TS(name:String){
//     console.log('Hello',name);
// }

// TS('Ebe');

// function Sum(one:number,two:number){
//     const sum:number=one+two;
//     return sum;
// }

// const ans=Sum(5, 5);
// console.log(ans);


// function IsLegal(Age:number): Boolean{
//     if(Age>=18){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// const result=IsLegal(13);

// console.log(result?'Eligible':'Not Eligible');


// function DelayedCall(fn:()=>void){
//     setTimeout(fn,5000)
// }

// DelayedCall(()=>console.log('hi there'));


function Call(user:{
    name:string,
    age:number
}) {
    console.log(user.name);
}

let user : {
    name:string,
    age:number
}={ 
    name:'ebe',
    age:20
}

interface Usertype {
    name: string,
    age:number
}

function Call2 (user2:Usertype){
    console.log(user2.name);
}

const user0:Usertype={
    name:'ebe',
    age:20
}

Call(user);
Call2(user0);
