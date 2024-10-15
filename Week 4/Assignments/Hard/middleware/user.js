const {User}=require('../database/index');
const jwt=require('jsonwebtoken');

    function userMiddleware(req, res, next) {
        const token = req.header('Authorization');
    
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }
    
        try{
            const decoded=jwt.verify(token,'2004');
            req.user=decoded;
            next();
        }
        catch(err){
            res.status(401).json({message:'token is not valid'})
        }
    }
    module.exports = userMiddleware;
    
  