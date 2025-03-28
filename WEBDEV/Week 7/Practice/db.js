const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://ebenezerdsouza:pI7gTY0Eauy9BGjt@cluster0.9onbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

 const Schema=mongoose.Schema;
 const objectid=Schema.ObjectId;

 const user=new Schema({
    email:{type:String,unique:true},
    password:String,
    name:String
 })

 const todo=new Schema({
    title:String,
    done:Boolean,
    userId:objectid
 })

const userModel=mongoose.model('users',user);
const todoModel=mongoose.model('todos',todo);


module.exports={
    userModel,todoModel
}