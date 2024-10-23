// const jwt=require('jsonwebtoken');
// const {User}=require('../db/index');

//     function ValidationMiddleware(req,res,next){

//         const {username,password}=req.body;

//         function isValidUsername() {
//             const minLength = 3;
//             const validUsernamePattern = /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9_.]{1,}[a-zA-Z0-9]$/;
        
//             if (username.length >= minLength && validUsernamePattern.test(username)) {
//                 return true;
//             }
//             return false;
//             }

//         function isValidPassword(){
//             const minLength = 8;
//             const hasUpperCase = /[A-Z]/.test(password);
//             const hasLowerCase = /[a-z]/.test(password);
//             const hasNumber = /\d/.test(password);
//             const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
//             if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
//                 return true;
//             }
//             return false;
//         }

//                         if(isValidUsername()&&isValidPassword()){
//                             next();
//                         }
//                         else{
//                             return res.status(400).json({error:'Please Check Username/Password',error})
//                         }
//     }


//     function CheckAuthMiddleware(req,res,next){
//         const token=req.header('Authorization');

//         if(!token){
//             return res.status(401).json({error:"Not Authenticated"})
//         }

//         try{
//             const decoded=jwt.verify(token,"khuljaasimsim");
//             req.user=decoded;
//             next();
//         }
//         catch(err){
//             res.status(404).json({message:'Invalid Token'})
//         }
//     }



// module.exports={
//     ValidationMiddleware
//     ,CheckAuthMiddleware
// }



const jwt = require('jsonwebtoken');
const { User } = require('../db/index');

function ValidationMiddleware(req, res, next) {
    const { username, password } = req.body;

    function isValidUsername() {
        const minLength = 3;
        const validUsernamePattern = /^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9_.]{1,}[a-zA-Z0-9]$/;
        return username.length >= minLength && validUsernamePattern.test(username);
    }

    function isValidPassword() {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }

    if (isValidUsername() && isValidPassword()) {
        return next(); 
    } else {
        return res.status(400).json({
            error: 'Invalid username or password. Please ensure the username is at least 3 characters long and the password meets the required criteria.'
        });
    }
}

function CheckAuthMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Not Authenticated" });
    }

    try {
        const decoded = jwt.verify(token, "khuljaasimsim");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = {
    ValidationMiddleware,
    CheckAuthMiddleware
};
