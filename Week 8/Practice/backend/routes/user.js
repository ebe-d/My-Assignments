const {Router}=require('express');
const router=Router();
const {User}=require('../db/database');
const {PurchasedCourses,Courses}=require('../db/database');
const {IsAdmin,AuthMiddleware,CredCheckMiddleware}=require('../middlewares/middleware');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');




router.post('/login',CredCheckMiddleware,async(req,res)=>{


    const {username,password}=req.headers;
    try{

    const user=await User.findOne({name:username})
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

})
router.post('/signup',CredCheckMiddleware,async(req,res)=>{

    const {username,password}=req.headers;

    const userexists=await User.findOne({name:username})
    if(userexists){
        return res.status(404).json({
            error:'User already exists'
        })
    }

    const hashpass=await bcrypt.hash(password,10);

    try{
        const user=new User({
            name:username,
            password:hashpass
        })
        await user.save();
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

router.use(AuthMiddleware);

router.get('/courses/:courseId',async(req,res)=>{
    const UserId=req.UserID;
    const CourseId=req.params.courseId;

    try{
        const purchase=new PurchasedCourses({
            userId:UserId,
            courseId:CourseId
        });
        await purchase.save();

        return res.json({
            message:`Purchased course successfully`
        })
    }
    catch(err){
        res.json({
            error:`error ${err}`
        })
    }


})
router.get('/courses',async(req,res)=>{

    const allcourses=await Courses.find({});

    res.json(
        {allcourses}
    )

})
router.get('/purchasedcourses', async (req, res) => {
    try {
        const purchase = await PurchasedCourses.find({
            userId:req.UserID
        })
        const purchasedata=await Courses.find({
            _id:{$in:purchase.map(x=>x.courseId)}
        })
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        

        return res.json({ purchase,purchasedata });

    } catch (err) {
        console.error(err); // Log any errors for debugging
        return res.status(500).json({ error: `Error: ${err.message}` });
    }
});


module.exports=router;