// //Assignment one

const { totalmem } = require("os")
const { resolve } = require("path")


function settimeoutpromise(n){
    return new Promise(resolve=>
        setTimeout(resolve,n))
}

function printsomething(){
    console.log("hey there")
}

settimeoutpromise(5000).then(printsomething)

//Assignment two

function allsleep(n){
    return new Promise (resolve=>{
        starttime=new Date().getTime()
        while(new Date().getTime()<starttime+n);
        resolve();
    })
}
allsleep(3000)


//Assignment Three

/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
    return new Promise ((resolve)=>{
        setTimeout(resolve,t*1000)
    })

}

function wait2(t) {
    return new Promise ((resolve)=>{
        setTimeout(resolve,t*1000)
    })
}

function wait3(t) {
    return new Promise ((resolve)=>{
        setTimeout(resolve,t*1000)
    })
}

async function calculateTime(t1, t2, t3) {
    const starttime=Date.now()
    await Promise.all ([wait1(t1),wait2(t2),wait3(t3)])
    const totaltime=Date.now()-starttime
    console.log("total time taken is",totaltime/1000)
}

calculateTime(6,6,5)



// Assignment Four 
/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t){
    return new Promise((resolve)=>{
        setTimeout(resolve,t*1000)
    })
}

function wait2(t){
    return new Promise((resolve)=>{
        setTimeout(resolve,t*1000)
    })
}

function wait3(t){
    return new Promise((resolve)=>{
        setTimeout(resolve,t*1000)
    })
}

function calculateTime(t1,t2,t3){
    const starttime=new Date()
    return call(t1,t2,t3).then(
        function(){
        const endtime=new Date()
        const totaltime=endtime.getTime()-starttime.getTime()
        return totaltime
 } )
}

function call(t1,t2,t3){
    return wait1(t1)
    .then(function(){
        return wait2(t2)
    }).then(function(){
        return wait3(t3)
    })
}

calculateTime(4,4,4).then(console.log)