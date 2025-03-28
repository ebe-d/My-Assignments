const express=require('express');
const app=express();
const {Router}=require('express');
const router=Router();
const jwt=require('jsonwebtoken');
const {CredValidation}=require('../middleware/user')
const {User}=require('../db/index');
const bcrypt=require('bcrypt');
app.use(express.json());

router.post('/signup',CredValidation,async (req,res)=>{
    const {username,password}=req.body;

    const hashedpassword=await bcrypt.hash(password,10);

    const UserExist=await User.findOne({name:username})
    if(UserExist){
        return res.status(400).json(
            {
                message:'User Already Exists'
            }
        )
    }
    const user=new User({
        name:username,
        password:hashedpassword
    });

    try{
        user.save();
        res.status(200).json({message:'Welcome!'})
    }
    catch(err){
        res.status(404).json({message:'Error Occured'})
    }
});

router.post('/login',CredValidation,async(req,res)=>{
    const {username,password}=req.body;

    const user=await User.findOne({name:username})
    if(!user){
        return res.status(404).json({message:'User exists'})
    }

    const passMatch=await bcrypt.compare(password,user.password);
    if(!passMatch){
        return res.status(404).json({message:'Incorrect Password'})
    }
    const token=jwt.sign({id:user._id},'THEULTIMATESECRET',{expiresIn:'1h'});
    res.status(200).json({token});
})

module.exports=router;
