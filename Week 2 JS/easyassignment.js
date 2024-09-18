
// //First Assignment
function isAnagram(str1,str2)
{
    if(str1.length!=str2.length){
        return false;
    }
    else{
        sorted1=str1.toLowerCase().split('').sort().join("");
        sorted2=str2.toLowerCase().split('').sort().join("");
        if (sorted1==sorted2){
            return true;
        }
        else
        {
            return false;
        }

    }
}
module.exports=isAnagram

// //Second Assignment
// const transactions = [
//     {
//         id: 1,
//         timestamp: 1656076800000,
//         price: 10,
//         category: 'Food',
//         itemName: 'Pizza',
//     },
//     {
//         id: 2,
//         timestamp: 1656105600000,
//         price: 20,
//         category: 'Food',
//         itemName: 'Burger',
//     },
//     {
//         id: 3,
//         timestamp: 1656134400000,
//         price: 30,
//         category: 'Food',
//         itemName: 'Sushi',
//     },
// ];

// function calculateTotalSpentByCategory(transactions){
//     const categories={}
//     transactions.forEach((transaction) => {
//         if (!categories[transaction.category]){
//             categories[transaction.category]=0
//         }
//         categories[transaction.category]+=transaction.price
//     });
//     return Object.keys(categories).map((category)=>({
//         category,
//         spentin:categories[category],
//     }
//     )
//     )
// }
// console.log(JSON.stringify(calculateTotalSpentByCategory(transactions),null,2))



// // // Third Assignment

// numbers=[32,54,67,69,90]

// function largestnumber(numbers){
//     let largestele=numbers[0]
//     for(i=0;i<numbers.length;i++)
//     {
//         if(numbers[i]>largestele)
//         {
//             largestele=numbers[i]
//         }
//     }
//     return largestele
// }

// console.log(largestnumber(numbers))