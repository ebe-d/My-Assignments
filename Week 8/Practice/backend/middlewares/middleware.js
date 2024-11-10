const jwt=require('jsonwebtoken');

const {Admin}=require('../db/database');

const zod=require('zod');

function AuthMiddleware(req,res,next){

    const token=req.headers.authorization;

    if(!token){
        return res.status(404).json({
            message:'Not Authenticated'
        })
    }
    try{
        const decoded=jwt.verify(token,'THESECRET');
        req.UserID=decoded.id;
        next();
    }
    catch(err){
        return res.status(404).json({
            error:'Invalid Token'
        })
    }
}

async function IsAdmin(req,res,next){

    const token=req.headers.authorization;

    if(!token){
        return res.json({
            error:'Not Authenticated'
        })
    }

    const decoded=jwt.verify(token,'THESECRET');

    if(!decoded){
        return res.json({
            error:'Invalid Token'
        })
    }

    const ID=decoded.id;
    
        const admin=await Admin.findOne({_id:ID});
        if(!admin){
            return res.json({
                error:'Access Denied'
            })
        }
        next();
    }

    const usernameStruct=zod.string().min(6,{message:'Need to have atleast 6 characters'}).max(16,{message:'Max 16 chars only'}).
    refine((username)=>{
        const symbolcount=(username.match(/@/g)||[]).length;
        const underscore=(username.match(/_/g)||[]).length;
        return(symbolcount+underscore)===1;
    },{
        message:'Have either @ or _'
    });

    const passwordStruct=zod.string().min(8,{message:'8 chars min'}).
    refine((password)=>/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[@_&%$!,]).{8,}$/.test(password),
    {message:'Check password'});

    function CredCheckMiddleware(req,res,next){

        const {username,password}=req.headers;

        const checkusername=usernameStruct.safeParse(username);

        if(!checkusername.success){
            return res.status(404).json({
                error:checkusername.error.errors.map(err=>err.message)
            })
        }

        const checkpassword=passwordStruct.safeParse(password);

        if(!checkpassword.success){
            return res.status(404).json({
                error:checkpassword.error.errors.map(err=>err.message)
            })
        }
        next();
    }

    module.exports={
        IsAdmin,AuthMiddleware,CredCheckMiddleware
    }