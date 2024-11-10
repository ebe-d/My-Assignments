const {Router}=require('express');
const router=Router();
const {Admin}=require('../db/database');
const {Courses}=require('../db/database');
const {IsAdmin,AuthMiddleware,CredCheckMiddleware}=require('../middlewares/middleware');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


router.post('/login',CredCheckMiddleware,async(req,res)=>{

    const {username,password}=req.headers;
    try{

    const user=await Admin.findOne({name:username})
    if(!user){
        return res.status(404).json({
            error:'User not found'
        })
    }
    const passmatch=await bcrypt.compare(password,user.password);
    if(!passmatch){
        return res.status(404).json({
            error:'Pass Not Match'
        })
    }
    const token=jwt.sign({id:user._id},'THESECRET',{expiresIn:'1d'});
    return res.header('Authentication',`${token}`).status(200).json({
        message:'Successfully logged in'
    });
}
catch(err){
    console.log(err);
    return res.status(404).json({
        error:err
    })
}
}
)
router.post('/signup',CredCheckMiddleware,async(req,res)=>{
    
    const {username,password}=req.headers;

    const userexists=await Admin.findOne({name:username})
    if(userexists){
        return res.status(404).json({
            error:'User already exists'
        })
    }

    const hashpass=await bcrypt.hash(password,10);

    try{
        const admin=new Admin({
            name:username,
            password:hashpass
        })
        await admin.save();
        return res.status(200).json({
            message:'Signup Successful'
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            error:'Error'
        })
    }

    
})

router.use(IsAdmin);
router.use(AuthMiddleware);

router.post('/Addcourse',async(req,res)=>{
    const {title,description,price,imageUrl}=req.body
    
    try{
    const course=new Courses({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorID:req.UserID
    })
    await course.save()
    res.json({
        message:'success'
    })
    }
    catch(err){
        res.json({
            error:'error occured'
        })
    }
})
router.delete('/Removecourse',async(req,res)=>{

})
router.put('/updateCourse',async(req,res)=>{

    const {title,description,price,imageUrl,courseId}=req.body
    
    try{
    const realowner=await Courses.findOne({
        creatorID:req.UserID,
        _id:courseId
    });
    if(!realowner){
        return res.status(403).json({
            message:'Not your course'
        });
    }
    const course=await Courses.updateOne({
        _id:courseId,
        creatorID:req.UserID}
        ,{
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl
    })
    return res.json({
        message:'Course Updated',
    })
    }
    catch(err){
        res.json({
            error:'Error Occured'
        })
}})
router.get('/viewMycourse',async(req,res)=>{
    
})

module.exports=router;