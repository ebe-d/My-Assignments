const express=require("express");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const app=express();
const auth=require('./middleware');
const {userModel,todoModel}=require('../Practice/db');
const zod=require('zod');

app.use(express.json());

app.post('/signup',async(req,res)=>{
    const {email,password,name}=req.body;
    const encoded=await bcrypt.hash(password,10);
    try{
    const user= new userModel({
        email:email,
        password:encoded,
        name:name
    })
   
        await user.save();
        res.json({
            message:`done`
        })
    }
    catch(err){
        res.json({
            message:`error ${err}`
        })
    }
   
})

app.post('/signin',async(req,res)=>{
    const {email,password}=req.body;

    const user=await userModel.findOne({
        email:email,
    })
    if(!user){
        res.json({
            error:"incorrect"
        })
    }
    const hashpass=await bcrypt.compare(password,user.password);

    console.log(user);

    if(hashpass){
        const token=jwt.sign({
            id:user._id
        },'THESECRET',{expiresIn:'1d'});
        res.json({
            token:token
        })
    }
    else{
        res.status(404).json({
            message:'wrong credentials'
        })
    }
})


app.post('/todo',auth,async(req,res)=>{
    const {title,done}=req.body;

    const todo=new todoModel({
        title:title,
        done:done,
        userId:req.userId
    });

    try{
        await todo.save();
        res.json({
            message:`success`
        })
    }
    catch(err){
        res.json({
            message:`error ${err}`
        })
    }
})


app.post('/todos',auth,async(req,res)=>{
    try{
        const todos=await todoModel.find({
            userId:req.userId
        })

        res.json({
            todos
        })
    }
    catch(err){
        res.json({
            message:err
        })
    }
})

app.listen(3000);