const jwt=require('jsonwebtoken');

function auth(req,res,next){
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,'THESECRET');
    if(decoded){
    req.userId=decoded.id
    next();
    }
}

module.exports=auth;