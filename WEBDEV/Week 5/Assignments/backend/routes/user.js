const express=require('express');
const app=express();
const {ValidationMiddleware}=require('../middleware/user');
const bcrypt=require('bcrypt');
const {User}=require('../db/index');
app.use(express.json());
const {Router}=require('express');
const router=Router();
const jwt=require('jsonwebtoken');

router.post('/signup',ValidationMiddleware,async(req,res)=>{
    const {username,password}=req.body;
    console.log(username,password);
    const hashpass=await bcrypt.hash(password,10);

    const checkExist=await User.findOne({name:username})
    if(checkExist){
        return res.status(404).json({message:'User Already Exists'});
    }
    const user=new User({
        name:username,
        password:hashpass
    });
    try{
        await user.save();
        res.status(201).json({message:'User Registered Successfully'})
    }
    catch(err){
        res.status(401).json({error:`something's wrong i can feel it`})
    }
})

router.post('/login',ValidationMiddleware,async(req,res)=>{
    const {username,password}=req.body;

    const user=await User.findOne({name:username})
    if(!user){
        return res.status(404).json({message:{username},error:'username not found'});
    }
    const PassMatch=await bcrypt.compare(password,user.password);
    if(!PassMatch){
        return res.status(400).json({message:'Incorrect Password'})
    }
    const token=jwt.sign({id:user._id},'khuljaasimsim',{expiresIn:'1h'});
    res.status(200).json({token});
})

module.exports=router;