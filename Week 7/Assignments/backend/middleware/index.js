const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const secret=process.env.JWT_SECRET;
const zod=require('zod');
const {Admin}=require('../db/index');


function AuthMiddleware(req,res,next){
    const token=req.headers.authorization

    if(!token){
        res.status(404).json({
            error:'Not Authenticated'
        })
    }
    try{
        const decoded=jwt.verify(token,secret);
        req.userId=decoded.id;
        next();
    }
    catch(err){
        res.json({
            error:'Invalid Token'
        })
    }
}

const UsernameStruct=zod.string().min(6,{message:'Username Must Contain 6 Characters'})
.refine((username)=>{
    const SymbolCount=(username.match(/@/g)||[]).length;
    const UnderscoreCount=(username.match(/_/g)||[]).length;
    return (SymbolCount+UnderscoreCount)===1;
},
{
    message:'Username must have @ or _'
}
);

const PasswordStruct=zod.string().min(8,{message:'Minimum 8 characters'})
.refine(
    (password)=>/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[@_&%$!,]).{8,}$/.test(password),
    {message:'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@_&%$!,).'}
);

function CredValidation(req,res,next){
    const {username,password}=req.headers;

    const CheckUsername=UsernameStruct.safeParse(username);

    if(!CheckUsername.success){
        return res.status(404).json({
            error:CheckUsername.error.errors.map(err=>err.message)
        })
    }

    const CheckPassword=PasswordStruct.safeParse(password);

    if(!CheckPassword.success){
        return res.status(404).json({
            error:CheckPassword.error.errors.map(err=>err.message)
        })
    }


    next();
}

async function AdminMiddleware(req,res,next){
    const token=req.headers.authorization;

    if(!token){
        return res.status(404).json({
            message:'No Access'
        })
    }

    try{
        const decoded=jwt.verify(token,secret);

        const user=await Admin.findById(decoded.id);

        if(!user){
            return res.status(404).json({
                error:'Access Denied'
            })
        }
        next();
    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

module.exports={
    AuthMiddleware,
    CredValidation,
    AdminMiddleware
}