const express=require('express');
const jwt=require('jsonwebtoken')
const app=express();
app.use(express.json());
const AuthValidation=require('../Practice/Middleware/userauth');
const users=[];
const JWT_SECRET_KEY="randomboii";

app.post('/signup',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.status(200).json({
        message:'success'
    })
    console.log("success")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + '/Public/index.html');
})

app.post('/signin',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    foundUser=users.find(u=>{
       if(u.username===username&&u.password===password){
        return true;
       }
       else{
        return false;
       }
    }
)
if (foundUser){
    const token=jwt.sign({
        username:username
    },JWT_SECRET_KEY);
    res.header("jwt",token);
    res.json({
        message:token
    })
    console.log(users);
}
else{
    res.status(404).send({
        message:'Invalid'
    })
}
})


app.get('/me',AuthValidation,async(req,res)=>{
    const username=req.username;
    if(users.find((u)=>{u.username==username})){
        foundUser=u;
    }
    if(foundUser){
        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    }
    else{
        res.json({
            message:'token invalid'
        })
    }
})
app.listen(3000);
