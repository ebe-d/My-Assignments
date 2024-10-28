const e = require('express');
const jwt=require('jsonwebtoken');
const zod=require('zod');

function AuthorisationMiddleware(req,res,next){
    const token=req.header('Authorization');

    if(!token){
        return res.status(404).json({
            error:'Not Authenticated'
        });
    }
    try{
        const decoded=jwt.verify(token,"THEULTIMATESECRET");
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(404).json({
            error:'Invalid Token'
        })
    }
}

const usernameStruct=zod.string().min(6,{message:'Username must contain 6 characters'})
.refine((username)=>{
    const SymbolCount=(username.match(/@/g)||[]).length;
    const UnderscoreCount=(username.match(/_/g)||[]).length;
    return (SymbolCount+UnderscoreCount)===1;
},
{
    message:'Username must contain either @ or _ '
}
);

const passwordStruct=zod.string()
.min(8,{message:'Must contain 8 characters'}).refine(
    (password)=>/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[@_&%$!,]).{8,}$/.test(password),
    {message:"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@_&%$!,)."}
);

function CredValidation(req,res,next){
    const {username,password}=req.body;

    const usernameResult=usernameStruct.safeParse(username);
    if(!usernameResult.success){
        return res.status(404).json({
            error:usernameResult.error.errors.map(err=>err.message)
        });
    }

    const passwordResult=passwordStruct.safeParse(password);
    if(!passwordResult.success){
        return res.status(404).json({
            error:passwordResult.error.errors.map(err=>err.message)
        
        });
    }
    next();
}

module.exports={
    AuthorisationMiddleware,
    CredValidation
}
