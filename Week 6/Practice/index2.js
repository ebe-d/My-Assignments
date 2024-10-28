const zod=require('zod');

const emailStruct=zod.string().email();
const passwordStruct=zod.string().min(6);

function ValidInfo(username,password){
    const usernameRes=emailStruct.safeParse(username);
    const passwordres=passwordStruct.safeParse(password);

    if(!usernameRes.success || !passwordres.success){
        console.log("Invalid");
    }
    else{
    console.log("valid info go ahead");
    }
}

ValidInfo("ebeemes594@gmail.com","309jdlks");
