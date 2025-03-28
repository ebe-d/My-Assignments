const {Router}=require('express');
const router=Router();
const jwt=require('jsonwebtoken');
const {User, Admin}=require('../db/index');
const bcrypt=require('bcrypt');
const {CredValidation}=require('../middleware/index');
const dotenv=require('dotenv');
dotenv.config();
const secret=process.env.JWT_SECRET;


router.post('/admin/signup',CredValidation,async(req,res)=>{

    const {username,password}=req.headers;

    const UserExists=await Admin.findOne({name:username})
    if(UserExists){
        return res.status(400).json({
            message:'User Already Exists'
        })
    }
    const hashedpassword=await bcrypt.hash(password,10);

    const admin=new Admin({
        name:username,
        password:hashedpassword
    });

    try{
        await admin.save();
        res.status(200).json({
            message:'user created succesfully'
        })
    }
    catch(err){
        res.status(404).json({
            error:err
        })
    }
})

router.post('/admin/login',CredValidation,async(req,res)=>{

    try{
    const {username,password}=req.headers;

    
    const user=await Admin.findOne({name:username})

    if(!user){
        return res.status(404).json({
            error:'User does not Exist'
        })
    }

    const PassMatch=await bcrypt.compare(password,user.password)
    if(!PassMatch){
        return res.status(404).json({
            message:'Incorrect Password'
        })
    }
    const token=jwt.sign({id:user._id},secret,{expiresIn:'1d'})
    return res.header('Authorization',`${token}`).status(200).json({message:'Login Sucessful'});
}
catch(err){
    return res.status(500).json({
        error:err
    }
    )
}
})

router.post('/user/signup',CredValidation,async(req,res)=>{

    const {username,password}=req.headers;

    const UserExists=await User.findOne({name:username})
 
    if(UserExists){
        res.status(404).json({
           error:'User Already Exists' 
        })
    }

    const PassHash=await bcrypt.hash(password,10);

    const user=new User({
        name:username,
        password:PassHash
    })

    try{
        user.save();
        res.status(200).json({
            message:'User Created Succesfully'
        })
    }
    catch(err){
        res.status(400).json({
            error:err
        })
    }
});

router.post('/user/login',CredValidation,async(req,res)=>{

    const {username,password}=req.headers;

    try{
    const user=await User.findOne({name:username})
    if(!user){
        return res.status(404).json({
            error:'User dont exist'
        })
    }
    const PassMatch=await bcrypt.compare(password,user.password)

    if(!PassMatch){
        return res.status(404).json({
            error:'Password does not match'
        })
    }

    const token=jwt.sign({id:user._id},secret,{expiresIn:'1d'});
    res.header('Authorization',`${token}`);
    return res.status(200).json({
        message:'Login Successful'
    })
    }
    catch(err){
       return res.status(500).json({
            error:err.message
        })
    }
})

module.exports=router;