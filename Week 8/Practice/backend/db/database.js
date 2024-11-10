const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const objectId=Schema.ObjectId;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const AdminSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const CourseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorID:{
        type:objectId,
        ref:'admins'
    }
});

const PurchasedSchema=new Schema({
    userId:{
        type:objectId,
        ref:'users'
    },
    courseId:{
        type:objectId,
        ref:'courses'
    }
})



const User=mongoose.model('users',UserSchema);
const Admin=mongoose.model('admins',AdminSchema);
const Courses=mongoose.model('courses',CourseSchema);
const PurchasedCourses=mongoose.model('purchasedcourses',PurchasedSchema);

module.exports={
    User,Admin,Courses,PurchasedCourses
}