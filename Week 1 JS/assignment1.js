// //FIRST WAY

function Solve(arr){
    return arr.filter(ele=>
     ele.Gender=="Male" && ele.Age>20   
    )   
}

const users=[{
    Name:"Ebe",
    Age:20,
    Gender:"Male"
},
{
    Name:"Aaron",
    Age:31,
    Gender:"Male"
},{
Name:"Sohan",
    Age:50,
    Gender:"Male"
},
{
    Name:"Humam",
    Age:18,
    Gender:"Female"
}]

let ans=Solve(users)
console.log(JSON.stringify(ans,null,2))

//SECOND WAY

function Solve2(arr)
{
   let arr2=[]
for(i=0;i<arr.length;i++)
{
    if(arr[i].Age>20 && arr[i].Gender=="Male")
    {
        arr2.push(arr[i])
    }
    
}
return arr2
}

const users2=[{
    Name:"Ebe",
    Age:20,
    Gender:"Male"
},
{
    Name:"Aaron",
    Age:33,
    Gender:"Male"
},{
Name:"Sohan",
    Age:51,
    Gender:"Male"
},
{
    Name:"Humam",
    Age:18,
    Gender:"Female"
}]

let ans2=Solve2(users2)
console.log(JSON.stringify(ans2,null,2))
