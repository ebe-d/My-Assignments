//First Assignment

function VowelCount(str){
    const vowels=['a','e','i','o','u']
    let count=0
    for (i=0;i<str.length;i++)
    {
        if(vowels.includes(str[i].toLowerCase()))
        {
            count++
        }
    }
    return count;
}
console.log(VowelCount("Apple"))

//Second Assignment

function Palindrome(str) {
    let lowerCaseStr=str.toLowerCase();
    let filteredStr=lowerCaseStr.split('').filter((char)=>(char!=='?' && char!=='.' && char!==',' && char!=='!')).join('')
    let reversedstr=filteredStr.split('').reverse().join('')
    return filteredStr===reversedstr
}

console.log(Palindrome("111"))


//Third Assignment
function CalcTime(n){
    sum=0;
    let starttime=Date.now()
    for(i=0;i<n;i++){
        sum+=i
    }
    let endtime=Date.now()
    let Timetaken=endtime-starttime
    return Timetaken

}
console.log(CalcTime(100000000))