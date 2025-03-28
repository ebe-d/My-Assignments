const {Router}=require('express');
const router=Router();
const {AuthMiddleware}=require('../middleware/index');
const {Course}=require('../db/index');
const {PurchaseCourse}=require('../db/index');
const {AdminMiddleware}=require('../middleware/index');

router.post('/admin/courses',AuthMiddleware,AdminMiddleware,async(req,res)=>{
    const {title,description,price,imagelink,published}=req.body;

    console.log(title,description,price,imagelink,published);

    const course=new Course({
        title:title,
        description:description,
        price:price,
        imageLink:imagelink,
        published:published,
        userID:req.userId
    })

    try{
        course.save();
        res.status(200).json({message:'Course Added Successfully'});
    }
    catch(err){
        res.status(400).json({error:err})
    }
});

router.post('/admin/courses/:courseId',AuthMiddleware,AdminMiddleware,async(req,res)=>{
    const courseId=req.params.courseId;
    const {title,description,price,imagelink,published}=req.body;

    try {
    const course=await Course.findByIdAndUpdate(courseId,{
        title:title,
        description:description,
        price:price,
        imageLink:imagelink,
        published:published
    });
    if(!course){
        return res.status(404).json({
            error:'Course not found'
        })
    }
    res.status(200).json({
        message:'Course updated successfully'
    })
    }
    catch(err){
        res.status(404).json({
            error:err
        })
    }
})

router.get('/admin/courses',AuthMiddleware,AdminMiddleware,async(req,res)=>{
    try{
    const userID=req.userId;

    const courses=await Course.find({userID}).exec();

    res.status(200).json({
        courses
    })
    }
    catch(err){
        res.status(404).json({
            error:err
        })
    }
})

router.get('/user/courses',AuthMiddleware,async(req,res)=>{

    try{
    const courses=await Course.find().exec();
    res.status(200).json({courses})
    }
    catch(err){
        res.status(404).json({
            error:err
        })
    }
})

router.get('/user/courses/:courseId',AuthMiddleware,async(req,res)=>{

    const CourseID=req.params.courseId;

    const course=await Course.findById(CourseID).exec();

    if(!course){
        return res.status(404).json({
            message:'Course Not Found'
        })
    }

    const purchaseCourse=new PurchaseCourse({
        title:course.title,
        description:course.description,
        price:course.price,
        imageLink:course.imageLink,
        published:course.published,
        userID:req.userID
    })

    try{
        await purchaseCourse.save();
        res.status(200).json({
            message:'Course Purchased Successfully'
        })
    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
});

router.get('/user/purchasedCourses',AuthMiddleware,async(req,res)=>{
    const userID=req.userID;
    try{
        const courses=await PurchaseCourse.find({userID}).exec();

        res.status(200).json({
            courses
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
});

module.exports=router;