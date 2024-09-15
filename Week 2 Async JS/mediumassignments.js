//FIrst  assignment

const fs=require("fs");
const filepath='./a.txt'
fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
        console.log("there's a error")
        return
    }
    else{
        console.log(data)
    }
})

function expensiveoperation(){
    let sum=0;
    for(let i=0;i<1e8;i++){
        sum+=i
    }
    console.log(sum)
}
expensiveoperation()





//Second Assignmwnt


function expensiveoperation(){
    sum=0;
    for(i=0;i<1e8;i++)
    {
        sum=+i
    }
    console.log(sum)
}
expensiveoperation()


const fs= require("fs");

const data="this is the data 0"

fs.writeFile('a.txt',data,(err)=>{
    if(err){
        console.log("there's a error")
    }
    console.log("data written to txt")
})


