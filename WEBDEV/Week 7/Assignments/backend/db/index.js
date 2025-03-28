
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://ebenezerdsouza:pass@cluster0.9onbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const Schema=mongoose.Schema;

const objectid=Schema.ObjectId;

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
})

const AdminSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const CourseSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    imageLink:{
        type:String
    },
    published:{
        type:Boolean
    },
    userID:{
        type:objectid
    }
});

const PurchasedCourseSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    imageLink:{
        type:String
    },
    published:{
        type:Boolean
    },
    userID:{
        type:objectid
    }
})

const User=mongoose.model('users',UserSchema);

const Course=mongoose.model('courses',CourseSchema);

const Admin=mongoose.model('admins',AdminSchema);

const PurchaseCourse=mongoose.model('purchases',PurchasedCourseSchema);

module.exports={
    User,
    Course,
    Admin,
    PurchaseCourse
}
