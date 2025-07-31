import { Schema,model } from "mongoose";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { boolean } from "zod";

dotenv.config();

const MongoUrl:any=process.env.MONGO_URL;

const ConnectDB= async()=>{ 

   await mongoose.connect(MongoUrl);
   console.log('Mongo Connected');
   
}

ConnectDB().catch((error)=>{
    console.log(error);
})

const UserSchema=new Schema({
    username : { type:String , unique:true},
    password : String,
    share:{type:Boolean,default:false}
})

const ContentSchema=new Schema({
    title: {type:String},
    link : { type:String },
    type : {
        type : mongoose.Types.ObjectId,
        ref:'Type'
    },
    tags : [{
        type: mongoose.Types.ObjectId,
        ref:'Tag'
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    share:{
        type:Boolean,
        default:false
    }
});

const TypeSchema=new Schema({
    name:{type:String,unique:true,required:true}
});

const TagSchema=new Schema({
    name:{type:String,unique:true,required:true}
})

export const TagModel=model('Tag',TagSchema);
export const TypeModel=model('Type',TypeSchema);
export const ContentModel=model('Content',ContentSchema);
export const UserModel=model('User',UserSchema);



