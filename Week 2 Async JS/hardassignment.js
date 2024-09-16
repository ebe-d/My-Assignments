// First Assignment

const fs=require("fs")


const cleanedfile=(filepath)=>{
fs.readFile(filepath,"utf8",(err,data)=>{
    if (err)
    {
        return
    }
    const cleanfile=data.replace(/\s+/g,"").trim()

    fs.writeFile(filepath,cleanfile,(err)=>
    {
        if(err){
            console.log("der a error")
        }
        console.log("fle cleaned")
    })
}
)
}

const filepath="a.txt"
cleanedfile(filepath)

//Second Assignment 
const today=new Date()


const updatetime=()=>{
    const hour24=today.getHours().toString().padStart(2,0)
    const minutes=today.getMinutes().toString().padStart(2,0)
    const seconds=today.getSeconds().toString().padStart(2,0)

    const hour12= ((today.getHours() + 11) % 12 + 1).toString().padStart(2, '0');
    const amorpm=today.getHours()>=12?"PM":"AM"

    console.log("24-hour format: ${hours24}:${minutes}:${seconds}");
    console.log("12-hour format: ${hours12}:${minutes}:${seconds} ${ampm}");

    setInterval(updatetime,2000)
}
updatetime()

