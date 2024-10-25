const jwt=require('jsonwebtoken');

function AuthValidation(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,'randomboii')
    if(decoded.username){
        req.username=decoded.username;
        next();
    }
    else{
        res.status(404).json({
            message:'Invalid token'
        })
    }
}

module.exports=AuthValidation;